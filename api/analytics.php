<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

$dataDir = __DIR__ . '/../data';
$visitsFile = $dataDir . '/visits.json';

if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

if (!file_exists($visitsFile)) {
    file_put_contents($visitsFile, json_encode([]));
}

function getClientIP() {
    $keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
    foreach ($keys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = explode(',', $_SERVER[$key])[0];
            return trim($ip);
        }
    }
    return 'unknown';
}

function loadVisits($file) {
    $data = file_get_contents($file);
    return json_decode($data, true) ?: [];
}

function saveVisits($file, $visits) {
    file_put_contents($file, json_encode($visits), LOCK_EX);
}

// POST — register a visit
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $visits = loadVisits($visitsFile);
    $ip = getClientIP();
    $now = date('Y-m-d H:i:s');
    $today = date('Y-m-d');
    $page = isset($_POST['page']) ? substr(strip_tags($_POST['page']), 0, 200) : '/';
    $ref = isset($_POST['referrer']) ? substr(strip_tags($_POST['referrer']), 0, 500) : '';
    $ua = isset($_SERVER['HTTP_USER_AGENT']) ? substr($_SERVER['HTTP_USER_AGENT'], 0, 300) : '';
    $lang = isset($_POST['lang']) ? substr(strip_tags($_POST['lang']), 0, 10) : 'pt';

    // Skip bots
    $botPatterns = ['bot', 'crawl', 'spider', 'slurp', 'mediapartners', 'semrush', 'ahref'];
    $isBot = false;
    foreach ($botPatterns as $bp) {
        if (stripos($ua, $bp) !== false) { $isBot = true; break; }
    }

    if (!$isBot) {
        $visits[] = [
            'ip' => hash('sha256', $ip . 'fi_salt_2026'),
            'ip_short' => substr($ip, 0, strrpos($ip, '.')) . '.*',
            'date' => $now,
            'day' => $today,
            'page' => $page,
            'referrer' => $ref,
            'lang' => $lang,
            'device' => detectDevice($ua)
        ];

        // Keep only last 90 days
        $cutoff = date('Y-m-d', strtotime('-90 days'));
        $visits = array_values(array_filter($visits, function($v) use ($cutoff) {
            return $v['day'] >= $cutoff;
        }));

        saveVisits($visitsFile, $visits);
    }

    echo json_encode(['ok' => true]);
    exit;
}

// GET — return stats (protected by token)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = isset($_GET['token']) ? $_GET['token'] : '';
    if ($token !== 'FI2026stats') {
        http_response_code(403);
        echo json_encode(['error' => 'Unauthorized']);
        exit;
    }

    $visits = loadVisits($visitsFile);
    $today = date('Y-m-d');
    $yesterday = date('Y-m-d', strtotime('-1 day'));
    $weekAgo = date('Y-m-d', strtotime('-7 days'));
    $monthAgo = date('Y-m-d', strtotime('-30 days'));

    // Total visits
    $total = count($visits);
    $uniqueIPs = count(array_unique(array_column($visits, 'ip')));

    // Today
    $todayVisits = array_filter($visits, function($v) use ($today) { return $v['day'] === $today; });
    $todayTotal = count($todayVisits);
    $todayUnique = count(array_unique(array_column($todayVisits, 'ip')));

    // Yesterday
    $yesterdayVisits = array_filter($visits, function($v) use ($yesterday) { return $v['day'] === $yesterday; });
    $yesterdayTotal = count($yesterdayVisits);
    $yesterdayUnique = count(array_unique(array_column($yesterdayVisits, 'ip')));

    // Last 7 days
    $weekVisits = array_filter($visits, function($v) use ($weekAgo) { return $v['day'] >= $weekAgo; });
    $weekTotal = count($weekVisits);
    $weekUnique = count(array_unique(array_column($weekVisits, 'ip')));

    // Last 30 days
    $monthVisits = array_filter($visits, function($v) use ($monthAgo) { return $v['day'] >= $monthAgo; });
    $monthTotal = count($monthVisits);
    $monthUnique = count(array_unique(array_column($monthVisits, 'ip')));

    // Daily breakdown (last 30 days)
    $dailyData = [];
    for ($i = 29; $i >= 0; $i--) {
        $d = date('Y-m-d', strtotime("-{$i} days"));
        $dayVisits = array_filter($visits, function($v) use ($d) { return $v['day'] === $d; });
        $dailyData[] = [
            'date' => $d,
            'label' => date('d/m', strtotime($d)),
            'total' => count($dayVisits),
            'unique' => count(array_unique(array_column($dayVisits, 'ip')))
        ];
    }

    // Top pages
    $pages = array_count_values(array_column($visits, 'page'));
    arsort($pages);
    $topPages = array_slice($pages, 0, 10, true);

    // Languages
    $langs = array_count_values(array_column($visits, 'lang'));
    arsort($langs);

    // Devices
    $devices = array_count_values(array_column($visits, 'device'));
    arsort($devices);

    // Top referrers
    $refs = array_filter(array_column($visits, 'referrer'), function($r) { return !empty($r); });
    $refCounts = array_count_values($refs);
    arsort($refCounts);
    $topRefs = array_slice($refCounts, 0, 10, true);

    // Recent visits (last 20)
    $recent = array_slice(array_reverse($visits), 0, 20);

    echo json_encode([
        'summary' => [
            'total' => $total,
            'unique' => $uniqueIPs,
            'today_total' => $todayTotal,
            'today_unique' => $todayUnique,
            'yesterday_total' => $yesterdayTotal,
            'yesterday_unique' => $yesterdayUnique,
            'week_total' => $weekTotal,
            'week_unique' => $weekUnique,
            'month_total' => $monthTotal,
            'month_unique' => $monthUnique
        ],
        'daily' => $dailyData,
        'pages' => $topPages,
        'languages' => $langs,
        'devices' => $devices,
        'referrers' => $topRefs,
        'recent' => $recent
    ]);
    exit;
}

function detectDevice($ua) {
    if (preg_match('/Mobile|Android.*Mobile|iPhone|iPod/i', $ua)) return 'Mobile';
    if (preg_match('/iPad|Android(?!.*Mobile)|Tablet/i', $ua)) return 'Tablet';
    return 'Desktop';
}
