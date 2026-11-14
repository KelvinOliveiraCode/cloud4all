# Cloud4All Brasil — open cloud atlas

**English** · [Português (Brasil)](README.md)

A map in Portuguese for anyone who needs to understand, compare and choose a cloud. A 100% static site (HTML + CSS + JS + JSON), no account, no tracking, no build and no backend.

**Access:** open `index.html` through a local server (content is assembled from JSON via `fetch`, so it does not work as `file://`).

## What's inside

| Area | Description |
| --- | --- |
| **Learn** | 6 short modules with cards and a quiz (progress saved in the browser). |
| **Glossary** | 96 terms in 8 categories, accent-free search and an A–Z index. |
| **Catalog** | 124 services from 8 providers, with declared price and freemium status; filters and comparison of up to 3. |
| **Find** | A 4-question recommender with an auditable trail (each filter shows how many remain). |
| **Courses** | 11 paths across 6 official platforms, marked with a verification date. |
| **My AI** | Builds an honest prompt to take to the AI you already use. |

## Honesty contracts (non-negotiable)

- **The budget selector has absolute priority.** A zero budget only returns permanently-free services, never trials or credits.
- **Freemium in three states:** `sempre` (ALWAYS FREE), `temporario` (FREE AT THE START), `nao` (PAID). Never dress up a trial/credit as "free".
- **Honest empty state:** if nothing passes the filters, the site says so — it does not force a recommendation.
- **Prices come from the catalog**, with a snapshot date and a declared conversion (USD ≈ R$ 5.50). The site never invents a number.

## Data

All data lives in `data/*.json` (single source of truth). The catalog declares the origin, the snapshot (`out/2026`), the currency and the conversion note. Before signing up, always check the provider's official page.

| File | Content |
| --- | --- |
| `data/catalogo.json` | 124 services with price, freemium status and complexity |
| `data/glossario.json` | 96 terms |
| `data/modulos.json` | 6 learning modules |
| `data/cursos.json` | 11 study paths |

## How to run

No dependencies — just a static HTTP server:

```bash
# option 1
python -m http.server 8033
# open http://localhost:8033

# option 2 (via npm, server only)
npm run serve
```

## Verification

```bash
npm run audit   # syntax of all JS modules + used × defined CSS classes + valid JSON
npm test        # test of the recommendation engine (honesty contracts)
npm run verify  # audit + test
```

`npm run verify` also runs in GitHub Actions (`.github/workflows/ci.yml`).

## Structure

```
.
├── index.html              # SPA shell (hash router)
├── css/                    # tokens, primitives, base, layout, components, views, motion
├── js/
│   ├── app.js              # router, menu, theme, global state
│   ├── core/               # data, dom, format, store
│   ├── engine/             # recommend.js (recommendation engine) and prompt.js
│   ├── ui/                 # cards, dialog, particles, parts, reveal
│   └── views/              # one view per route
├── data/*.json             # catalog, glossary, modules, courses
├── assets/fonts/           # Fraunces and Archivo (served locally)
├── tests/                  # engine tests (node:test)
└── audit-*.cjs             # integrity checks (syntax, classes, JSON)
```

## License

MIT — see [LICENSE](LICENSE).
Developed by [Kelvin Oliveira](https://github.com/kelvinoliveiracode). Mentioned brands belong to their owners.
