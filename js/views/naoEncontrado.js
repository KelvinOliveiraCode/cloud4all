import { h, icon } from "../core/dom.js";
import { art } from "../art.js";

export default async function naoEncontradoView() {
  const node = h(
    "div",
    { class: "view" },
    h(
      "div",
      { class: "notfound" },
      h("div", { class: "notfound-art", html: art("broken") }),
      h("p", { class: "folio" }, "Erro 404"),
      h("h1", { class: "display" }, "Essa página não existe."),
      h(
        "p",
        {},
        "O endereço pode ter mudado ou o link veio incompleto. Nada foi perdido: seus módulos e sua comparação continuam salvos neste navegador."
      ),
      h(
        "div",
        { class: "btn-row", style: { "justify-content": "center" } },
        h("a", { class: "btn btn--solid", href: "#/inicio" }, "Voltar ao início", icon("arrow", 15)),
        h("a", { class: "btn btn--quiet", href: "#/catalogo" }, "Abrir o catálogo")
      )
    )
  );

  return { node, title: "Página não encontrada" };
}
