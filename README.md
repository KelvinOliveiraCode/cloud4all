# Cloud4All — a nuvem ideal por regra aberta, e catálogo aberto para qualquer IA

![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/Live-GitHub_Pages-121013?style=flat-square&logo=githubpages&logoColor=white)

**Cloud4All** traduz necessidade simples em recomendação de nuvem: a pessoa
escolhe a **área** e a **faixa de preço**, e o site aponta o serviço ideal entre
**124 opções de 8 marcas** — AWS, Azure, Google Cloud, Oracle Cloud, Cloudflare,
DigitalOcean, Firebase e Google. A recomendação é **100% determinística**:
filtro `área ∩ preço → menor custo → mais simples`, com a conta aberta em
"Como chegamos aqui". É um arquivo HTML único, sem build, sem backend — a regra
inteira roda no navegador e pode ser auditada linha por linha. O catálogo
também é publicado como **dado aberto** (`catalogo.json` + `llms.txt`), para o
chat de IA que a pessoa já usa recomendar sem instalar nada.

**Ver o site:** https://kelvinoliveiracode.github.io/cloud4all/

---

## 🇧🇷 Português

### O que é

Plataforma para traduzir necessidade simples em configuração real de nuvem, para
estudantes e pequenos negócios. Resumo aceito no **Connepi 2026 (IFPA)**.

O fluxo é direto: aba **Filtros** → escolhe área (site, app/API, banco de dados,
arquivos, analisar dados, rede e entrega, treino de IA) e preço → a primeira da
fila é a nuvem ideal, e a tabela completa mostra todo o resto com os excluídos e
o motivo de cada corte. Quando nada passa no filtro, a página **diz que não há**
em vez de forçar indicação ruim.

### Converse com sua IA (sem configurar nada)

A página tem três abas — **Início**, **Catálogo** e **Filtros** — e uma seção
"Converse com sua IA". O catálogo inteiro é publicado como dado aberto e qualquer
chat entende:

- [`catalogo.json`](https://kelvinoliveiracode.github.io/cloud4all/catalogo.json) — 124 serviços com provedor, área, faixa de preço, gratuidade, nível e links oficiais;
- [`llms.txt`](https://kelvinoliveiracode.github.io/cloud4all/llms.txt) — resumo no formato que agentes de IA leem primeiro.

Na prática: a pessoa copia o **prompt pronto** da página, cola no ChatGPT,
Gemini, Claude ou Copilot e descreve o caso. Chats com acesso à internet leem o
link; os que não leem aceitam o JSON anexado, como um PDF. Sem cadastro, sem
chave de API, sem MCP para instalar.

Os dois arquivos são gerados do catálogo embutido no `index.html`:

```powershell
node gerar-json.mjs
```

### Como funciona (a regra, aberta)

```
área ∩ preço → refino por provedor / gratuidade / nível
             → ordena por menor preço ou mais simples
             → primeira da fila = nuvem ideal
             → "Como chegamos aqui" lista cada serviço verificado e por que ficou dentro ou fora
```

O modo **Iniciante** restringe o catálogo ao que se configura por telas guiadas.
Empate no critério de ordenação resolve pelo outro critério. Toda decisão fica
visível — o filtro não é caixa preta.

### Conceitos (ensinar sem jargão)

A aba **Conceitos** traduz o vocabulário da nuvem para português claro:

- **Nuvem em 3 camadas** — IaaS, PaaS e SaaS pela analogia da pizza (fazer em casa, delivery, restaurante), com exemplos reais do catálogo em cada camada;
- **Seis analogias do dia a dia** — pagar como água e luz, hotel ou casa própria, a cozinha que aparece (serverless), a padaria do bairro (CDN), elevador ou escada, o endereço do prédio (região);
- **Mito ou verdade** — cinco cartões interativos sobre as frases que todo mundo já ouviu ("nuvem é sempre mais barata", "grátis para sempre não existe");
- **Glossário** — os 10 termos que aparecem no catálogo (instância, bucket, CDN, região, SLA, lock-in…) em linguagem leiga;
- **Quiz** — cinco perguntas com correção e explicação na hora, placar e opção de refazer.

### O catálogo

| Marca | Serviços | Destaque |
|---|---:|---|
| AWS | 34 | compute, S3, RDS, rede |
| Azure | 29 | App Service, Functions, Cosmos DB |
| Google Cloud | 30 | Cloud Run, Firestore, BigQuery |
| Firebase | 4 | Auth, RTDB, FCM, Crashlytics |
| Google | 4 | Colab, Kaggle, Looker Studio, Maps |
| Oracle Cloud | 8 | Always Free |
| Cloudflare | 8 | Workers, R2, D1, Pages |
| DigitalOcean | 7 | Droplets, App Platform |

Snapshot de preços de **out/2026**, valores aproximados em R$ para uso pequeno
(conversão aproximada de USD 1 ≈ R$ 5,50). Cada linha liga a página oficial de
preços ou documentação do serviço — confirme sempre lá. Nada é inventado: todo
valor exibido existe no catálogo embutido, com fonte e data.

### Rodar local

Duplo clique em `index.html`, ou:

```powershell
Set-Location 'C:\Users\Kelvin\Desktop\cloud4all'
python -m http.server 8080
# abrir http://localhost:8080
```

### Verificar a regra (teste real, sem IA)

`test.mjs` extrai o `<script>` do `index.html` e roda o `filtrar` de verdade no
Node, com 19 asserções — ordenação, exclusão por teto, vazios honestos, filtros
de provedor/gratuidade/nível/ordem, cobertura total e ausência de duplicatas:

```powershell
node test.mjs
```

### Design

Paleta monocromática (tinta `#101013` sobre papel `#f5f5f3`, cinzas para
profundidade; pretos/brancos puros evitados por contraste e acabamento), tipos
finas **Archivo 200–600** + números em **IBM Plex Mono**, sem gradiente, sem
vidro, sem emoji como ícone, sem métrica inventada. Logo em SVG próprio: só a
nuvenzinha, de olhos fechados e sorriso. Barras de rolagem finas (10px página,
8px trilho).

**Modo claro e escuro**: o botão no canto superior direito alterna os dois
temas; a escolha fica no `localStorage` e, sem escolha feita, o site segue a
preferência do sistema (`prefers-color-scheme`). O tema escuro é a mesma
paleta invertida — papel `#141416`, tinta `#f0f0ee` — nada de gradiente ou
neon.

### Roteiro

- **hoje** — esta página: catálogo determinístico navegável + catálogo aberto
  para qualquer chat de IA;
- **por fim** — configuração assistida do serviço escolhido.

---

## 🇺🇸 English

### What it is

Cloud4All turns a simple need into a cloud recommendation: the user picks an
**area** and a **price range**, and the site points to the ideal service among
**124 options from 8 providers** — AWS, Azure, Google Cloud, Oracle Cloud,
Cloudflare, DigitalOcean, Firebase and Google. The recommendation is **fully
deterministic**: filter `area ∩ price → lowest cost → simplest`, with the math
wide open under "Como chegamos aqui" (how we got here). It is a single HTML
file, no build, no backend — the whole rule runs in the browser and can be
audited line by line. The catalog is also published as **open data**
(`catalogo.json` + `llms.txt`), so the AI chat a person already uses can
recommend without installing anything.

### Talk to your AI (nothing to set up)

The page has three tabs — **Início**, **Catálogo** and **Filtros** — plus a
"Converse com sua IA" section. The whole catalog is published as open data that
any chat understands:

- [`catalogo.json`](https://kelvinoliveiracode.github.io/cloud4all/catalogo.json) — 124 services with provider, area, price range, free tier, level and official links;
- [`llms.txt`](https://kelvinoliveiracode.github.io/cloud4all/llms.txt) — the summary in the format AI agents read first.

In practice: copy the **ready-made prompt** from the page, paste it into
ChatGPT, Gemini, Claude or Copilot and describe the case. Chats with internet
access read the link; those that don't accept the attached JSON, like a PDF. No
signup, no API key, no MCP to install.

Both files are generated from the catalog embedded in `index.html`:

```powershell
node gerar-json.mjs
```

### How it works (the rule, in the open)

```
area ∩ price → refine by provider / free tier / level
             → sort by lowest price or simplest
             → first in line = the ideal cloud
             → "how we got here" lists every service checked and why it stayed in or out
```

**Beginner mode** restricts the catalog to what can be set up through guided
screens. Ties in the sort order resolve by the other criterion. Every decision
stays visible — the filter is not a black box.

### Concepts (teaching without jargon)

The **Concepts** tab translates cloud vocabulary into plain Portuguese:

- **Cloud in 3 layers** — IaaS, PaaS and SaaS through the pizza analogy (make it at home, delivery, restaurant), with real examples from the catalog on each layer;
- **Six everyday analogies** — paying like water and power, hotel or own house, the kitchen that appears (serverless), the neighbourhood bakery (CDN), elevator or stairs, the building address (region);
- **Myth or truth** — five interactive cards on the phrases everyone has heard ("cloud is always cheaper", "free forever doesn't exist");
- **Glossary** — the 10 terms that show up in the catalog (instance, bucket, CDN, region, SLA, lock-in…) in layman's terms;
- **Quiz** — five questions with instant correction and explanation, a scoreboard and a retry button.

### The catalog

| Provider | Services | Highlight |
|---|---:|---|
| AWS | 34 | compute, S3, RDS, networking |
| Azure | 29 | App Service, Functions, Cosmos DB |
| Google Cloud | 30 | Cloud Run, Firestore, BigQuery |
| Firebase | 4 | Auth, RTDB, FCM, Crashlytics |
| Google | 4 | Colab, Kaggle, Looker Studio, Maps |
| Oracle Cloud | 8 | Always Free |
| Cloudflare | 8 | Workers, R2, D1, Pages |
| DigitalOcean | 7 | Droplets, App Platform |

Price snapshot from **Oct/2026**, approximate BRL values for small usage
(approximate conversion of USD 1 ≈ BRL 5.50). Every row links to the official
pricing or docs page for that service — always confirm there. Nothing is made
up: every displayed value exists in the embedded catalog, with source and date.

### Running it locally

Double-click `index.html`, or:

```powershell
Set-Location 'C:\Users\Kelvin\Desktop\cloud4all'
python -m http.server 8080
# open http://localhost:8080
```

### Verifying the rule (a real test, no AI)

`test.mjs` extracts the `<script>` from `index.html` and runs the actual
`filtrar` in Node, with 19 assertions — ordering, exclusion by ceiling, honest
empty results, provider/free-tier/level/order filters, full coverage and no
duplicates:

```powershell
node test.mjs
```

### Design

Monochromatic palette (ink `#101013` on paper `#f5f5f3`, greys for depth; pure
black/white avoided for contrast and finish), thin **Archivo 200–600** types +
numbers in **IBM Plex Mono**, no gradient, no glass, no emoji as icon, no
invented metric. Own SVG logo: just the little cloud, eyes closed and smiling.
Thin scrollbars (10px page, 8px track).

**Light and dark mode**: the button in the top-right corner switches themes;
the choice lives in `localStorage` and, with no choice made, the site follows
the system preference (`prefers-color-scheme`). The dark theme is the same
palette inverted — paper `#141416`, ink `#f0f0ee` — no gradient, no neon.

### Roadmap

- **today** — this page: browsable deterministic catalog + an open catalog any
  AI chat can read;
- **last** — assisted setup of the chosen service.

---

## Autor

**Kelvin Oliveira**

- GitHub: [KelvinOliveiraCode](https://github.com/KelvinOliveiraCode)
- LinkedIn: [kelvin-oliveira-code](https://www.linkedin.com/in/kelvin-oliveira-code/)
- Portfólio: https://kelvinoliveiracode.github.io/portfolio/

## Licença

Distribuído sob a licença MIT. Consulte o arquivo de licença do repositório para detalhes.
