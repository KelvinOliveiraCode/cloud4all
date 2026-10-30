import { h, icon, clear } from "../core/dom.js";
import { getCourses } from "../core/data.js";
import { viewHead, sectionHead } from "../ui/parts.js";
import { art } from "../art.js";

const TYPE_LABEL = {
  certificação: "certificação",
  curso: "curso",
  trilha: "trilha",
};

const COST_LABEL = {
  gratuito: "gratuito",
  "gratuito com conta": "gratuito com conta",
  pago: "pago",
  varia: "custo varia",
};

const COST_CLASS = {
  gratuito: "badge badge--free",
  "gratuito com conta": "badge badge--trial",
  pago: "badge badge--paid",
  varia: "badge badge--plain",
};

export default async function cursosView() {
  const data = await getCourses();
  const platforms = data.plataformas;
  const items = data.itens;

  const providers = Array.from(new Set(items.map((item) => item.provedor)));
  const types = Array.from(new Set(items.map((item) => item.tipo)));
  const costs = Array.from(new Set(items.map((item) => item.custo)));

  const state = {
    providers: new Set(),
    types: new Set(),
    costs: new Set(),
  };

  const countLabel = h("span", { class: "live", "aria-live": "polite" });
  const listRoot = h("div", { class: "course-list" });
  const toolsRoot = h("div", { class: "course-tools" });

  function chip(label, group, value, count) {
    return h(
      "button",
      {
        class: "chip",
        type: "button",
        "data-group": group,
        "data-value": value,
        "aria-pressed": state[group].has(value) ? "true" : "false",
        onclick: (event) => {
          const set = state[group];
          if (set.has(value)) set.delete(value);
          else set.add(value);
          event.currentTarget.setAttribute("aria-pressed", set.has(value) ? "true" : "false");
          render();
        },
      },
      label,
      h("small", {}, String(count))
    );
  }

  function buildTools() {
    clear(toolsRoot);
    toolsRoot.append(
      h(
        "div",
        { class: "chip-row", role: "group", "aria-label": "Provedor" },
        ...providers.map((provider) =>
          chip(provider, "providers", provider, items.filter((item) => item.provedor === provider).length)
        )
      ),
      h(
        "div",
        { class: "chip-row", role: "group", "aria-label": "Tipo e custo" },
        ...types.map((type) =>
          chip(TYPE_LABEL[type] ?? type, "types", type, items.filter((item) => item.tipo === type).length)
        ),
        ...costs.map((cost) =>
          chip(COST_LABEL[cost] ?? cost, "costs", cost, items.filter((item) => item.custo === cost).length)
        )
      ),
      h(
        "div",
        { class: "od-row", style: { "--od-gap": "12px" } },
        countLabel,
        h(
          "button",
          {
            class: "btn btn--quiet btn--sm",
            type: "button",
            onclick: () => {
              state.providers.clear();
              state.types.clear();
              state.costs.clear();
              for (const button of toolsRoot.querySelectorAll("[data-group]")) {
                button.setAttribute("aria-pressed", "false");
              }
              render();
            },
          },
          "Limpar",
          icon("refresh", 14)
        )
      )
    );
  }

  function filtered() {
    return items.filter((item) => {
      if (state.providers.size && !state.providers.has(item.provedor)) return false;
      if (state.types.size && !state.types.has(item.tipo)) return false;
      if (state.costs.size && !state.costs.has(item.custo)) return false;
      return true;
    });
  }

  function render() {
    const results = filtered();
    clear(listRoot);
    countLabel.textContent = `${results.length} ${results.length === 1 ? "item" : "itens"} de ${items.length}`;

    if (!results.length) {
      listRoot.append(
        h(
          "div",
          { class: "empty", role: "status" },
          h("h3", {}, "Nada com essa combinação."),
          h(
            "p",
            {},
            "Os filtros são cumulativos. Remova um deles para ver as outras opções de estudo."
          )
        )
      );
      return;
    }

    for (const item of results) {
      listRoot.append(
        h(
          "article",
          { class: "course-row" },
          h(
            "div",
            {},
            h("h3", {}, item.nome),
            h(
              "span",
              { class: "course-provider" },
              `${item.provedor} · ${
                item.verificado
                  ? `conferido em ${formatDate(item.verificado_em)}`
                  : "link não conferido"
              }`
            )
          ),
          h(
            "div",
            { class: "course-cell course-cell--type" },
            h("span", {}, "Tipo"),
            TYPE_LABEL[item.tipo] ?? item.tipo
          ),
          h("div", { class: "course-cell" }, h("span", {}, "Nível"), item.nivel),
          h(
            "div",
            { class: "course-cell" },
            h("span", {}, "Custo"),
            h("span", { class: COST_CLASS[item.custo] ?? "badge badge--plain" }, COST_LABEL[item.custo] ?? item.custo)
          ),
          h(
            "a",
            {
              href: item.url,
              target: "_blank",
              rel: "noopener noreferrer",
              "aria-label": `Abrir ${item.nome} no site oficial`,
              title: "Abrir no site oficial",
            },
            icon("arrowUpRight", 15)
          )
        )
      );
    }
  }

  const unverified = items.filter((item) => !item.verificado);

  buildTools();
  render();

  const node = h(
    "div",
    { class: "view" },
    viewHead({
      folio: "07 / Cursos",
      title: h("span", {}, "Estudar de graça, ", h("em", {}, "pagar só o exame"), "."),
      lede: `${items.length} caminhos em ${platforms.length} plataformas oficiais. Trilhas e cursos abertos ficam separados das certificações pagas, para você não confundir uma coisa com a outra.`,
      art: art("steps"),
    }),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Plataformas",
        title: "Onde o material oficial mora.",
        text: "Cada provedor mantém o próprio acervo. Nenhum link passa por intermediário.",
      }),
      h(
        "div",
        { class: "platform-grid", "data-reveal": "" },
        ...platforms.map((platform) =>
          h(
            "div",
            { class: "platform" },
            h(
              "a",
              { href: platform.url, target: "_blank", rel: "noopener noreferrer" },
              platform.nome
            ),
            h("span", {}, platform.provedor),
            h(
              "span",
              {},
              platform.verificado
                ? `conferido em ${formatDate(platform.verificado_em)}`
                : "não conferido"
            )
          )
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Lista",
        title: "Trilha, curso ou certificação?",
        text: "Trilha é sequência de conteúdo. Curso é aula. Certificação é o exame que você paga para fazer.",
      }),
      toolsRoot,
      listRoot,
      h(
        "p",
        { class: "course-note" },
        icon("info", 14),
        data.aviso
      )
    ),

    unverified.length
      ? h(
          "section",
          { class: "section" },
          sectionHead({
            folio: "Transparência",
            title: "O que não conseguimos conferir.",
            text: "Quando a página oficial bloqueia leitura, o item continua na lista com o aviso.",
          }),
          h(
            "div",
            { class: "prose" },
            ...unverified.map((item) =>
              h(
                "p",
                {},
                h("strong", {}, `${item.provedor} · ${item.nome}. `),
                item.nota ?? "A página oficial não abriu para leitura automática."
              )
            )
          )
        )
      : null,

    h(
      "div",
      { class: "section" },
      h(
        "div",
        { class: "note" },
        h("strong", {}, "Custo não é o mesmo que preço do exame. "),
        "Trilhas gratuitas podem exigir conta no provedor. Certificações pagas costumam ter valor separado, em dólar, e às vezes voucher. Confirme no site oficial antes de pagar."
      )
    )
  );

  return { node, title: "Cursos e certificações de nuvem" };
}

function formatDate(value) {
  if (!value) return "sem data";
  const [year, month, day] = String(value).split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year}`;
}
