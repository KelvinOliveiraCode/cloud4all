import { h, icon, clear } from "../core/dom.js";
import { getCatalog, catalogIndex } from "../core/data.js";
import {
  normalize,
  priceBand,
  complexityLabel,
  gratuityLabel,
  areaName,
  priceLabel,
} from "../core/format.js";
import { getCompare, setCompare } from "../core/store.js";
import { serviceCard, openServiceDialog } from "../ui/cards.js";
import { openDialog } from "../ui/dialog.js";
import { viewHead } from "../ui/parts.js";
import { art } from "../art.js";

const BANDS = [
  { id: "zero", label: "grátis", hint: "R$ 0" },
  { id: "baixo", label: "até R$ 50", hint: "uso pequeno" },
  { id: "medio", label: "até R$ 200", hint: "projeto médio" },
  { id: "alto", label: "acima de R$ 200", hint: "carga maior" },
];

export default async function catalogoView(ctx) {
  const catalog = await getCatalog();
  const index = catalogIndex(catalog);
  const services = catalog.servicos;

  const state = {
    query: ctx.query?.get("q") ?? "",
    areas: new Set(ctx.query?.get("area") ? [ctx.query.get("area")] : []),
    providers: new Set(ctx.query?.get("provedor") ? [ctx.query.get("provedor")] : []),
    gratuity: new Set(),
    complexity: new Set(),
    bands: new Set(),
    sort: "relevancia",
    visible: 18,
    compare: getCompare(),
  };

  const countLabel = h("span", { class: "live", "aria-live": "polite" });
  const activeRoot = h("div", { class: "active-filters" });
  const grid = h("div", { class: "result-grid" });
  const loadWrap = h("div", { class: "load-more" });

  const searchInput = h("input", {
    class: "input",
    type: "search",
    placeholder: "Buscar por nome, provedor ou uso",
    value: state.query,
    "aria-label": "Buscar no catálogo",
    autocomplete: "off",
  });

  const sortSelect = h(
    "select",
    {
      class: "select",
      "aria-label": "Ordenar resultados",
      onchange: (event) => {
        state.sort = event.target.value;
        state.visible = 18;
        render();
      },
    },
    option("relevancia", "Relevância"),
    option("preco", "Menor preço"),
    option("complexidade", "Menor complexidade"),
    option("nome", "Nome A a Z")
  );

  const filterPanel = buildFilters();
  const sheetBody = buildFilters();
  const sheet = buildSheet();

  const tray = h("div", { class: "compare-tray", hidden: true });
  const trayText = h("p", {});
  const trayButton = h(
    "button",
    { class: "btn btn--solid", type: "button", onclick: openCompare },
    "Comparar",
    icon("compare", 15)
  );
  const trayClear = h(
    "button",
    {
      class: "compare-clear",
      type: "button",
      "aria-label": "Limpar comparação",
      onclick: () => {
        state.compare = setCompare([]);
        render();
      },
    },
    icon("close", 14)
  );
  tray.append(trayText, trayButton, trayClear);

  function toggle(set, value) {
    if (set.has(value)) set.delete(value);
    else set.add(value);
    state.visible = 18;
    syncFilters();
    render();
  }

  function syncFilters() {
    for (const button of document.querySelectorAll("[data-filter]")) {
      const group = button.dataset.filter;
      const value = button.dataset.value;
      const active = state[group]?.has?.(value) ?? false;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function buildFilters() {
    const wrap = h("div", { class: "filter-panel" });
    wrap.append(
      filterGroup("Área", "areas", Object.entries(catalog.areas).map(([id, label]) => ({
        id,
        label,
        count: index.areas.find(([key]) => key === id)?.[1] ?? 0,
      }))),
      filterGroup("Provedor", "providers", index.providers.map(([name, count]) => ({
        id: name,
        label: name,
        count,
      }))),
      filterGroup("Gratuidade", "gratuity", [
        { id: "sempre", label: "grátis para sempre", count: index.gratuity.sempre },
        { id: "temporario", label: "grátis no começo", count: index.gratuity.temporario },
        { id: "nao", label: "pago", count: index.gratuity.nao },
      ]),
      filterGroup("Complexidade", "complexity", [1, 2, 3, 4, 5].map((level) => ({
        id: String(level),
        label: `${level} · ${complexityLabel(level)}`,
        count: index.complexity.get(level) ?? 0,
      }))),
      filterGroup("Preço por mês", "bands", BANDS.map((band) => ({
        id: band.id,
        label: band.label,
        count: services.filter((service) => priceBand(service) === band.id).length,
      }))),
      h(
        "div",
        { class: "filter-actions" },
        h(
          "button",
          { class: "btn btn--quiet btn--sm", type: "button", onclick: clearFilters },
          "Limpar filtros",
          icon("refresh", 14)
        )
      )
    );
    return wrap;
  }

  function filterGroup(label, group, options) {
    return h(
      "div",
      { class: "filter-group" },
      h("h3", {}, label),
      h(
        "div",
        { class: "chip-row", role: "group", "aria-label": label },
        ...options.map((option) =>
          h(
            "button",
            {
              class: "chip",
              type: "button",
              "data-filter": group,
              "data-value": option.id,
              "aria-pressed": state[group].has(option.id) ? "true" : "false",
              onclick: () => toggle(state[group], option.id),
            },
            option.label,
            option.count !== undefined ? h("small", {}, String(option.count)) : null
          )
        )
      )
    );
  }

  function buildSheet() {
    const dialog = h("dialog", { class: "sheet", "aria-label": "Filtros do catálogo" });
    const body = h("div", { class: "sheet-body" });
    const inner = h(
      "div",
      { class: "sheet-inner" },
      h(
        "div",
        { class: "sheet-head" },
        h("h2", {}, "Filtrar serviços"),
        h(
          "button",
          {
            class: "dialog-close",
            type: "button",
            "aria-label": "Fechar filtros",
            onclick: () => dialog.close(),
          },
          icon("close", 18)
        )
      ),
      body,
      h(
        "div",
        { class: "sheet-foot" },
        h(
          "button",
          { class: "btn btn--solid", type: "button", onclick: () => dialog.close() },
          "Ver resultados",
          icon("arrow", 15)
        )
      )
    );
    dialog.append(inner);
    body.append(sheetBody);
    dialog.addEventListener("close", () => document.body.classList.remove("is-locked"));
    return dialog;
  }

  function clearFilters() {
    state.query = "";
    state.areas.clear();
    state.providers.clear();
    state.gratuity.clear();
    state.complexity.clear();
    state.bands.clear();
    state.visible = 18;
    searchInput.value = "";
    syncFilters();
    render();
  }

  function filtered() {
    const query = normalize(state.query);
    const list = services.filter((service) => {
      if (state.areas.size) {
        const hasAny = service.areas.includes("qualquer");
        const match = [...state.areas].some((area) => service.areas.includes(area));
        if (!hasAny && !match) return false;
      }
      if (state.providers.size && !state.providers.has(service.provedor)) return false;
      if (state.gratuity.size && !state.gratuity.has(service.gratis)) return false;
      if (state.complexity.size && !state.complexity.has(String(service.complexidade))) return false;
      if (state.bands.size && !state.bands.has(priceBand(service))) return false;
      if (query) {
        const haystack = normalize(
          [
            service.nome,
            service.provedor,
            service.frase,
            service.gratuidade,
            ...service.areas.map((area) => catalog.areas[area] ?? area),
          ].join(" ")
        );
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    return list.sort((a, b) => {
      if (state.sort === "preco") return a.min - b.min || a.nome.localeCompare(b.nome, "pt-BR");
      if (state.sort === "complexidade") {
        return a.complexidade - b.complexidade || a.nome.localeCompare(b.nome, "pt-BR");
      }
      if (state.sort === "nome") return a.nome.localeCompare(b.nome, "pt-BR");
      const free = { sempre: 0, temporario: 1, nao: 2 };
      return (
        (free[a.gratis] ?? 2) - (free[b.gratis] ?? 2) ||
        a.min - b.min ||
        a.complexidade - b.complexidade ||
        a.nome.localeCompare(b.nome, "pt-BR")
      );
    });
  }

  function render() {
    const results = filtered();
    const shown = results.slice(0, state.visible);

    clear(grid);
    clear(loadWrap);
    clear(activeRoot);

    countLabel.textContent = `${results.length} ${results.length === 1 ? "serviço" : "serviços"} de ${services.length}`;

    if (!results.length) {
      grid.append(
        h(
          "div",
          { class: "empty", role: "status" },
          h("h3", {}, "Nenhum serviço com essa combinação."),
          h(
            "p",
            {},
            "Os filtros são cumulativos. Remova um deles ou tente uma busca mais curta. O catálogo não esconde resultado pago para favorecer ninguém."
          ),
          h(
            "button",
            { class: "btn btn--quiet", type: "button", onclick: clearFilters },
            "Limpar filtros",
            icon("refresh", 15)
          )
        )
      );
    } else {
      for (const service of shown) {
        grid.append(
          serviceCard(service, {
            catalog,
            selected: state.compare.includes(service.id),
            onCompare: () => {
              state.compare = setCompare(
                state.compare.includes(service.id)
                  ? state.compare.filter((id) => id !== service.id)
                  : [...state.compare, service.id]
              );
              render();
            },
          })
        );
      }
    }

    if (results.length > state.visible) {
      loadWrap.append(
        h(
          "button",
          {
            class: "btn btn--quiet",
            type: "button",
            onclick: () => {
              state.visible += 18;
              render();
            },
          },
          `Mostrar mais ${Math.min(18, results.length - state.visible)}`,
          icon("plus", 15)
        )
      );
    }

    renderActive(results);
    renderTray();
  }

  function renderActive(results) {
    const chips = [];

    for (const area of state.areas) {
      chips.push(activeChip(catalog.areas[area] ?? area, () => toggle(state.areas, area)));
    }
    for (const provider of state.providers) {
      chips.push(activeChip(provider, () => toggle(state.providers, provider)));
    }
    for (const value of state.gratuity) {
      chips.push(
        activeChip(
          value === "sempre" ? "grátis para sempre" : value === "temporario" ? "grátis no começo" : "pago",
          () => toggle(state.gratuity, value)
        )
      );
    }
    for (const value of state.complexity) {
      chips.push(activeChip(`complexidade ${value}`, () => toggle(state.complexity, value)));
    }
    for (const value of state.bands) {
      const band = BANDS.find((item) => item.id === value);
      chips.push(activeChip(band?.label ?? value, () => toggle(state.bands, value)));
    }

    if (chips.length) {
      activeRoot.append(...chips);
      activeRoot.append(
        h(
          "button",
          { class: "text-link", type: "button", onclick: clearFilters, style: { "min-height": "34px", "font-size": "0.72rem" } },
          "Limpar tudo"
        )
      );
    }

    if (state.query) {
      activeRoot.append(
        activeChip(`busca: ${state.query}`, () => {
          state.query = "";
          searchInput.value = "";
          render();
        })
      );
    }
  }

  function activeChip(label, onRemove) {
    return h(
      "span",
      { class: "active-filter" },
      label,
      h(
        "button",
        { type: "button", "aria-label": `Remover filtro ${label}`, onclick: onRemove },
        icon("close", 11)
      )
    );
  }

  function renderTray() {
    const selected = state.compare
      .map((id) => services.find((service) => service.id === id))
      .filter(Boolean);

    if (!selected.length) {
      tray.hidden = true;
      return;
    }

    tray.hidden = false;
    trayText.textContent = "";
    trayText.append(
      h("strong", {}, `${selected.length} de 3`),
      ` selecionados: ${selected.map((service) => service.nome).join(", ")}`
    );
    trayButton.disabled = selected.length < 2;
    trayButton.setAttribute("aria-disabled", selected.length < 2 ? "true" : "false");
  }

  function openCompare() {
    const selected = state.compare
      .map((id) => services.find((service) => service.id === id))
      .filter(Boolean);
    if (selected.length < 2) return;

    const rows = [
      ["Provedor", (service) => service.provedor],
      ["Preço mensal", (service) => priceLabel(service)],
      ["Gratuidade", (service) => gratuityLabel(service)],
      ["Complexidade", (service) => `${service.complexidade}/5, ${complexityLabel(service.complexidade)}`],
      ["Áreas", (service) => service.areas.map((area) => areaName(catalog, area)).join(", ")],
      ["O que faz", (service) => service.frase],
      ["Detalhe do grátis", (service) => service.gratuidade],
    ];

    const body = h(
      "div",
      {},
      h(
        "div",
        { class: "table-wrap" },
        h(
          "table",
          { class: "table compare-table" },
          h(
            "thead",
            {},
            h(
              "tr",
              {},
              h("th", { scope: "col" }, "Critério"),
              ...selected.map((service) =>
                h(
                  "th",
                  { scope: "col" },
                  h(
                    "button",
                    {
                      class: "text-link",
                      type: "button",
                      onclick: () => openServiceDialog(service, catalog),
                      style: { "font-size": "0.8rem", "min-height": "auto", "text-align": "left" },
                    },
                    `${service.provedor} ${service.nome}`
                  )
                )
              )
            )
          ),
          h(
            "tbody",
            {},
            ...rows.map(([label, read]) =>
              h(
                "tr",
                {},
                h("td", {}, label),
                ...selected.map((service) => h("td", {}, read(service)))
              )
            )
          )
        )
      ),
      h(
        "p",
        { class: "course-note" },
        icon("info", 14),
        "Preços aproximados em reais para uso pequeno. Confirme na página oficial antes de contratar."
      )
    );

    openDialog({
      title: "Comparar serviços",
      subtitle: `${selected.length} selecionados`,
      body,
      actions: [
        h(
          "button",
          {
            class: "btn btn--quiet",
            type: "button",
            onclick: () => {
              state.compare = setCompare([]);
              render();
            },
          },
          "Limpar seleção",
          icon("trash", 15)
        ),
      ],
    });
  }

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    state.visible = 18;
    render();
  });

  const node = h(
    "div",
    { class: "view" },
    h(
      "div",
      { class: "catalog-head" },
      viewHead({
        folio: "Catálogo",
        title: h("span", {}, "Todo o catálogo, ", h("em", {}, "sem vitrine paga"), "."),
        lede: `${index.total} serviços de ${index.providers.length} provedores. Filtre por área, preço, gratuidade e complexidade. Compare até três.`,
        art: art("tiles"),
      }),
      h(
        "div",
        { class: "btn-row catalog-head-actions" },
        h("a", { class: "btn btn--quiet", href: "#/encontrar" }, "Não sei o que escolher", icon("compass", 15))
      )
    ),

    h(
      "div",
      { class: "catalog-toolbar" },
      h(
        "div",
        { class: "catalog-toolbar-row" },
        h("div", { class: "search" }, icon("search", 18), searchInput),
        h(
          "button",
          {
            class: "btn btn--quiet filter-count-mobile",
            type: "button",
            onclick: () => {
              document.body.classList.add("is-locked");
              sheet.showModal();
            },
          },
          icon("filter", 15),
          "Filtros"
        ),
        h(
          "div",
          { class: "sort-wrap" },
          h("span", { class: "visually-hidden" }, "Ordenar"),
          sortSelect
        )
      ),
      h(
        "div",
        { class: "results-bar" },
        countLabel,
        h(
          "span",
          {},
          `${index.gratuity.sempre} grátis para sempre · ${index.gratuity.temporario} grátis no começo`
        )
      )
    ),

    activeRoot,

    h(
      "div",
      { class: "catalog-layout" },
      filterPanel,
      h("div", {}, grid, loadWrap)
    ),

    sheet,
    tray,

    h(
      "div",
      { class: "section" },
      h(
        "p",
        { class: "course-note" },
        icon("info", 14),
        catalog.nota_precos
      )
    )
  );

  render();
  syncFilters();

  return { node, title: "Catálogo de serviços de nuvem" };
}

function option(value, label) {
  return h("option", { value }, label);
}
