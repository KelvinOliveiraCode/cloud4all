import { h, icon } from "../core/dom.js";
import { getCatalog, findService, catalogIndex } from "../core/data.js";
import { buildPrompt } from "../engine/prompt.js";
import { BUDGETS, LEVELS } from "../engine/recommend.js";
import { takeSeed } from "../core/store.js";
import { viewHead, sectionHead } from "../ui/parts.js";
import { art } from "../art.js";

export default async function iaView() {
  const catalog = await getCatalog();
  const index = catalogIndex(catalog);
  const seed = takeSeed();

  let activeService = seed?.serviceId ? findService(catalog, seed.serviceId) : null;

  const areaSelect = h(
    "select",
    { class: "select", id: "ia-area" },
    ...Object.entries(catalog.areas).map(([id, label]) =>
      h("option", { value: id }, label)
    )
  );

  const budgetSelect = h(
    "select",
    { class: "select", id: "ia-orcamento" },
    ...BUDGETS.map((budget) => h("option", { value: budget.id }, budget.full))
  );

  const levelSelect = h(
    "select",
    { class: "select", id: "ia-nivel" },
    ...LEVELS.map((level) => h("option", { value: level.id }, level.label))
  );

  const providerSelect = h(
    "select",
    { class: "select", id: "ia-provedor" },
    h("option", { value: "" }, "Tanto faz"),
    ...index.providers.map(([name, count]) =>
      h("option", { value: name }, `${name} (${count} serviços)`)
    )
  );

  const detailInput = h("textarea", {
    class: "textarea",
    id: "ia-detalhe",
    rows: "4",
    placeholder: "Opcional: prazo, tamanho do time, se já usa alguma ferramenta, o que não pode acontecer.",
  });

  areaSelect.value = catalog.areas[seed?.area] ? seed.area : "qualquer";
  budgetSelect.value = resolveBudget(seed?.budget).id;
  levelSelect.value = resolveLevel(seed?.level).id;
  providerSelect.value = index.providers.some(([name]) => name === seed?.provider)
    ? seed.provider
    : "";

  const promptPre = h("pre", { class: "prompt-text", tabindex: "0" });
  const wordCount = h("span", {});
  const copyState = h("p", { class: "copy-state", role: "status", "aria-live": "polite" });
  const serviceSlot = h("div", {});

  function renderService() {
    serviceSlot.replaceChildren();
    if (!activeService) return;
    serviceSlot.append(
      h(
        "div",
        { class: "note" },
        h("strong", {}, "Serviço incluído no prompt: "),
        `${activeService.provedor} ${activeService.nome}.`,
        h(
          "button",
          {
            class: "text-link",
            type: "button",
            style: { "min-height": "28px", "font-size": "0.72rem", "margin-top": "8px" },
            onclick: () => {
              activeService = null;
              renderService();
              renderPrompt();
            },
          },
          "Remover serviço"
        )
      )
    );
  }

  function currentPrompt() {
    const budget = BUDGETS.find((item) => item.id === budgetSelect.value) ?? BUDGETS[1];
    const level = LEVELS.find((item) => item.id === levelSelect.value) ?? LEVELS[1];
    let text = buildPrompt({
      area: areaSelect.value,
      budgetLabel: budget.full,
      levelLabel: level.label,
      provider: providerSelect.value || "",
      service: activeService,
      catalog,
    });
    const detail = detailInput.value.trim();
    if (detail) {
      text += `\n\nDetalhe adicional que eu quero considerar: ${detail}`;
    }
    return text;
  }

  function renderPrompt() {
    const text = currentPrompt();
    promptPre.textContent = text;
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    wordCount.textContent = `${words} palavras`;
    copyState.textContent = "";
  }

  for (const control of [areaSelect, budgetSelect, levelSelect, providerSelect, detailInput]) {
    control.addEventListener("input", renderPrompt);
    control.addEventListener("change", renderPrompt);
  }

  const copyButton = h(
    "button",
    { class: "btn btn--solid", type: "button", onclick: copyPrompt },
    "Copiar prompt",
    icon("copy", 15)
  );

  async function copyPrompt() {
    const text = promptPre.textContent;
    try {
      await navigator.clipboard.writeText(text);
      copyState.textContent = "Prompt copiado. Cole na IA que você já usa.";
    } catch {
      const helper = h("textarea", { class: "visually-hidden" });
      helper.value = text;
      document.body.append(helper);
      helper.select();
      try {
        document.execCommand("copy");
        copyState.textContent = "Prompt copiado. Cole na IA que você já usa.";
      } catch {
        copyState.textContent = "Não foi possível copiar. Selecione o texto e use Ctrl + C.";
      }
      helper.remove();
    }
  }

  const form = h(
    "form",
    { class: "builder-form", onsubmit: (event) => event.preventDefault() },
    h(
      "div",
      { class: "field" },
      h("label", { for: "ia-area" }, "O que você quer fazer"),
      areaSelect
    ),
    h(
      "div",
      { class: "field" },
      h("label", { for: "ia-orcamento" }, "Orçamento mensal"),
      budgetSelect
    ),
    h(
      "div",
      { class: "field" },
      h("label", { for: "ia-nivel" }, "Quanto aceita configurar"),
      levelSelect
    ),
    h(
      "div",
      { class: "field" },
      h("label", { for: "ia-provedor" }, "Preferência de provedor"),
      providerSelect
    ),
    h(
      "div",
      { class: "field" },
      h("label", { for: "ia-detalhe" }, "Contexto extra (opcional)"),
      detailInput
    ),
    serviceSlot
  );

  const node = h(
    "div",
    { class: "view" },
    viewHead({
      folio: "08 / Minha IA",
      title: h("span", {}, "Um prompt melhor, ", h("em", {}, "sem cadastro"), "."),
      lede: "Monte a pergunta certa e leve para a IA que você já usa. O texto sai daqui com preço, gratuidade e complexidade do catálogo, e com a instrução de não inventar número.",
      art: art("prompt"),
    }),

    h(
      "div",
      { class: "builder" },
      form,
      h(
        "div",
        { class: "builder-output" },
        h(
          "div",
          { class: "prompt-box" },
          h(
            "div",
            { class: "prompt-box-head" },
            h("span", {}, "Prompt pronto"),
            wordCount
          ),
          promptPre
        ),
        h(
          "div",
          { class: "prompt-actions" },
          copyButton,
          h(
            "button",
            {
              class: "btn btn--quiet",
              type: "button",
              onclick: () => {
                detailInput.value = "";
                activeService = null;
                areaSelect.value = "qualquer";
                budgetSelect.value = "baixo";
                levelSelect.value = "equilibrado";
                providerSelect.value = "";
                renderService();
                renderPrompt();
              },
            },
            "Limpar",
            icon("refresh", 15)
          ),
          h("a", { class: "btn btn--quiet", href: "#/encontrar" }, "Usar o recomendador")
        ),
        copyState,
        h(
          "p",
          { class: "course-note" },
          icon("shield", 14),
          "Nada é enviado para servidor. O prompt é montado no seu navegador e só sai daqui quando você copia."
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Como usar",
        title: "Três passos, nenhuma conta.",
        text: "O prompt não substitui a conferência no site oficial. Ele organiza a pergunta para você não receber uma resposta genérica.",
      }),
      h(
        "div",
        { class: "how-list", "data-reveal": "" },
        how(
          "01",
          "Ajuste o contexto",
          "Área, orçamento e nível mudam a recomendação. Quanto mais específico o problema, melhor a resposta."
        ),
        how(
          "02",
          "Copie e cole",
          "Leve o texto para a IA que você já usa. Ele pede cinco passos e uma comparação simples."
        ),
        how(
          "03",
          "Confira o preço",
          "Nenhum modelo sabe a fatura do mês. O valor final está na página oficial do provedor."
        )
      )
    )
  );

  renderService();
  renderPrompt();

  return { node, title: "Montar um prompt de nuvem" };
}

function resolveBudget(value) {
  if (!value) return BUDGETS[1];
  return (
    BUDGETS.find((item) => item.id === value) ??
    BUDGETS.find((item) => item.full === value) ??
    BUDGETS[1]
  );
}

function resolveLevel(value) {
  if (!value) return LEVELS[1];
  return (
    LEVELS.find((item) => item.id === value) ??
    LEVELS.find((item) => item.label === value) ??
    LEVELS.find((item) => item.short === value) ??
    LEVELS[1]
  );
}

function how(num, title, text) {
  return h(
    "div",
    { class: "how" },
    h("span", {}, num),
    h("h3", {}, title),
    h("p", {}, text)
  );
}
