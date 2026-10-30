// Peças editoriais reutilizadas pelas vistas.

import { h } from "../core/dom.js";

export function viewHead({ folio, title, lede, extra, art }) {
  const copy = h(
    "div",
    { class: "view-head-copy" },
    folio ? h("p", { class: "folio" }, folio) : null,
    h("h1", { class: "display" }, title),
    lede ? h("p", { class: "lede" }, lede) : null,
    extra ?? null
  );

  if (!art) {
    return h("header", { class: "view-head" }, copy);
  }

  return h(
    "header",
    { class: "view-head view-head--art" },
    copy,
    h("div", { class: "view-head-art", "aria-hidden": "true", html: art })
  );
}

export function sectionHead({ folio, title, text, aside }) {
  return h(
    "div",
    { class: "section-head" },
    h("div", {}, h("h2", {}, title), text ? h("p", {}, text) : null),
    h("div", {}, aside ?? (folio ? h("span", { class: "folio" }, folio) : null))
  );
}

export function emptyState({ title, text, action }) {
  return h(
    "div",
    { class: "empty", role: "status" },
    h("h3", {}, title),
    h("p", {}, text),
    action ?? null
  );
}

export function stat(value, label, note) {
  return h(
    "div",
    { class: "hero-stat" },
    h("dt", {}, label),
    h("dd", {}, value, note ? h("small", {}, note) : null)
  );
}

export function note(text, strong) {
  return h(
    "p",
    { class: "note" },
    strong ? h("strong", {}, strong) : null,
    text
  );
}
