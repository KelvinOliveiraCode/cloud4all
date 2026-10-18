# cloud4all

<div align="center">

[English](README.en.md) · **Português (Brasil)**

</div>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML) [![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS) [![Vanilla JS](https://img.shields.io/badge/Vanilla%20JS-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript) [![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-222?style=flat-square&logo=githubpages)](https://pages.github.com/) [![MIT License](https://img.shields.io/badge/License-MIT-f4c430?style=flat-square)](LICENSE)

### Cloud4All ,  a nuvem ideal por regra aberta: 124 servicos de 8 marcas, filtro deterministico, modo claro/escuro e catalogo aberto (JSON + llms.txt) para qualquer chat de IA

---

## O que é

Cloud4All ,  a nuvem ideal por regra aberta: 124 servicos de 8 marcas, filtro deterministico, modo claro/escuro e catalogo aberto (JSON + llms.txt) para qualquer chat de IA

---

## Início Rápido

Abra `index.html` diretamente no navegador, ou sirva localmente:

```bash
python -m http.server 8080
# Acesse http://localhost:8080
```

Ou faça deploy no GitHub Pages / Netlify / Vercel com configuração zero.

## Como funciona

**Arquitetura zero-build, arquivo único** ,  tudo vive em `index.html`:
- **HTML5** estrutura semântica
- **CSS3** propriedades customizadas para tema (claro/escuro)
- **Vanilla ES6+ JavaScript** ,  sem framework, sem build
- **localStorage** para persistência de tema
- **Catálogo JSON** (`catalogo.json`) como fonte de dados aberta

---

## Capabilities

| Capability | Description |
|------------|-------------|
| Recommendation Engine | Deterministic filter: Area ∩ Price -> Provider -> Free tier -> Config level |
| Catalog | 124 services from 8 providers (AWS, Azure, GCP, Oracle, Cloudflare, DO, Firebase, Google) |
| Open Data | catalogo.json + llms.txt for AI chat consumption |
| Education | Cloud vocabulary (IaaS/PaaS/SaaS), myth-busting, glossary, 5-question quiz |
| Theming | Light/dark mode persisted in localStorage, no external CSS |
| Zero Build | Single index.html ,  deploy anywhere (GitHub Pages, Netlify, Vercel) |
| Auditability | Every filter decision shown: "How we got here" traces all 124 services |
| No Tracking | No user accounts, no analytics, no external dependencies |


---

## Showcase

### Cloud Recommendation Engine

1. **Area ∩ Price** ,  Filter 124 services by selected area and budget
2. **Refine** ,  Provider, free-tier type, max config level (1-5)
3. **Rank** ,  Lowest price, then simplest; transparent tie-breaking
4. **Explain** ,  "How we got here" traces every service decision
5. **Open Data** ,  catalogo.json + llms.txt for any AI chat

[View index.html](index.html) · [Catalog JSON](catalogo.json)

---

## FAQ

<details>
<summary><strong>Are prices real-time?</strong></summary>

No. Prices are a snapshot (Oct/2026) with ~USD 1 ≈ R$ 5.50 conversion. Always confirm on the provider's official page (linked in each row).

</details>

<details>
<summary><strong>Why no recommendation when nothing matches?</strong></summary>

Honest empty result is better than a misleading suggestion. The tool shows exactly why each service was included or excluded.

</details>

<details>
<summary><strong>Can I add more providers?</strong></summary>

Yes ,  edit the catalog in index.html (or regenerate catalogo.json via gerar-json.mjs).

</details>



---

## Documentation

- **Source Code** ,  Browse the `src/` directory for implementation details
- **API Reference** ,  N/A
- **Architecture Diagram** ,  See [architecture.mermaid](docs/architecture.mermaid) (if present)
- **Changelog** ,  [CHANGELOG.md](CHANGELOG.md) (if present)
- **Contributing** ,  [CONTRIBUTING.md](CONTRIBUTING.md) (if present)

## License

[MIT](LICENSE) ,  Kelvin Oliveira

---

<div align="center">

**Built with** · Vanilla HTML/CSS/JS

**Author** · [Kelvin Oliveira](https://github.com/KelvinOliveiraCode) · [Portfolio](https://kelvinoliveiracode.github.io/portfolio/)

</div>