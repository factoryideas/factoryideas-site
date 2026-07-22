/* Widget do assistente Factory AI — chat flutuante ligado ao canal WEBSITE
 * do Factory AI (mesma pipeline que responde no Instagram/WhatsApp).
 * Auto-contido: injecta os próprios estilos; herda a fonte Inter do site. */
(function () {
  "use strict";

  var API = "https://factory-ideas.vercel.app/api/factory-ai/webchat";
  var CHAVE_SESSAO = "fi_ai_session";

  /* ── Estilos ─────────────────────────────────────────────── */
  var css = [
    ".fai-btn{position:fixed;bottom:96px;right:28px;width:56px;height:56px;border-radius:50%;",
    "background:#0A0A0A;border:2px solid #F5C800;display:flex;align-items:center;justify-content:center;",
    "cursor:pointer;z-index:998;box-shadow:0 4px 20px rgba(245,200,0,.45);transition:transform .2s ease;padding:0}",
    ".fai-btn:hover{transform:scale(1.1)}",
    ".fai-btn svg{width:28px;height:28px}",
    ".fai-panel{position:fixed;bottom:96px;right:28px;width:360px;max-width:calc(100vw - 32px);",
    "height:520px;max-height:calc(100vh - 130px);background:#fff;border-radius:16px;z-index:1001;",
    "box-shadow:0 16px 60px rgba(0,0,0,.35);display:none;flex-direction:column;overflow:hidden;",
    "font-family:'Inter',sans-serif}",
    ".fai-panel.aberto{display:flex}",
    ".fai-head{background:#0A0A0A;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:10px}",
    ".fai-head-dot{width:10px;height:10px;border-radius:50%;background:#F5C800;flex-shrink:0;",
    "box-shadow:0 0 8px rgba(245,200,0,.9);animation:fai-pulse 2s infinite}",
    "@keyframes fai-pulse{0%,100%{opacity:1}50%{opacity:.5}}",
    ".fai-head-t{flex:1;min-width:0}",
    ".fai-head-t strong{display:block;font-size:.95rem;font-weight:800}",
    ".fai-head-t span{font-size:.72rem;color:rgba(255,255,255,.55)}",
    ".fai-fechar{background:none;border:none;color:rgba(255,255,255,.7);font-size:1.3rem;cursor:pointer;",
    "padding:4px 8px;line-height:1}",
    ".fai-fechar:hover{color:#F5C800}",
    ".fai-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;background:#f5f5f5}",
    ".fai-msg{max-width:85%;padding:10px 14px;border-radius:14px;font-size:.88rem;line-height:1.5;",
    "white-space:pre-wrap;word-wrap:break-word}",
    ".fai-msg-v{align-self:flex-end;background:#F5C800;color:#0A0A0A;border-bottom-right-radius:4px}",
    ".fai-msg-a{align-self:flex-start;background:#fff;color:#1a1a1a;border:1px solid #e5e5e5;",
    "border-bottom-left-radius:4px}",
    ".fai-escrever{align-self:flex-start;color:#888;font-size:.8rem;padding:4px 8px}",
    ".fai-form{display:flex;gap:8px;padding:12px;border-top:1px solid #eee;background:#fff}",
    ".fai-input{flex:1;border:1px solid #ddd;border-radius:10px;padding:10px 14px;font-size:16px;",
    "font-family:'Inter',sans-serif;outline:none;resize:none;max-height:90px}",
    ".fai-input:focus{border-color:#F5C800}",
    ".fai-enviar{background:#F5C800;border:none;border-radius:10px;padding:0 16px;font-weight:800;",
    "cursor:pointer;font-family:'Inter',sans-serif;font-size:.85rem;color:#0A0A0A}",
    ".fai-enviar:hover{background:#D4A900}",
    ".fai-enviar:disabled{opacity:.5;cursor:default}",
    ".fai-nota{font-size:.68rem;color:#999;text-align:center;padding:0 12px 10px;background:#fff}",
    ".fai-nota a{color:#D4A900;text-decoration:none;font-weight:600}",
    "@media (max-width:480px){.fai-panel{right:16px;bottom:88px}.fai-btn{bottom:92px;right:24px}}",
    "@media (prefers-reduced-motion:reduce){.fai-head-dot{animation:none}.fai-btn{transition:none}}",
  ].join("");
  var estilo = document.createElement("style");
  estilo.textContent = css;
  document.head.appendChild(estilo);

  /* ── Estrutura ───────────────────────────────────────────── */
  var ICONE =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 2l1.7 4.6L18.5 8l-4.8 1.4L12 14l-1.7-4.6L5.5 8l4.8-1.4L12 2z" fill="#F5C800"/><path d="M19 13l.9 2.4 2.6.7-2.6.7L19 19.2l-.9-2.4-2.6-.7 2.6-.7L19 13z" fill="#F5C800"/><path d="M6 15l.7 1.9 2 .6-2 .6L6 20l-.7-1.9-2-.6 2-.6L6 15z" fill="#F5C800"/></svg>';

  var btn = document.createElement("button");
  btn.className = "fai-btn";
  btn.setAttribute("aria-label", "Abrir assistente Factory AI");
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = ICONE;

  var painel = document.createElement("div");
  painel.className = "fai-panel";
  painel.setAttribute("role", "dialog");
  painel.setAttribute("aria-label", "Assistente Factory AI");
  painel.innerHTML =
    '<div class="fai-head"><span class="fai-head-dot"></span>' +
    '<div class="fai-head-t"><strong>Factory AI</strong><span>Assistente virtual · resposta imediata</span></div>' +
    '<button class="fai-fechar" aria-label="Fechar">×</button></div>' +
    '<div class="fai-msgs"></div>' +
    '<form class="fai-form"><textarea class="fai-input" rows="1" placeholder="Escreva a sua pergunta…" ' +
    'aria-label="Mensagem"></textarea><button type="submit" class="fai-enviar">Enviar</button></form>' +
    '<div class="fai-nota">Respostas automáticas por IA · prefere falar connosco? ' +
    '<a href="https://wa.me/244923012946" target="_blank" rel="noopener">WhatsApp</a></div>';

  document.body.appendChild(btn);
  document.body.appendChild(painel);

  var msgs = painel.querySelector(".fai-msgs");
  var form = painel.querySelector(".fai-form");
  var input = painel.querySelector(".fai-input");
  var enviar = painel.querySelector(".fai-enviar");
  var fechar = painel.querySelector(".fai-fechar");

  /* ── Sessão ──────────────────────────────────────────────── */
  function obterSessao() {
    try {
      var s = localStorage.getItem(CHAVE_SESSAO);
      if (s && /^[a-zA-Z0-9-]{16,64}$/.test(s)) return s;
    } catch (e) {}
    return null;
  }
  function guardarSessao(s) {
    try { localStorage.setItem(CHAVE_SESSAO, s); } catch (e) {}
  }

  /* ── Mensagens ───────────────────────────────────────────── */
  function bolha(texto, deVisitante) {
    var d = document.createElement("div");
    d.className = "fai-msg " + (deVisitante ? "fai-msg-v" : "fai-msg-a");
    d.textContent = texto;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }
  function indicador() {
    var d = document.createElement("div");
    d.className = "fai-escrever";
    d.textContent = "O assistente está a escrever…";
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
    return d;
  }
  function boasVindas() {
    if (msgs.childElementCount > 0) return;
    bolha("Olá! 👋 Sou o assistente da Factory Ideas. Posso ajudar com stands, impressão grande formato, brindes, têxteis e eventos. Em que posso ajudar?", false);
  }

  var historicoCarregado = false;
  function carregarHistorico() {
    if (historicoCarregado) return;
    historicoCarregado = true;
    var sessao = obterSessao();
    if (!sessao) { boasVindas(); return; }
    fetch(API + "?sessionId=" + encodeURIComponent(sessao))
      .then(function (r) { return r.json(); })
      .then(function (dados) {
        (dados.messages || []).forEach(function (m) {
          bolha(m.texto, m.de === "visitante");
        });
        boasVindas();
      })
      .catch(boasVindas);
  }

  /* ── Envio ───────────────────────────────────────────────── */
  var aEnviar = false;
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var texto = input.value.trim();
    if (!texto || aEnviar) return;
    aEnviar = true;
    enviar.disabled = true;
    input.value = "";
    bolha(texto, true);
    var ind = indicador();

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: obterSessao(), message: texto }),
    })
      .then(function (r) { return r.json().then(function (d) { return { ok: r.ok, d: d }; }); })
      .then(function (res) {
        ind.remove();
        if (res.d && res.d.sessionId) guardarSessao(res.d.sessionId);
        if (res.ok && res.d.reply) {
          bolha(res.d.reply, false);
        } else if (res.ok && res.d.humanHandoff) {
          bolha("Recebido! A nossa equipa vai responder-lhe em breve. Se for urgente, fale connosco no WhatsApp: +244 923 012 946.", false);
        } else {
          bolha(res.d && res.d.error ? res.d.error : "Não consegui responder agora. Tente novamente ou fale connosco no WhatsApp: +244 923 012 946.", false);
        }
      })
      .catch(function () {
        ind.remove();
        bolha("Sem ligação ao assistente neste momento. Fale connosco no WhatsApp: +244 923 012 946.", false);
      })
      .then(function () {
        aEnviar = false;
        enviar.disabled = false;
        input.focus();
      });
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event("submit"));
    }
  });

  /* ── Abrir / fechar ──────────────────────────────────────── */
  function alternar(abrir) {
    painel.classList.toggle("aberto", abrir);
    btn.setAttribute("aria-expanded", abrir);
    btn.style.display = abrir ? "none" : "flex";
    if (abrir) {
      carregarHistorico();
      input.focus();
    }
  }
  btn.addEventListener("click", function () { alternar(true); });
  fechar.addEventListener("click", function () { alternar(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && painel.classList.contains("aberto")) alternar(false);
  });
})();
