#!/usr/bin/env node
/**
 * Gerador automático de artigos do blog Factory Ideas.
 *
 * Corre no GitHub Actions (Seg/Qua) ou localmente:
 *   ANTHROPIC_API_KEY=sk-... node automacao/gerar-artigo.mjs
 *
 * O que faz:
 *   1. Escolhe o próximo tema pendente em automacao/topicos.json
 *   2. Gera o artigo via API da Anthropic, usando um artigo existente como template
 *   3. Valida o HTML gerado (telefone, canonical, imagens, ortografia básica)
 *   4. Escreve blog/<slug>/index.html, insere o cartão em blog/index.html
 *      e o URL no sitemap.xml (via marcadores @novo-artigo / @novo-url)
 *   5. Move o tema para "publicados" no backlog
 *
 * O commit/push/PR é feito pelo workflow, não por este script.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, appendFileSync } from "node:fs";
import { join } from "node:path";

const RAIZ = process.cwd();
const FICHEIRO_TOPICOS = join(RAIZ, "automacao", "topicos.json");
const TEMPLATE_ARTIGO = join(RAIZ, "blog", "quanto-custa-stand-feira-angola", "index.html");
const INDICE_BLOG = join(RAIZ, "blog", "index.html");
const SITEMAP = join(RAIZ, "sitemap.xml");
const PASTA_IMAGENS = join(RAIZ, "images");

const MARCADOR_CARTAO = "<!-- @novo-artigo:nao-remover -->";
const MARCADOR_SITEMAP = "<!-- @novo-url:nao-remover -->";

const TELEFONE = "244923012946";
const TELEFONES_ANTIGOS = ["927635946", "931534210", "922698044"];

const MODELO = process.env.ANTHROPIC_MODEL || "claude-sonnet-5";
const API_KEY = process.env.ANTHROPIC_API_KEY;

function falhar(msg) {
  console.error(`\n✖ ERRO: ${msg}\n`);
  process.exit(1);
}

function escaparHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ---------------------------------------------------------------- preparação

if (!API_KEY) falhar("ANTHROPIC_API_KEY não definida. Adicione o secret no GitHub (Settings → Secrets and variables → Actions).");
for (const f of [FICHEIRO_TOPICOS, TEMPLATE_ARTIGO, INDICE_BLOG, SITEMAP]) {
  if (!existsSync(f)) falhar(`Ficheiro necessário não encontrado: ${f}`);
}

const topicos = JSON.parse(readFileSync(FICHEIRO_TOPICOS, "utf8"));
if (!Array.isArray(topicos.pendentes) || topicos.pendentes.length === 0) {
  falhar("Não há temas pendentes em automacao/topicos.json. Adicione novos temas para continuar a publicar.");
}
const tema = topicos.pendentes[0];
for (const campo of ["slug", "titulo", "tag", "imagem", "angulo"]) {
  if (!tema[campo]) falhar(`O tema seguinte não tem o campo "${campo}": ${JSON.stringify(tema)}`);
}
if (!/^[a-z0-9-]+$/.test(tema.slug)) falhar(`Slug inválido (só a-z, 0-9 e hífens): ${tema.slug}`);

const pastaArtigo = join(RAIZ, "blog", tema.slug);
if (existsSync(pastaArtigo)) falhar(`Já existe um artigo com o slug "${tema.slug}". Corrija o backlog.`);

const imagensDisponiveis = readdirSync(PASTA_IMAGENS, { withFileTypes: true })
  .filter((e) => e.isFile())
  .map((e) => e.name);
if (!imagensDisponiveis.includes(tema.imagem)) {
  falhar(`A imagem do tema ("${tema.imagem}") não existe em images/.`);
}

const template = readFileSync(TEMPLATE_ARTIGO, "utf8");
const indiceBlog = readFileSync(INDICE_BLOG, "utf8");
const sitemap = readFileSync(SITEMAP, "utf8");
if (!indiceBlog.includes(MARCADOR_CARTAO)) falhar(`Marcador ${MARCADOR_CARTAO} não encontrado em blog/index.html.`);
if (!sitemap.includes(MARCADOR_SITEMAP)) falhar(`Marcador ${MARCADOR_SITEMAP} não encontrado em sitemap.xml.`);

// Títulos já publicados (para o modelo não repetir conteúdo)
const titulosPublicados = [];
for (const entrada of readdirSync(join(RAIZ, "blog"), { withFileTypes: true })) {
  if (!entrada.isDirectory()) continue;
  const f = join(RAIZ, "blog", entrada.name, "index.html");
  if (!existsSync(f)) continue;
  const m = readFileSync(f, "utf8").match(/<title>([^<]+)<\/title>/);
  if (m) titulosPublicados.push(m[1].trim());
}

// Data de publicação (hora de Luanda, UTC+1)
const agora = new Date(Date.now() + 60 * 60 * 1000);
const dataISO = agora.toISOString().slice(0, 10);
const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const dataVisivel = `${agora.getUTCDate()} de ${MESES[agora.getUTCMonth()]} de ${agora.getUTCFullYear()}`;

// ------------------------------------------------------------------- prompt

const urlArtigo = `https://www.factoryideas.ao/blog/${tema.slug}/`;
const urlImagem = `https://www.factoryideas.ao/images/${tema.imagem}`;

const prompt = `Escreve um artigo novo para o blog da Factory Ideas (empresa de comunicação visual B2B em Luanda, Angola: stands para feiras, impressão grande formato, brindes corporativos, têxteis personalizados, eventos).

TEMA DO ARTIGO:
- Título de trabalho: ${tema.titulo}
- Ângulo/conteúdo a cobrir: ${tema.angulo}
- Categoria (badge): ${tema.tag}
- Slug (fixo, não alterar): ${tema.slug}
- URL canónico (usar exactamente): ${urlArtigo}
- Imagem principal (og/twitter/JSON-LD, usar exactamente): ${urlImagem}
- Data de publicação: ${dataISO} (visível como "${dataVisivel}")

TEMPLATE — o artigo tem de replicar EXACTAMENTE esta estrutura (head completo com title/description/keywords/canonical/og/twitter/favicon/manifest/fontes/style.css/page-content.css, JSON-LD @graph com Article + BreadcrumbList, navbar, breadcrumb, page-hero com blog-meta/badge/h1/lead, main com secções, cta-block, related-block com 3 related-card, footer completo, whatsapp-float, script do ano):

${template}

REGRAS OBRIGATÓRIAS:
1. Português europeu com ortografia PRÉ-Acordo de 1990, como todo o site: "projecto", "factores", "objectivo", "direcção", "contacto", "actividade", "óptimo", "correcto", "aspecto", "selecção". Nunca formas brasileiras nem pós-Acordo.
2. Telefone/WhatsApp: único número ${TELEFONE} (links wa.me e tel:) / "+244 923 012 946" (texto visível). Nenhum outro número.
3. Sem preços concretos em AOA/USD para serviços da Factory Ideas (falar em factores e faixas, como no template). Valores ilustrativos pequenos tipo "2-5 USD por visitante" são aceitáveis.
4. Só referir imagens desta lista (com o prefixo /images/): ${imagensDisponiveis.join(", ")}
5. Links internos apenas para páginas existentes: /, /#contacto, /#servicos, /#portfolio, /#clientes, /#sobre, /stands-feiras/, /impressao-grande-formato/, /brindes-corporativos/, /blog/, /blog/guia-stand-filda-2026/, /blog/quanto-custa-stand-feira-angola/, /blog/outdoor-lona-vinil-publicidade-exterior-angola/, /blog/brindes-corporativos-que-funcionam-angola/
6. Referências a clientes reais só as que o site já usa (canecas Sonangol, garrafas Keve, kits CFAO/Toyota, copos BFA) — nada inventado.
7. Conteúdo substancial e prático para o mercado angolano: 5-6 secções, 1200-1600 palavras no corpo, usando as classes CSS do template (benefit-list, process-list, cards-grid, info-card, cta-block, related-block, related-card, badge, lead, blog-meta, read-time).
8. NÃO repetir conteúdo destes artigos já publicados: ${titulosPublicados.join(" | ")}
9. JSON-LD: datePublished e dateModified = ${dataISO}; articleSection = "${tema.tag}"; canonical, og:url e mainEntityOfPage = ${urlArtigo}
10. O related-block deve ligar a 1 página de serviço relevante + 2 artigos do blog existentes.

FORMATO DA RESPOSTA — devolve EXACTAMENTE isto, sem mais nada antes ou depois:
===META===
{"titulo": "<título final do h1>", "cardTitulo": "<título para o cartão do índice do blog>", "cardDesc": "<1-2 frases de teaser para o cartão>", "leitura": "<X min de leitura>"}
===HTML===
<!DOCTYPE html>
<html lang="pt" dir="ltr">
... (o documento HTML completo do artigo) ...
</html>`;

// ----------------------------------------------------------------- API call

async function chamarAPI() {
  const corpo = {
    model: MODELO,
    max_tokens: 20000,
    messages: [{ role: "user", content: prompt }],
  };
  let ultimoErro = null;
  for (let tentativa = 1; tentativa <= 3; tentativa++) {
    try {
      const resposta = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(corpo),
        signal: AbortSignal.timeout(10 * 60 * 1000),
      });
      if (resposta.status === 429 || resposta.status >= 500) {
        ultimoErro = `HTTP ${resposta.status}`;
        console.log(`Tentativa ${tentativa}: ${ultimoErro}, a repetir...`);
        await new Promise((r) => setTimeout(r, tentativa * 20000));
        continue;
      }
      if (!resposta.ok) {
        const detalhe = await resposta.text();
        falhar(`API respondeu ${resposta.status}: ${detalhe.slice(0, 500)}`);
      }
      const dados = await resposta.json();
      const texto = (dados.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
      if (!texto) falhar("A API devolveu uma resposta vazia.");
      if (dados.stop_reason === "max_tokens") falhar("A resposta foi cortada por max_tokens — artigo incompleto, não publicado.");
      return texto;
    } catch (e) {
      if (e.name === "TimeoutError" || e.name === "AbortError") ultimoErro = "timeout";
      else ultimoErro = e.message;
      console.log(`Tentativa ${tentativa} falhou (${ultimoErro}), a repetir...`);
      await new Promise((r) => setTimeout(r, tentativa * 20000));
    }
  }
  falhar(`API falhou após 3 tentativas: ${ultimoErro}`);
}

console.log(`Tema: ${tema.titulo}`);
console.log(`Modelo: ${MODELO}`);
const respostaTexto = await chamarAPI();

// -------------------------------------------------------------------- parse

const idxMeta = respostaTexto.indexOf("===META===");
const idxHtml = respostaTexto.indexOf("===HTML===");
if (idxMeta === -1 || idxHtml === -1 || idxHtml < idxMeta) {
  falhar("Resposta sem os marcadores ===META=== / ===HTML=== esperados.");
}
let metaBruto = respostaTexto.slice(idxMeta + "===META===".length, idxHtml).trim();
metaBruto = metaBruto.replace(/^```(json)?\s*/i, "").replace(/```\s*$/, "").trim();
let meta;
try {
  meta = JSON.parse(metaBruto);
} catch {
  falhar(`META não é JSON válido: ${metaBruto.slice(0, 300)}`);
}
for (const campo of ["titulo", "cardTitulo", "cardDesc", "leitura"]) {
  if (!meta[campo] || typeof meta[campo] !== "string") falhar(`META sem o campo "${campo}".`);
}

let html = respostaTexto.slice(idxHtml + "===HTML===".length).trim();
html = html.replace(/^```(html)?\s*/i, "").replace(/```\s*$/, "").trim();
if (!html.startsWith("<!DOCTYPE html>")) falhar("O HTML não começa com <!DOCTYPE html>.");
if (!html.endsWith("</html>")) falhar("O HTML não termina com </html> — resposta possivelmente cortada.");

// --------------------------------------------------------------- validações

const erros = [];
if (html.length < 8000) erros.push(`HTML demasiado curto (${html.length} chars).`);
if ((html.match(new RegExp(urlArtigo.replace(/[/.]/g, "\\$&"), "g")) || []).length < 3) {
  erros.push("URL canónico não aparece 3x (canonical, og:url, mainEntityOfPage).");
}
if (!html.includes(TELEFONE)) erros.push("Número de telefone novo em falta.");
for (const antigo of TELEFONES_ANTIGOS) {
  if (html.includes(antigo)) erros.push(`Número antigo ${antigo} presente!`);
}
if (!html.includes(dataISO)) erros.push(`Data ${dataISO} em falta no JSON-LD.`);
if (!html.includes("page-content.css")) erros.push("page-content.css em falta.");
if (!html.includes("whatsapp-float")) erros.push("whatsapp-float em falta.");
if (!html.includes("related-block")) erros.push("related-block em falta.");
if (!html.includes(`/images/${tema.imagem}`)) erros.push(`Imagem principal ${tema.imagem} em falta.`);

const refsImagens = [...new Set([...html.matchAll(/\/images\/([^"'\s)]+)/gu)].map((m) => m[1]))];
for (const ref of refsImagens) {
  let nome;
  try {
    nome = decodeURIComponent(ref);
  } catch {
    erros.push(`Referência de imagem malformada: ${ref}`);
    continue;
  }
  nome = nome.replace(/[.,;:<>]+$/, "");
  if (!imagensDisponiveis.includes(nome)) erros.push(`Imagem inexistente referida: ${ref}`);
}

const formasPosAcordo = [/\bprojeto/i, /\bfatores\b/i, /\bobjetivo/i, /\bdireção\b/i, /\batividade/i, /(?<![\p{L}])ótimo(?![\p{L}])/iu, /\bseleção\b/i, /\bcorreto\b/i];
for (const re of formasPosAcordo) {
  const m = html.match(re);
  if (m) erros.push(`Ortografia pós-Acordo detectada: "${m[0]}" — o site usa pré-Acordo.`);
}

if (erros.length > 0) {
  falhar(`O artigo gerado falhou ${erros.length} validações:\n  - ${erros.join("\n  - ")}`);
}

// ------------------------------------------------------------------ escrita

mkdirSync(pastaArtigo, { recursive: true });
writeFileSync(join(pastaArtigo, "index.html"), html + "\n", "utf8");
console.log(`✔ Escrito blog/${tema.slug}/index.html (${html.length} chars)`);

const cartao = `${MARCADOR_CARTAO}
          <a class="blog-card" href="/blog/${tema.slug}/">
            <span class="tag">${escaparHtml(tema.tag)}</span>
            <h3>${escaparHtml(meta.cardTitulo)}</h3>
            <p>${escaparHtml(meta.cardDesc)}</p>
            <span class="read-more">Ler artigo →</span>
          </a>`;
writeFileSync(INDICE_BLOG, indiceBlog.replace(MARCADOR_CARTAO, () => cartao), "utf8");
console.log("✔ Cartão inserido em blog/index.html");

const entradaSitemap = `<url>
    <loc>${urlArtigo}</loc>
    <lastmod>${dataISO}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.85</priority>
    <image:image>
      <image:loc>${urlImagem}</image:loc>
      <image:title>${escaparHtml(meta.cardTitulo)}</image:title>
    </image:image>
  </url>

  ${MARCADOR_SITEMAP}`;
writeFileSync(SITEMAP, sitemap.replace(MARCADOR_SITEMAP, () => entradaSitemap), "utf8");
console.log("✔ URL inserido em sitemap.xml");

topicos.pendentes.shift();
topicos.publicados = topicos.publicados || [];
topicos.publicados.push({ ...tema, titulo_final: meta.titulo, data: dataISO });
writeFileSync(FICHEIRO_TOPICOS, JSON.stringify(topicos, null, 2) + "\n", "utf8");
console.log(`✔ Backlog actualizado (${topicos.pendentes.length} temas pendentes)`);

// Outputs para o workflow (título do PR, etc.)
if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `slug=${tema.slug}\n`);
  appendFileSync(process.env.GITHUB_OUTPUT, `titulo<<FIM_TITULO\n${meta.titulo}\nFIM_TITULO\n`);
}
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `## Artigo gerado\n\n- **Título:** ${meta.titulo}\n- **Slug:** \`${tema.slug}\`\n- **Data:** ${dataISO}\n- **Temas restantes no backlog:** ${topicos.pendentes.length}\n`
  );
}

console.log(`\n✔ Concluído: "${meta.titulo}"`);
