import { h, icon, formatNumber } from "../core/dom.js";
import { getCatalog, getModules, getGlossary, catalogIndex } from "../core/data.js";
import { art } from "../art.js";
import { stat, sectionHead } from "../ui/parts.js";

export default async function inicioView() {
  const [catalog, modules, glossary] = await Promise.all([
    getCatalog(),
    getModules(),
    getGlossary(),
  ]);
  const index = catalogIndex(catalog);
  const termCount = glossary.termos.length;
  const moduleCount = modules.itens.length;

  const node = h(
    "div",
    { class: "view" },
    h(
      "section",
      { class: "hero" },
      h(
        "div",
        { class: "hero-copy" },
        h("p", { class: "eyebrow" }, "Atlas aberto da nuvem"),
        h(
          "h1",
          { class: "display hero-title" },
          "Entender a nuvem ",
          h("em", {}, "sem decoreba"),
          "."
        ),
        h(
          "p",
          { class: "lede" },
          "Um mapa em português para quem precisa escolher onde hospedar, guardar e rodar. Sem ranking pago, sem promessa de mágica."
        ),
        h(
          "div",
          { class: "btn-row" },
          h("a", { class: "btn btn--solid", href: "#/encontrar" }, "Encontrar meu serviço", icon("arrow", 16)),
          h("a", { class: "btn btn--quiet", href: "#/glossario" }, "Abrir o glossário")
        )
      ),
      h("div", { class: "hero-art", html: art("orbit") }),
      h(
        "dl",
        { class: "hero-stats", "data-reveal": "" },
        stat(formatNumber(index.total), "serviços no catálogo", "com preço e gratuidade declarados"),
        stat(formatNumber(index.providers.length), "provedores mapeados", "do gratuito ao corporativo"),
        stat(formatNumber(termCount), "termos no glossário", "busca sem acento e índice A a Z"),
        stat(formatNumber(moduleCount), "módulos curtos", "com quiz e progresso salvo")
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "01 / Comece",
        title: "Três portas, nenhuma obrigatória.",
        text: "Dá para estudar do zero, filtrar o catálogo ou responder quatro perguntas e receber um ponto de partida.",
      }),
      h(
        "div",
        { class: "doors reveal-group" },
        door(
          "01",
          "Aprender",
          "Seis módulos curtos explicam o que é nuvem, quanto custa, onde ficam os dados e como não deixar a conta aberta.",
          "#/aprender",
          "Começar pelos fundamentos"
        ),
        door(
          "02",
          "Encontrar",
          "Você diz o que quer fazer, quanto pode gastar e quanto aceita configurar. A recomendação mostra a trilha inteira.",
          "#/encontrar",
          "Responder quatro perguntas"
        ),
        door(
          "03",
          "Catálogo",
          `Filtre ${formatNumber(index.total)} serviços por área, provedor, preço e complexidade. Compare até três lado a lado.`,
          "#/catalogo",
          "Explorar o catálogo"
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "02 / Módulos",
        title: "Um caminho de seis passos.",
        text: "Cada módulo cabe em uma leitura curta e termina com três perguntas para fixar o que importa.",
        aside: h("a", { class: "text-link", href: "#/aprender" }, "Ver todos", icon("arrow", 15)),
      }),
      h(
        "div",
        { class: "module-rail", "data-reveal": "" },
        ...modules.itens.slice(0, 4).map((module) =>
          h(
            "a",
            { class: "module-card", href: `#/aprender/${module.id}` },
            h("span", { class: "module-n" }, String(module.numero).padStart(2, "0")),
            h("h3", {}, module.titulo),
            h("p", {}, module.chamada),
            h(
              "span",
              { class: "module-meta" },
              `${module.cartoes.length} cartões · ${module.quiz.length} perguntas`
            )
          )
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "03 / O mapa",
        title: "Oito áreas, um catálogo só.",
        text: "A área é o primeiro filtro porque elimina metade das opções erradas antes de você olhar preço.",
      }),
      h(
        "div",
        { class: "area-list", "data-reveal": "" },
        ...index.areas.map(([area, count], position) =>
          h(
            "a",
            { class: "area-row", href: `#/catalogo?area=${area}` },
            h("span", { class: "area-n" }, String(position + 1).padStart(2, "0")),
            h("span", { class: "area-name" }, catalog.areas[area] ?? area),
            h("span", { class: "area-count" }, `${count} serviços`),
            icon("arrow", 16)
          )
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      h(
        "div",
        { class: "manifesto", "data-reveal": "" },
        h(
          "blockquote",
          {},
          "Nuvem não é um produto que se compra uma vez. É uma pilha de decisões que se revisa ",
          h("em", {}, "todo mês"),
          "."
        ),
        h(
          "aside",
          {},
          h(
            "p",
            {},
            "Por isso este atlas mostra preço aproximado, gratuidade e complexidade no mesmo lugar. E diz quando não sabe."
          ),
          h("a", { class: "text-link", href: "#/sobre" }, "Como os dados são mantidos", icon("arrow", 15))
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      h(
        "div",
        { class: "od-row", style: { "--od-gap": "24px" } },
        h(
          "div",
          { class: "od-fill" },
          h("p", { class: "eyebrow" }, "04 / Próximo passo"),
          h("h2", { class: "display", style: { "font-size": "var(--step-3)", "margin-top": "10px" } }, "Uma pergunta bem feita vale mais que uma lista longa."),
          h(
            "p",
            { class: "prose", style: { "margin-top": "10px" } },
            "Responda quatro perguntas e leve um prompt pronto para a IA que você já usa. Nada é enviado para fora do navegador."
          )
        ),
        h(
          "div",
          { class: "btn-row" },
          h("a", { class: "btn btn--solid", href: "#/encontrar" }, "Começar pelo problema", icon("arrow", 16)),
          h("a", { class: "btn btn--quiet", href: "#/ia" }, "Montar um prompt")
        )
      )
    )
  );

  return { node, title: "Entender e escolher nuvem" };
}

function door(num, title, text, href, cta) {
  return h(
    "a",
    { class: "door", href },
    h("span", { class: "door-num" }, num),
    h("h3", {}, title),
    h("p", {}, text),
    h("span", { class: "door-arrow" }, cta, icon("arrow", 15))
  );
}
