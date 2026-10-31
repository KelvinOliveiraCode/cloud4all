import { h, icon } from "../core/dom.js";
import { getCatalog, catalogIndex } from "../core/data.js";
import { areaChoices, recommend, BUDGETS, LEVELS } from "../engine/recommend.js";
import { priceLabel, gratuityLabel, complexityLabel, areaName } from "../core/format.js";
import { seedPrompt } from "../core/store.js";
import { viewHead } from "../ui/parts.js";
import { art } from "../art.js";

export default async function encontrarView() {
  const catalog = await getCatalog();
  const index = catalogIndex(catalog);
  const areas = areaChoices(catalog);

  const state = {
    step: 0,
    area: null,
    budget: null,
    level: null,
    provider: null,
    result: null,
  };

  const stepsRoot = h("div", { class: "finder-steps", "aria-label": "Etapas da recomendação" });
  const panelRoot = h("div", { class: "finder-panel" });
  const finder = h("div", { class: "finder" }, stepsRoot, panelRoot);

  function renderSteps() {
    stepsRoot.replaceChildren(
      ...["Área", "Orçamento", "Nível", "Provedor"].map((label, position) => {
        const classes = ["finder-step"];
        if (state.result || position < state.step) classes.push("is-done");
        if (!state.result && position === state.step) classes.push("is-active");
        return h(
          "div",
          { class: classes.join(" ") },
          h("span", {}, String(position + 1).padStart(2, "0")),
          h("b", {}, label)
        );
      })
    );
  }

  function renderPanel() {
    panelRoot.replaceChildren();
    if (state.result) {
      renderResult();
      return;
    }

    if (state.step === 0) {
      panelRoot.append(
        h("h2", {}, "O que você quer fazer?"),
        h("p", {}, "A área elimina metade das opções erradas antes de você olhar preço."),
        choiceGrid(
          areas.map((area) => ({
            id: area.id,
            title: area.label,
            hint: area.hint,
          })),
          state.area,
          (id) => {
            state.area = id;
            renderPanel();
          }
        ),
        actions()
      );
      return;
    }

    if (state.step === 1) {
      panelRoot.append(
        h("h2", {}, "Quanto pode gastar por mês?"),
        h("p", {}, "O valor é um teto, não uma meta. Serviço grátis para sempre entra mesmo com orçamento zero."),
        choiceGrid(
          BUDGETS.map((budget) => ({
            id: budget.id,
            title: budget.label,
            hint: budget.hint,
          })),
          state.budget,
          (id) => {
            state.budget = id;
            renderPanel();
          }
        ),
        actions()
      );
      return;
    }

    if (state.step === 2) {
      panelRoot.append(
        h("h2", {}, "Quanto você aceita configurar?"),
        h("p", {}, "Não existe resposta certa. Existe o tempo que você tem nesta semana."),
        choiceGrid(
          LEVELS.map((level) => ({
            id: level.id,
            title: level.label,
            hint: level.hint,
          })),
          state.level,
          (id) => {
            state.level = id;
            renderPanel();
          }
        ),
        actions()
      );
      return;
    }

    panelRoot.append(
      h("h2", {}, "Tem preferência de provedor?"),
      h("p", {}, "Se não tiver, tudo bem. A recomendação usa o catálogo inteiro e mostra a trilha."),
      choiceGrid(
        [
          { id: "__any", title: "Tanto faz", hint: "Comparar todos os provedores" },
          ...index.providers.map(([name, count]) => ({
            id: name,
            title: name,
            hint: `${count} serviços no catálogo`,
          })),
        ],
        state.provider ?? "__any",
        (id) => {
          state.provider = id === "__any" ? null : id;
          renderPanel();
        }
      ),
      actions()
    );
  }

  function choiceGrid(options, selected, onPick) {
    return h(
      "div",
      { class: "choice-grid", role: "group" },
      ...options.map((option) =>
        h(
          "button",
          {
            class: "choice",
            type: "button",
            "aria-pressed": selected === option.id ? "true" : "false",
            onclick: () => onPick(option.id),
          },
          h("strong", {}, option.title),
          h("span", {}, option.hint)
        )
      )
    );
  }

  function actions() {
    const ready =
      (state.step === 0 && state.area) ||
      (state.step === 1 && state.budget) ||
      (state.step === 2 && state.level) ||
      state.step === 3;

    return h(
      "div",
      { class: "finder-actions" },
      state.step > 0
        ? h(
            "button",
            {
              class: "btn btn--quiet",
              type: "button",
              onclick: () => {
                state.step -= 1;
                renderSteps();
                renderPanel();
              },
            },
            icon("chevronLeft", 15),
            "Voltar"
          )
        : h("span", {}),
      h(
        "div",
        { class: "btn-row" },
        h(
          "button",
          {
            class: "btn btn--solid",
            type: "button",
            disabled: !ready,
            onclick: () => {
              if (state.step < 3) {
                state.step += 1;
                renderSteps();
                renderPanel();
              } else {
                finish();
              }
            },
          },
          state.step === 3 ? "Ver recomendação" : "Continuar",
          icon("arrow", 15)
        )
      )
    );
  }

  function finish() {
    state.result = recommend(catalog, {
      area: state.area,
      budget: state.budget,
      level: state.level,
      provider: state.provider,
    });
    renderSteps();
    renderPanel();
  }

  function renderResult() {
    const result = state.result;
    const { top } = result;

    if (!top) {
      panelRoot.append(
        h("h2", {}, "Nada sobrou com esses filtros."),
        h(
          "p",
          {},
          "A combinação de área, orçamento, nível e provedor não devolveu nenhum serviço. Isso pode acontecer, e é melhor dizer do que forçar uma opção."
        ),
        result.suggestion
          ? h(
              "div",
              { class: "note" },
              h("strong", {}, "Uma saída honesta: "),
              `subir o orçamento para ${result.suggestion.budget.label} abre ${result.suggestion.count} ${result.suggestion.count === 1 ? "serviço" : "serviços"} nesta mesma área.`
            )
          : null,
        h(
          "div",
          { class: "btn-row", style: { "margin-top": "24px" } },
          result.suggestion
            ? h(
                "button",
                {
                  class: "btn btn--solid",
                  type: "button",
                  onclick: () => {
                    state.budget = result.suggestion.budget.id;
                    state.result = null;
                    finish();
                  },
                },
                `Tentar ${result.suggestion.budget.label}`,
                icon("arrow", 15)
              )
            : null,
          h(
            "button",
            {
              class: "btn btn--quiet",
              type: "button",
              onclick: reset,
            },
            "Recomeçar",
            icon("refresh", 15)
          ),
          h("a", { class: "btn btn--quiet", href: "#/catalogo" }, "Abrir catálogo")
        )
      );
      return;
    }

    const budgetInfo = BUDGETS.find((item) => item.id === state.budget);
    const levelInfo = LEVELS.find((item) => item.id === state.level);

    panelRoot.append(
      h(
        "div",
        { class: "result-top" },
        h(
          "div",
          { class: "result-pick" },
          h("p", { class: "pick-label" }, "Ponto de partida"),
          h("p", { class: "pick-provider" }, top.provedor),
          h("h2", {}, top.nome),
          h("p", {}, top.frase),
          h(
            "dl",
            { class: "result-price" },
            h("div", {}, h("dt", {}, "Preço mensal"), h("dd", {}, priceLabel(top))),
            h("div", {}, h("dt", {}, "Gratuidade"), h("dd", {}, gratuityLabel(top))),
            h("div", {}, h("dt", {}, "Complexidade"), h("dd", {}, `${top.complexidade}/5 · ${complexityLabel(top.complexidade)}`)),
            h("div", {}, h("dt", {}, "Áreas"), h("dd", {}, top.areas.map((area) => areaName(catalog, area)).join(", ")))
          ),
          h(
            "div",
            { class: "btn-row", style: { "margin-top": "8px" } },
            h(
              "button",
              {
                class: "btn btn--solid",
                type: "button",
                onclick: () => {
                  seedPrompt({
                    area: state.area,
                    budget: budgetInfo?.full ?? "",
                    level: levelInfo?.label ?? "",
                    provider: state.provider ?? "",
                    serviceId: top.id,
                  });
                  window.location.hash = "#/ia";
                },
              },
              "Montar prompt com este serviço",
              icon("spark", 15)
            ),
            h("a", { class: "btn btn--quiet", href: `#/catalogo?q=${encodeURIComponent(top.nome)}` }, "Ver no catálogo")
          )
        ),
        h(
          "div",
          { class: "result-side" },
          h(
            "div",
            { class: "audit" },
            h("h3", {}, "Como chegamos aqui"),
            h(
              "ol",
              {},
              ...result.audit.map((entry, position) =>
                h(
                  "li",
                  {},
                  h("span", {}, String(position + 1).padStart(2, "0")),
                  h("span", {}, `${entry.label}`),
                  h("b", {}, String(entry.count))
                )
              )
            )
          ),
          h(
            "p",
            { class: "course-note" },
            icon("info", 14),
            "A trilha é cumulativa. Cada linha mostra quantos serviços sobraram depois do filtro."
          )
        )
      ),

      result.alternatives.length
        ? h(
            "section",
            { class: "alternatives" },
            h("h3", {}, "Outras saídas para o mesmo problema"),
            h(
              "div",
              { class: "alt-grid" },
              ...result.alternatives.map((service) =>
                h(
                  "article",
                  { class: "alt" },
                  h("span", {}, service.provedor),
                  h("strong", {}, service.nome),
                  h("span", {}, `${priceLabel(service)} · complexidade ${service.complexidade}/5`),
                  h("span", {}, service.frase)
                )
              )
            )
          )
        : null,

      h(
        "div",
        { class: "btn-row", style: { "margin-top": "32px" } },
        h(
          "button",
          { class: "btn btn--quiet", type: "button", onclick: reset },
          "Recomeçar",
          icon("refresh", 15)
        ),
        h("a", { class: "btn btn--quiet", href: "#/catalogo" }, "Ver catálogo completo"),
        h("a", { class: "btn btn--quiet", href: "#/aprender" }, "Entender os termos")
      )
    );
  }

  function reset() {
    state.step = 0;
    state.area = null;
    state.budget = null;
    state.level = null;
    state.provider = null;
    state.result = null;
    renderSteps();
    renderPanel();
  }

  renderSteps();
  renderPanel();

  const node = h(
    "div",
    { class: "view" },
    viewHead({
      folio: "Encontrar",
      title: h("span", {}, "Quatro perguntas. ", h("em", {}, "Uma trilha aberta"), "."),
      lede: "A recomendação não é uma caixa-preta. Cada filtro mostra quantos serviços sobraram e por quê.",
      art: art("path"),
    }),
    finder
  );

  return { node, title: "Encontrar um serviço de nuvem" };
}
