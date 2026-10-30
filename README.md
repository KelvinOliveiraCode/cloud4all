# Cloud4All Brasil — atlas aberto da nuvem

Um mapa em português para quem precisa entender, comparar e escolher nuvem. Site 100% estático (HTML + CSS + JS + JSON), sem conta, sem rastreamento, sem build e sem backend.

**Acesse:** abra `index.html` via um servidor local (o conteúdo é montado a partir de JSON por `fetch`, então não funciona como `file://`).

## O que tem dentro

| Área | Descrição |
| --- | --- |
| **Aprender** | 6 módulos curtos com cartões e quiz (progresso salvo no navegador). |
| **Glossário** | 96 termos em 8 categorias, busca sem acento e índice A a Z. |
| **Catálogo** | 124 serviços de 8 provedores, com preço e gratuidade declarados; filtros e comparação de até 3. |
| **Encontrar** | Recomendador de 4 perguntas com trilha auditável (cada filtro mostra quantos sobraram). |
| **Cursos** | 11 caminhos em 6 plataformas oficiais, marcados com data de verificação. |
| **Minha IA** | Monta um prompt honesto para levar à IA que você já usa. |

## Contratos de honestidade (invioláveis)

- **O seletor de orçamento tem prioridade absoluta.** Orçamento zero só devolve serviço grátis para sempre, nunca teste ou crédito.
- **Gratuidade em três estados:** `sempre` (GRÁTIS SEMPRE), `temporario` (GRÁTIS NO COMEÇO), `nao` (PAGO). Nunca maquiar trial/crédito como "grátis".
- **Empty-state honesto:** se nada passar nos filtros, o site diz isso — não força recomendação.
- **Preços vêm do catálogo**, com data de snapshot e conversão declarada (USD ≈ R$ 5,50). O site nunca inventa número.

## Dados

Todos os dados vivem em `data/*.json` (fonte única de verdade). O catálogo declara a origem, o snapshot (`out/2026`), a moeda e a nota de conversão. Antes de contratar, confira sempre a página oficial do provedor.

| Arquivo | Conteúdo |
| --- | --- |
| `data/catalogo.json` | 124 serviços com preço, gratuidade e complexidade |
| `data/glossario.json` | 96 termos |
| `data/modulos.json` | 6 módulos de aprendizado |
| `data/cursos.json` | 11 caminhos de estudo |

## Como rodar

Sem dependências — só um servidor HTTP estático:

```bash
# opção 1
python -m http.server 8033
# abra http://localhost:8033

# opção 2 (via npm, apenas o servidor)
npm run serve
```

## Verificação

```bash
npm run audit   # sintaxe de todos os módulos JS + classes usadas × definidas no CSS + JSON válido
npm test        # teste do motor de recomendação (contratos de honestidade)
npm run verify  # audit + test
```

O `npm run verify` roda também no GitHub Actions (`.github/workflows/ci.yml`).

## Estrutura

```
.
├── index.html              # shell do SPA (roteador por hash)
├── css/                    # tokens, primitives, base, layout, components, views, motion
├── js/
│   ├── app.js              # roteador, menu, tema, estados globais
│   ├── core/               # data, dom, format, store
│   ├── engine/             # recommend.js (motor de recomendação) e prompt.js
│   ├── ui/                 # cards, dialog, particles, parts, reveal
│   └── views/              # uma vista por rota
├── data/*.json             # catálogo, glossário, módulos, cursos
├── assets/fonts/           # Fraunces e Archivo (servidas localmente)
├── tests/                  # teste do motor (node:test)
└── audit-*.cjs             # checagens de integridade (sintaxe, classes, JSON)
```

## Licença

MIT — ver [LICENSE](LICENSE).
Desenvolvido por [Kelvin Oliveira](https://github.com/kelvinoliveiracode). As marcas citadas pertencem aos seus donos.
