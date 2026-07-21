# Automação do blog — Factory Ideas

Publica automaticamente um artigo novo às **Segundas e Quartas (07:00 Luanda)**
em modo "aprovar antes de publicar".

## Como funciona

1. O GitHub Actions corre [`.github/workflows/publicar-artigo.yml`](../.github/workflows/publicar-artigo.yml) no horário agendado.
2. O script [`gerar-artigo.mjs`](gerar-artigo.mjs) pega no próximo tema de [`topicos.json`](topicos.json),
   gera o artigo via API da Anthropic (template + regras do site: ortografia pré-Acordo,
   telefone +244 923 012 946, imagens e links reais), valida tudo, e actualiza
   `blog/<slug>/index.html`, `blog/index.html` e `sitemap.xml`.
3. Abre um **Pull Request** com o artigo pronto.
4. **Aprovar = fazer Merge do PR** → o push para `main` dispara o auto-deploy do
   Hostinger e o artigo fica no ar.

## Configuração (uma vez)

1. Criar uma chave em https://platform.anthropic.com → API Keys (a conta precisa de crédito).
2. No GitHub: repositório → **Settings → Secrets and variables → Actions → New repository secret**
   - Name: `ANTHROPIC_API_KEY`
   - Secret: a chave `sk-ant-...`
3. No GitHub: **Settings → Actions → General → Workflow permissions** → activar
   **"Allow GitHub Actions to create and approve pull requests"** (sem isto, o
   workflow falha com "GitHub Actions is not permitted to create or approve pull requests").

## Operação

- **Testar já:** separador **Actions** → "Publicar artigo do blog" → **Run workflow**.
- **Aprovar um artigo:** separador **Pull requests** → abrir o PR "📝 Novo artigo: …" →
  rever → **Merge pull request**.
- **Rejeitar:** fechar o PR sem merge. Para reutilizar o tema, repor a entrada em
  `topicos.json` (mover de `publicados` para o início de `pendentes`).
- **Acrescentar temas:** adicionar objectos a `pendentes` em `topicos.json`
  (campos: `slug`, `titulo`, `tag`, `imagem` de `images/`, `angulo`).
  Quando o backlog esvazia, o workflow falha com aviso claro — não publica lixo.

## Passar a 100% automático (sem aprovação)

Substituir o passo "Abrir Pull Request para aprovação" no workflow por:

```yaml
      - name: Publicar directamente
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add -A
          git commit -m "Novo artigo do blog: ${{ steps.gen.outputs.slug }}"
          git push
```

## Notas

- Modelo por omissão: `claude-sonnet-5` (mudar via env `ANTHROPIC_MODEL` no workflow).
- Custo típico: cêntimos por artigo.
- Os marcadores `<!-- @novo-artigo:nao-remover -->` (em `blog/index.html`) e
  `<!-- @novo-url:nao-remover -->` (em `sitemap.xml`) são os pontos de inserção — **não remover**.
- Nunca fazer deploy por zip/File Manager neste site: o deploy é sempre por `git push`
  (ver histórico: ficheiros não-rastreados no servidor bloqueiam o auto-deploy).
