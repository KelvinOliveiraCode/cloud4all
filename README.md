# cloud4all

[![HTML/CSS/JS](https://img.shields.io/badge/HTML-CSS-JS-orange)](https://developer.mozilla.org/)   ![status: concluido](https://img.shields.io/badge/status-concluido-green)   ![licenca: MIT](https://img.shields.io/badge/licenca-MIT-blue)

## Resumo

Cloud4All ,  a nuvem ideal por regra aberta: 124 servicos de 8 marcas, filtro deterministico, modo claro/escuro e catalogo aberto (JSON + llms.txt) para qualquer chat de IA
## Problema / Por que existe

O projeto aborda um recorte prático e automatiza uma tarefa que, feita manualmente, é repetitiva e propensa a erro. O foco está em transformar dados ou processos em saída confiável, com código legível, testável e extensível.
## Arquitetura

Arquivos de código (4):
- `index.html`
- `catalogo.json`
- `gerar-json.mjs`
- `test.mjs`
## Padrões de Projeto e Técnicas Identificadas

- ESM build scripts (.mjs)
- JSON data catalog
- Single-page HTML entry
- localStorage theme persistence
## O que faz

Cloud4All ,  a nuvem ideal por regra aberta: 124 servicos de 8 marcas, filtro deterministico, modo claro/escuro e catalogo aberto (JSON + llms.txt) para qualquer chat de IA
## Como rodar

Abra o arquivo `index.html` diretamente no navegador, ou sirva localmente:

```bash
python -m http.server 8080
# acesse http://localhost:8080
```
## Estrutura do Projeto

- `index.html`
- `catalogo.json`
- `gerar-json.mjs`
- `test.mjs`
## Trade-offs e Decisões Técnicas

- Arquivo único (ou poucos): fácil de hospedar em qualquer servidor estático (GitHub Pages, Netlify, Vercel) e de auditar linha a linha.
- Sem build, sem servidor, sem banco de dados.
- Dados em snapshot (quando aplicável), não em tempo real ,  o usuário confirma na fonte oficial linkada.
- Tema claro/escuro persistido em `localStorage` sem JavaScript externo.
## Limitações Conhecidas

- Sem backend; funcionalidade limitada ao navegador.
- Dados estáticos ou em snapshot; confirme valores em fontes oficiais.
- Não há autenticação nem multi-usuário.
## Testes

Nenhum teste automatizado detectado (projeto de documentação/guia).
## Licença

Distribuído sob a licença MIT. Consulte o arquivo `LICENSE` do repositório.
## Autor

Kelvin Oliveira ,  https://github.com/KelvinOliveiraCode
Portfolio: https://kelvinoliveiracode.github.io/portfolio/
