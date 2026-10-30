// Roteador por hash, cabeçalho, menu e estados globais.
// Sem framework: cada vista devolve um nó e um título.

import { h, icon, qs, qsa } from "./core/dom.js";
import { getTheme, applyTheme, toggleTheme } from "./core/store.js";
import { startField } from "./ui/particles.js";
import { observeReveals } from "./ui/reveal.js";

import inicioView from "./views/inicio.js";
import { aprenderView, moduloView } from "./views/aprender.js";
import { glossarioView } from "./views/glossario.js";
import tiposView from "./views/tipos.js";
import catalogoView from "./views/catalogo.js";
import encontrarView from "./views/encontrar.js";
import cursosView from "./views/cursos.js";
import iaView from "./views/ia.js";
import sobreView from "./views/sobre.js";
import naoEncontradoView from "./views/naoEncontrado.js";

const SITE = "Cloud4All Brasil";
const app = qs("#app");
const main = qs("#conteudo");
const header = qs(".site-header");
const menu = qs("#menu");
const menuClose = qs("#menu-close");
const themeButton = qs("#theme-toggle");
const menuOpenButtons = qsa("[data-menu-open]");

let navToken = 0;
let firstRender = true;
let cleanupReveal = null;

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, "");
  const [pathPart, queryPart] = raw.split("?");
  const segments = pathPart
    .split("/")
    .filter(Boolean)
    .map((segment) => {
      try {
        return decodeURIComponent(segment);
      } catch {
        return segment;
      }
    });
  return {
    name: segments[0] ?? "inicio",
    segments,
    params: { id: segments[1] ?? null },
    query: new URLSearchParams(queryPart ?? ""),
  };
}

function pickView(ctx) {
  switch (ctx.name) {
    case "inicio":
      return () => inicioView();
    case "aprender":
      return ctx.params.id ? () => moduloView(ctx) : () => aprenderView();
    case "glossario":
      return () => glossarioView(ctx);
    case "tipos":
      return () => tiposView(ctx);
    case "catalogo":
      return () => catalogoView(ctx);
    case "encontrar":
      return () => encontrarView(ctx);
    case "cursos":
      return () => cursosView(ctx);
    case "ia":
      return () => iaView(ctx);
    case "sobre":
      return () => sobreView(ctx);
    default:
      return null;
  }
}

function showLoading() {
  app.replaceChildren(
    h(
      "div",
      { class: "view" },
      h(
        "div",
        { class: "loading-block", role: "status", "aria-busy": "true", "aria-label": "Carregando" },
        h("div", { class: "skeleton skeleton--title" }),
        h("div", { class: "skeleton" }),
        h("div", { class: "skeleton skeleton--short" }),
        h("div", { class: "skeleton" })
      )
    )
  );
}

function showError(error) {
  const offline = window.location.protocol === "file:";
  app.replaceChildren(
    h(
      "div",
      { class: "view" },
      h(
        "div",
        { class: "empty", role: "alert" },
        h("h3", {}, "Não foi possível carregar os dados."),
        h(
          "p",
          {},
          offline
            ? "Este site lê arquivos JSON por HTTP. Abrir o index.html direto do disco bloqueia a leitura. Use um servidor local na pasta do projeto."
            : error?.message ?? "Verifique a conexão e tente de novo."
        ),
        h(
          "button",
          { class: "btn btn--solid", type: "button", onclick: () => renderRoute() },
          "Tentar de novo",
          icon("refresh", 15)
        )
      )
    )
  );
}

function setActive(name) {
  for (const link of qsa("[data-route]")) {
    if (link.dataset.route === name) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}

function closeOverlays() {
  for (const dialog of qsa("body > dialog")) {
    try {
      dialog.close();
    } catch {
      /* já fechado */
    }
    dialog.remove();
  }
  document.body.classList.remove("is-locked");
  closeMenu();
}

async function renderRoute() {
  const token = ++navToken;
  const ctx = parseHash();
  const view = pickView(ctx);

  closeOverlays();
  setActive(ctx.name);
  showLoading();
  window.scrollTo(0, 0);

  let result = null;
  try {
    result = view ? await view() : null;
  } catch (error) {
    if (token !== navToken) return;
    showError(error);
    return;
  }

  if (token !== navToken) return;

  if (!result) {
    try {
      result = await naoEncontradoView();
    } catch {
      showError(null);
      return;
    }
  }

  if (cleanupReveal) cleanupReveal();
  app.replaceChildren(result.node);
  result.node.classList.add("view-enter");
  cleanupReveal = observeReveals(result.node);

  document.title = result.title ? `${result.title} · ${SITE}` : SITE;

  if (firstRender) {
    firstRender = false;
  } else {
    main.focus({ preventScroll: true });
  }
}

/* ---------- menu ---------- */

function openMenu() {
  if (!menu) return;
  menu.hidden = false;
  document.body.classList.add("is-locked");
  for (const button of menuOpenButtons) button.setAttribute("aria-expanded", "true");
  menuClose?.focus();
}

function closeMenu() {
  if (!menu || menu.hidden) return;
  menu.hidden = true;
  document.body.classList.remove("is-locked");
  for (const button of menuOpenButtons) button.setAttribute("aria-expanded", "false");
}

function trapMenuFocus(event) {
  if (event.key !== "Tab" || menu.hidden) return;
  const focusable = qsa(
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    menu
  ).filter((element) => element.offsetParent !== null);
  if (!focusable.length) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* ---------- tema ---------- */

function syncThemeButton() {
  if (!themeButton) return;
  const dark = document.documentElement.dataset.theme === "dark";
  themeButton.setAttribute(
    "aria-label",
    dark ? "Mudar para o tema claro" : "Mudar para o tema escuro"
  );
  themeButton.setAttribute("title", dark ? "Tema claro" : "Tema escuro");
}

/* ---------- início ---------- */

function boot() {
  if (!app) return;

  if (!document.documentElement.dataset.theme) {
    applyTheme(getTheme());
  }
  syncThemeButton();

  themeButton?.addEventListener("click", () => {
    toggleTheme();
    syncThemeButton();
  });

  window.addEventListener("c4a:theme", syncThemeButton);

  for (const button of menuOpenButtons) {
    button.addEventListener("click", openMenu);
  }
  menuClose?.addEventListener("click", closeMenu);
  menu?.addEventListener("keydown", trapMenuFocus);
  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu && !menu.hidden) {
      closeMenu();
      menuOpenButtons[0]?.focus();
    }
  });

  const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 6);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const year = qs("#ano");
  if (year) year.textContent = String(new Date().getFullYear());

  const canvas = qs("#field");
  if (canvas) startField(canvas);

  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
