/* Gera catalogo.json e llms.txt a partir do catálogo embutido no index.html.
   Um comando mantém os dois arquivos em sincronia com a página:

     node gerar-json.mjs

   O JSON é a fonte que chats de IA leem; o llms.txt é o resumo no formato
   que agentes leem primeiro (llmstxt.org). O test.mjs continua sendo o
   guarda-chuva: se o catálogo mudar de forma inesperada, ele reclama. */
import fs from "node:fs";
import vm from "node:vm";

const raiz = new URL(".", import.meta.url);
const html = fs.readFileSync(new URL("index.html", raiz), "utf8");
const blocos = html.match(/<script>[\s\S]*?<\/script>/g) || [];
const bloco = blocos.find(b => b.includes("CATALOGO"));
if (!bloco) { console.error("FAIL bloco do catalogo nao encontrado no index.html"); process.exit(1); }
const src = bloco.replace(/^<script>/, "").replace(/<\/script>$/, "");

const elStub = () => ({ innerHTML: "", textContent: "", classList: { toggle(){} }, addEventListener(){}, appendChild(){}, setAttribute(){}, getAttribute: () => null, value: "" });
const documentStub = {
  documentElement: { getAttribute: () => "light", setAttribute(){} },
  getElementById: () => elStub(),
  querySelectorAll: () => [],
};
const ctx = vm.createContext({ document: documentStub, console });
const { CATALOGO, AREAS } = vm.runInContext(src + "\n;({ CATALOGO, AREAS });", ctx);

const SITE = "https://kelvinoliveiracode.github.io/cloud4all/";
const total = CATALOGO.length;

const doc = {
  fonte: "Cloud4All",
  site: SITE,
  catalogo_json: SITE + "catalogo.json",
  snapshot: "out/2026",
  moeda: "BRL",
  nota_precos: "valores aproximados em reais para uso pequeno (conversão aproximada de USD 1 ≈ R$ 5,50); confirme sempre na página oficial de cada serviço",
  total: total,
  areas: AREAS,
  gratuidade: {
    sempre: "grátis para sempre",
    temporario: "grátis no começo (conta nova ou período de teste)",
    nao: "pago"
  },
  campos: {
    id: "identificador estável do serviço",
    provedor: "marca do serviço",
    nome: "nome do serviço",
    areas: "para qué serve (ver o dicionário 'areas')",
    gratis: "sempre | temporario | nao",
    min: "preço mínimo mensal aproximado, em R$",
    max: "preço máximo mensal aproximado, em R$",
    complexidade: "nível de configuração, 1 (guiado) a 5 (técnico)",
    frase: "explicação em linguagem leiga",
    gratuidade: "detalhe do que é grátis",
    doc: "link da documentação oficial",
    preco: "link da página oficial de preços"
  },
  servicos: CATALOGO
};

fs.writeFileSync(new URL("catalogo.json", raiz), JSON.stringify(doc, null, 2) + "\n", "utf8");

const llms = `# Cloud4All

> Catálogo aberto com ${total} serviços de nuvem de 8 grandes provedores (AWS, Azure, Google Cloud, Oracle Cloud, Cloudflare, DigitalOcean, Firebase e Google), com preços aproximados em reais para uso pequeno. A recomendação do site é determinística — filtro área ∩ preço → menor custo → mais simples — e o catálogo inteiro está publicado como dado aberto para qualquer chat de IA.

Cloud4All traduz "quero hospedar o site da minha loja gastando pouco" na nuvem ideal: nome do serviço, faixa de preço em reais, nível de configuração e link oficial. Snapshot de preços: out/2026. Nenhum valor é inventado — todo preço exibido existe no catálogo, com fonte e data.

## Para chats de IA (ChatGPT, Gemini, Claude, Copilot)

- [Prompt pronto](${SITE}#inicio): bloco para copiar e colar; já traz as regras de recomendação
- [Catálogo JSON](${SITE}catalogo.json): ${total} serviços com provedor, área, faixa de preço, gratuidade, nível e links oficiais
- [Regra de recomendação](${SITE}#inicio): filtro determinístico, com a conta aberta em "como chegamos aqui"

## Páginas

- [Início](${SITE}#inicio): o que é nuvem, por que democratizar e como usar com IA
- [Catálogo](${SITE}#catalogo): todos os ${total} serviços agrupados por faixa de preço
- [Filtros](${SITE}#filtros): combinação de negócio, preço, provedor, gratuidade e nível
`;

fs.writeFileSync(new URL("llms.txt", raiz), llms, "utf8");
console.log("catalogo.json: " + total + " serviços · llms.txt escrito");
