import { h, icon, clear } from "../core/dom.js";
import { getGlossary } from "../core/data.js";
import { normalize } from "../core/format.js";
import { viewHead } from "../ui/parts.js";
import { art } from "../art.js";

export async function glossarioView(ctx) {
  const data = await getGlossary();
  const categories = data.categorias;
  const terms = [...data.termos].sort((a, b) =>
    a.t.localeCompare(b.t, "pt-BR", { sensitivity: "base" })
  );

  const counts = new Map();
  for (const term of terms) counts.set(term.cat, (counts.get(term.cat) ?? 0) + 1);

  const letters = Array.from(
    new Set(terms.map((term) => baseLetter(term.t)))
  ).sort((a, b) => a.localeCompare(b, "pt-BR"));

  const state = {
    query: ctx.query?.get("q") ?? "",
    cat: ctx.query?.get("cat") ?? "todos",
    letter: "todos",
  };

  if (state.cat !== "todos" && !categories[state.cat]) state.cat = "todos";

  const searchInput = h("input", {
    class: "input",
    type: "search",
    id: "glossario-busca",
    placeholder: "Buscar termo, sigla ou expressão",
    autocomplete: "off",
    value: state.query,
    "aria-label": "Buscar no glossário",
  });

  const clearButton = h(
    "button",
    {
      class: "search-clear",
      type: "button",
      "aria-label": "Limpar busca",
      hidden: !state.query,
      onclick: () => {
        searchInput.value = "";
        state.query = "";
        clearButton.hidden = true;
        renderList();
        searchInput.focus();
      },
    },
    icon("close", 16)
  );

  const countLabel = h("span", { class: "live", "aria-live": "polite" });
  const activeCatLabel = h("span", {});
  const listRoot = h("div", {});
  const surpriseNote = h("p", { class: "note", hidden: true });

  const catChips = h(
    "div",
    { class: "chip-row", role: "group", "aria-label": "Categorias" },
    chip("Todos", "todos", terms.length),
    ...Object.entries(categories).map(([key, value]) =>
      chip(value.nome, key, counts.get(key) ?? 0)
    )
  );

  const alphaRoot = h("div", { class: "alpha", role: "group", "aria-label": "Índice por letra" });
  renderAlpha();

  function chip(label, value, count) {
    return h(
      "button",
      {
        class: "chip",
        type: "button",
        "aria-pressed": state.cat === value ? "true" : "false",
        "data-cat": value,
        onclick: () => {
          state.cat = value;
          for (const button of catChips.querySelectorAll("[data-cat]")) {
            button.setAttribute("aria-pressed", button.dataset.cat === value ? "true" : "false");
          }
          activeCatLabel.textContent =
            value === "todos" ? "Todas as categorias" : categories[value].resumo;
          renderList();
        },
      },
      label,
      h("small", {}, String(count))
    );
  }

  function renderAlpha() {
    clear(alphaRoot);
    alphaRoot.append(
      h(
        "button",
        {
          type: "button",
          "aria-pressed": state.letter === "todos" ? "true" : "false",
          "aria-label": "Todas as letras",
          onclick: () => {
            state.letter = "todos";
            renderAlpha();
            renderList();
          },
        },
        "·"
      )
    );
    for (const letter of letters) {
      alphaRoot.append(
        h(
          "button",
          {
            type: "button",
            "aria-pressed": state.letter === letter ? "true" : "false",
            "aria-label": `Letra ${letter}`,
            onclick: () => {
              state.letter = letter;
              renderAlpha();
              renderList();
            },
          },
          letter
        )
      );
    }
  }

  function filtered() {
    const query = normalize(state.query);
    return terms.filter((term) => {
      if (state.cat !== "todos" && term.cat !== state.cat) return false;
      if (state.letter !== "todos" && baseLetter(term.t) !== state.letter) return false;
      if (!query) return true;
      const haystack = normalize(
        [term.t, term.d, ...(term.alias ?? [])].join(" ")
      );
      return haystack.includes(query);
    });
  }

  function renderList() {
    const results = filtered();
    clear(listRoot);
    countLabel.textContent = `${results.length} ${results.length === 1 ? "termo" : "termos"}`;
    activeCatLabel.textContent =
      state.cat === "todos" ? "Todas as categorias" : categories[state.cat].resumo;

    if (!results.length) {
      listRoot.append(
        h(
          "div",
          { class: "empty", role: "status" },
          h("h3", {}, "Nenhum termo com esses filtros."),
          h(
            "p",
            {},
            "Tente uma palavra mais curta, outra grafia ou remova a categoria. A busca ignora acentos."
          ),
          h(
            "button",
            {
              class: "btn btn--quiet",
              type: "button",
              onclick: () => {
                state.query = "";
                state.cat = "todos";
                state.letter = "todos";
                searchInput.value = "";
                clearButton.hidden = true;
                for (const button of catChips.querySelectorAll("[data-cat]")) {
                  button.setAttribute("aria-pressed", button.dataset.cat === "todos" ? "true" : "false");
                }
                renderAlpha();
                renderList();
              },
            },
            "Limpar filtros",
            icon("refresh", 15)
          )
        )
      );
      return;
    }

    const groups = new Map();
    for (const term of results) {
      const letter = baseLetter(term.t);
      if (!groups.has(letter)) groups.set(letter, []);
      groups.get(letter).push(term);
    }

    for (const [letter, items] of groups) {
      listRoot.append(
        h(
          "section",
          { class: "glossary-group", "aria-label": `Letra ${letter}` },
          h("h2", { class: "glossary-letter" }, letter),
          h(
            "dl",
            { class: "term-list" },
            ...items.map((term) =>
              h(
                "div",
                { class: "term", id: `termo-${slug(term.t)}` },
                h(
                  "dt",
                  {},
                  h("span", { class: "term-name" }, ...highlight(term.t, state.query)),
                  h("span", { class: "term-cat" }, categories[term.cat]?.nome ?? term.cat)
                ),
                h("dd", {}, term.d)
              )
            )
          )
        )
      );
    }
  }

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value;
    clearButton.hidden = !state.query;
    renderList();
  });

  const surprise = () => {
    const term = terms[Math.floor(Math.random() * terms.length)];
    state.query = "";
    state.cat = "todos";
    state.letter = baseLetter(term.t);
    searchInput.value = "";
    clearButton.hidden = true;
    for (const button of catChips.querySelectorAll("[data-cat]")) {
      button.setAttribute("aria-pressed", button.dataset.cat === "todos" ? "true" : "false");
    }
    renderAlpha();
    renderList();
    surpriseNote.hidden = false;
    surpriseNote.textContent = "";
    surpriseNote.append(
      h("strong", {}, "Termo surpresa: "),
      `${term.t}. Role a lista para ler a definição.`
    );
    const target = document.getElementById(`termo-${slug(term.t)}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("is-flash");
      window.setTimeout(() => target.classList.remove("is-flash"), 2400);
    }
  };

  const node = h(
    "div",
    { class: "view" },
    viewHead({
      folio: "Glossário",
      title: h("span", {}, "O vocabulário inteiro, ", h("em", {}, "em uma página"), "."),
      lede: `${terms.length} termos em ${Object.keys(categories).length} categorias. Busca sem acento, índice A a Z e definições curtas, sem jargão escondido.`,
      art: art("index"),
    }),

    h(
      "div",
      { class: "glossary-tools" },
      h(
        "div",
        { class: "glossary-tools-inner" },
        h(
          "div",
          { class: "search" },
          icon("search", 18),
          searchInput,
          clearButton
        ),
        catChips
      )
    ),

    surpriseNote,

    h(
      "div",
      { class: "glossary-layout" },
      h(
        "div",
        {},
        h(
          "div",
          { class: "glossary-count" },
          countLabel,
          h("span", {}, activeCatLabel)
        ),
        listRoot
      ),
      h(
        "aside",
        { class: "glossary-side" },
        h(
          "div",
          { class: "side-group" },
          h("h3", {}, "Índice"),
          alphaRoot
        ),
        h(
          "div",
          { class: "side-group" },
          h("h3", {}, "Categorias"),
          h(
            "div",
            { class: "side-cats" },
            ...Object.entries(categories).map(([key, value]) =>
              h(
                "button",
                {
                  type: "button",
                  "aria-pressed": state.cat === key ? "true" : "false",
                  "data-side-cat": key,
                  onclick: () => {
                    state.cat = key;
                    for (const button of catChips.querySelectorAll("[data-cat]")) {
                      button.setAttribute("aria-pressed", button.dataset.cat === key ? "true" : "false");
                    }
                    for (const button of node.querySelectorAll("[data-side-cat]")) {
                      button.setAttribute("aria-pressed", button.dataset.sideCat === key ? "true" : "false");
                    }
                    renderList();
                  },
                },
                h("span", {}, value.nome),
                h("small", {}, String(counts.get(key) ?? 0))
              )
            )
          )
        ),
        h(
          "div",
          { class: "side-group" },
          h("h3", {}, "Não achou?"),
          h(
            "p",
            { class: "prose", style: { "font-size": "0.78rem" } },
            "Sorteie um termo ou volte ao começo. O glossário cresce junto com o catálogo."
          ),
          h(
            "button",
            { class: "btn btn--quiet btn--sm", type: "button", onclick: surprise },
            icon("spark", 15),
            "Termo surpresa"
          )
        )
      )
    )
  );

  renderList();

  return { node, title: "Glossário de nuvem" };
}

function baseLetter(value) {
  return normalize(value).charAt(0).toUpperCase();
}

function slug(value) {
  return normalize(value).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function highlight(text, query) {
  const q = normalize(query);
  if (!q) return [text];

  let normalized = "";
  const map = [];
  for (let index = 0; index < text.length; index += 1) {
    const part = text[index]
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
    for (let k = 0; k < part.length; k += 1) {
      map.push(index);
      normalized += part[k];
    }
  }

  const start = normalized.indexOf(q);
  if (start === -1) return [text];
  const end = start + q.length;
  const startOriginal = map[start];
  const endOriginal = map[end - 1] + 1;

  return [
    text.slice(0, startOriginal),
    h("mark", {}, text.slice(startOriginal, endOriginal)),
    text.slice(endOriginal),
  ];
}
