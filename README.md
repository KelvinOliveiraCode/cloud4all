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

## Capacidades

| Capacidade | Descrição |
|------------|-------------|
| Motor de Recomendação | Filtro determinístico: Área ∩ Preço -> Provedor -> Tier gratuito -> Nível de config |
| Catálogo | 124 serviços de 8 provedores (AWS, Azure, GCP, Oracle, Cloudflare, DO, Firebase, Google) |
| Dados Abertos | catalogo.json + llms.txt para consumo por chat de IA |
| Educação | Vocabulário de nuvem (IaaS/PaaS/SaaS), myth-busting, glossário, quiz de 5 perguntas |
| Tematização | Modo claro/escuro persistido em localStorage, sem CSS externo |
| Zero Build | index.html único ,  deploy em qualquer lugar (GitHub Pages, Netlify, Vercel) |
| Auditoria | Cada decisão do filtro exibida: "Como chegamos aqui" rastreia todos 124 serviços |
| Sem Rastreamento | Sem contas de usuário, sem analytics, sem dependências externas |


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

## Perguntas Frequentes

<details>
<summary><strong>Preços são em tempo real?</strong></summary>

Não. Preços são snapshot (Out/2026) com ~USD 1 ≈ R$ 5,50 conversão. Sempre confirme na página oficial do provedor (linkada em cada linha).

</details>

<details>
<summary><strong>Por que sem recomendação quando nada passa?</strong></summary>

Resultado vazio honesto é melhor que sugestão enganosa. A ferramenta mostra exatamente por que cada serviço foi incluído ou excluído.

</details>

<details>
<summary><strong>Posso adicionar mais provedores?</strong></summary>

Sim ,  edite o catálogo no index.html (ou regenere catalogo.json via gerar-json.mjs).

</details>



---

## Documentação

- **Código-Fonte** ,  Navegue pelo diretório `src/` para detalhes de implementação
- **Referência da API** ,  N/A
- **Diagrama de Arquitetura** ,  Veja [architecture.mermaid](docs/architecture.mermaid) (se presente)
- **Changelog** ,  [CHANGELOG.md](CHANGELOG.md) (se presente)
- **Contribuindo** ,  [CONTRIBUTING.md](CONTRIBUTING.md) (se presente)

## Licença

[MIT](LICENSE) ,  Kelvin Oliveira

---

<div align="center">

**Construído com** · Vanilla HTML/CSS/JS

**Autor** · [Kelvin Oliveira](https://github.com/KelvinOliveiraCode) · [Portfolio](https://kelvinoliveiracode.github.io/portfolio/)

</div>