// Cartão de serviço e ficha de detalhes.

import { h, icon } from "../core/dom.js";
import {
  priceLabel,
  gratuityClass,
  gratuityLabel,
  complexityLabel,
  areaName,
} from "../core/format.js";
import { openDialog } from "./dialog.js";

export function serviceCard(service, options = {}) {
  const { catalog, selected = false, onCompare } = options;

  const compareButton = h(
    "button",
    {
      class: "icon-btn-sm",
      type: "button",
      "aria-pressed": selected ? "true" : "false",
      "aria-label": selected ? `Remover ${service.nome} da comparação` : `Comparar ${service.nome}`,
      title: "Comparar",
      onclick: () => onCompare?.(service),
    },
    icon("compare", 15)
  );

  const docLink = h(
    "a",
    {
      class: "icon-btn-sm",
      href: service.doc,
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": `Documentação de ${service.nome} (abre em nova aba)`,
      title: "Documentação oficial",
    },
    icon("external", 15)
  );

  const areas = service.areas.map((area) =>
    h("span", { class: "service-area" }, areaName(catalog, area))
  );

  return h(
    "article",
    { class: `service-card${selected ? " is-selected" : ""}` },
    h(
      "div",
      { class: "service-top" },
      h("span", { class: "service-provider" }, service.provedor),
      h("span", { class: gratuityClass(service), title: gratuityLabel(service) }, shortGratuity(service))
    ),
    h("h3", { class: "service-name" }, service.nome),
    h(
      "div",
      { class: "service-body" },
      h("p", { class: "service-desc" }, service.frase),
      h("div", { class: "service-areas" }, ...areas)
    ),
    h(
      "div",
      { class: "service-foot" },
      h(
        "p",
        { class: "service-price" },
        priceLabel(service),
        h("small", {}, `por mês em uso pequeno · complexidade ${service.complexidade}/5`)
      ),
      h("div", { class: "service-actions" }, compareButton, docLink)
    )
  );
}

function shortGratuity(service) {
  if (service.gratis === "sempre") return "grátis";
  if (service.gratis === "temporario") return "grátis no começo";
  return "pago";
}

export function openServiceDialog(service, catalog) {
  const rows = [
    ["Provedor", service.provedor],
    ["Preço aproximado", `${priceLabel(service)} por mês em uso pequeno`],
    ["Gratuidade", `${gratuityLabel(service)}. ${service.gratuidade}`],
    ["Complexidade", `${service.complexidade}/5, ${complexityLabel(service.complexidade)}`],
    ["Áreas", service.areas.map((area) => areaName(catalog, area)).join(", ")],
  ];

  const body = h(
    "div",
    { class: "od-stack", style: { "--od-gap": "20px" } },
    h("p", { class: "lede" }, service.frase),
    h(
      "dl",
      { class: "service-facts" },
      ...rows.map(([term, value]) =>
        h("div", {}, h("dt", {}, term), h("dd", {}, value))
      )
    ),
    h(
      "p",
      { class: "note" },
      h("strong", {}, "Confirme antes de pagar. "),
      "O catálogo é um retrato com data. A página oficial do provedor é a fonte do preço e dos limites do plano."
    )
  );

  const actions = [
    h(
      "a",
      {
        class: "btn btn--quiet",
        href: service.preco,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      "Ver preço oficial",
      icon("arrowUpRight", 15)
    ),
    h(
      "a",
      {
        class: "btn btn--solid",
        href: service.doc,
        target: "_blank",
        rel: "noopener noreferrer",
      },
      "Abrir documentação",
      icon("external", 15)
    ),
  ];

  return openDialog({
    title: `${service.provedor} ${service.nome}`,
    subtitle: "Ficha do catálogo aberto",
    body,
    actions,
  });
}
