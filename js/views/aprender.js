import { h, icon, clear } from "../core/dom.js";
import { getModules } from "../core/data.js";
import { getProgress, isDone, toggleDone } from "../core/store.js";
import { viewHead, sectionHead } from "../ui/parts.js";
import { art } from "../art.js";

export async function aprenderView() {
  const data = await getModules();
  const modules = data.itens;
  const progress = getProgress();
  const done = modules.filter((module) => progress.includes(module.id)).length;
  const percent = modules.length ? Math.round((done / modules.length) * 100) : 0;

  const progressBar = h("span", {});
  progressBar.style.width = `${percent}%`;

  const progressText = h(
    "strong",
    {},
    `${done} de ${modules.length}`
  );

  const node = h(
    "div",
    { class: "view" },
    viewHead({
      folio: "Aprender",
      title: h("span", {}, "Seis módulos para ", h("em", {}, "parar de adivinhar"), "."),
      lede: "Cada módulo tem uma leitura curta, cartões independentes e três perguntas. O progresso fica salvo neste navegador.",
      art: art("layers"),
    }),

    h(
      "div",
      { class: "learn-top" },
      h(
        "div",
        {},
        h(
          "p",
          { class: "prose" },
          "A ordem sugerida começa no vocabulário e termina no primeiro passo prático. Você pode pular direto para o assunto que trava a sua decisão."
        ),
        h(
          "p",
          { class: "prose", style: { "margin-top": "12px" } },
          "Não há vídeo, login ou cobrança. O texto foi escrito para ser lido no celular, em pé, entre uma aula e outra."
        )
      ),
      h(
        "div",
        { class: "progress-panel" },
        h(
          "div",
          { class: "progress-label" },
          h("span", {}, "Seu progresso"),
          progressText
        ),
        h("div", { class: "progress", role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100", "aria-valuenow": String(percent), "aria-label": "Módulos concluídos" }, progressBar),
        h("p", {}, percent === 0 ? "Nenhum módulo concluído ainda. Comece pelo primeiro." : `${percent}% do caminho. O progresso fica salvo neste navegador.`)
      )
    ),

    h(
      "div",
      { class: "module-list", "data-reveal": "" },
      ...modules.map((module) =>
        h(
          "a",
          {
            class: `module-row${progress.includes(module.id) ? " is-done" : ""}`,
            href: `#/aprender/${module.id}`,
          },
          h("span", { class: "row-n" }, String(module.numero).padStart(2, "0")),
          h(
            "div",
            {},
            h("h3", {}, module.titulo),
            h("p", {}, module.chamada)
          ),
          h(
            "div",
            { class: "row-meta" },
            h("span", {}, `${module.cartoes.length} cartões`),
            h("span", {}, `${module.quiz.length} perguntas`),
            h("span", {}, progress.includes(module.id) ? "concluído" : "não iniciado")
          ),
          h("span", { class: "row-state", "aria-hidden": "true" }, icon("check", 14))
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Mitos",
        title: "Três frases que custam caro.",
        text: "Nenhuma delas é mentira absoluta, mas todas escondem uma parte da conta.",
      }),
      h(
        "div",
        { class: "myth-grid", "data-reveal": "" },
        myth(
          "Mito 01",
          "Nuvem é sempre mais barata.",
          "Não. Uma máquina ligada sem uso custa igual. A economia vem de desligar, redimensionar e medir, não do lugar onde o servidor está."
        ),
        myth(
          "Mito 02",
          "Grátis para sempre quer dizer sem limite.",
          "Não. Todo tier gratuito tem faixa de uso. Passar da faixa, ou continuar depois do prazo, gera cobrança normal."
        ),
        myth(
          "Mito 03",
          "Migrar para a nuvem resolve segurança.",
          "Não. Muda quem cuida do quê. A estrutura física fica com o provedor; contas, permissões, código e dados continuam seus."
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
          h("h2", { class: "display", style: { "font-size": "var(--step-2)" } }, "Terminou os seis?"),
          h(
            "p",
            { class: "prose", style: { "margin-top": "8px" } },
            "O próximo passo é aplicar em um caso real. O recomendador usa as mesmas regras que os módulos explicam."
          )
        ),
        h("a", { class: "btn btn--solid", href: "#/encontrar" }, "Ir para o recomendador", icon("arrow", 16))
      )
    )
  );

  return { node, title: "Aprender nuvem em seis módulos" };
}

function myth(tag, title, text) {
  return h(
    "div",
    { class: "myth" },
    h("p", { class: "myth-tag" }, tag),
    h("h3", {}, title),
    h("p", {}, text)
  );
}

export async function moduloView(ctx) {
  const data = await getModules();
  const modules = data.itens;
  const module = modules.find((item) => item.id === ctx.params.id);
  if (!module) return null;

  const position = modules.findIndex((item) => item.id === module.id);
  const previous = modules[position - 1];
  const next = modules[position + 1];

  const doneButton = h(
    "button",
    {
      class: "btn btn--quiet",
      type: "button",
      onclick: () => {
        toggleDone(module.id);
        updateDone();
      },
    },
    isDone(module.id) ? "Módulo concluído" : "Marcar como concluído",
    icon("check", 15)
  );

  function updateDone() {
    const done = isDone(module.id);
    doneButton.textContent = "";
    doneButton.append(done ? "Módulo concluído" : "Marcar como concluído");
    doneButton.append(icon("check", 15));
    doneButton.classList.toggle("btn--solid", done);
    doneButton.classList.toggle("btn--quiet", !done);
  }

  updateDone();

  const quizState = {
    index: 0,
    selected: null,
    checked: false,
    score: 0,
    finished: false,
  };

  const quizBody = h("div", {});
  const quizBox = h(
    "section",
    { class: "quiz", "aria-labelledby": "quiz-title" },
    h(
      "div",
      { class: "quiz-head" },
      h("h2", { id: "quiz-title" }, "Três perguntas"),
      h("span", { class: "quiz-score" }, "sem nota, sem cadastro")
    ),
    quizBody
  );

  function renderQuiz() {
    clear(quizBody);
    if (quizState.finished) {
      const total = module.quiz.length;
      quizBody.append(
        h(
          "div",
          { class: "quiz-feedback" },
          h("p", {}, h("strong", {}, `${quizState.score} de ${total} corretas. `), quizState.score === total ? "Você pegou o essencial." : "Vale reler os cartões antes de seguir."),
          h(
            "div",
            { class: "quiz-actions" },
            h(
              "button",
              {
                class: "btn btn--quiet",
                type: "button",
                onclick: () => {
                  quizState.index = 0;
                  quizState.selected = null;
                  quizState.checked = false;
                  quizState.score = 0;
                  quizState.finished = false;
                  renderQuiz();
                },
              },
              "Refazer",
              icon("refresh", 15)
            ),
            h("a", { class: "btn btn--solid", href: "#/aprender" }, "Voltar aos módulos", icon("arrow", 15))
          )
        )
      );
      return;
    }

    const question = module.quiz[quizState.index];
    const total = module.quiz.length;

    quizBody.append(
      h("p", { class: "folio" }, `Pergunta ${quizState.index + 1} de ${total}`),
      h("p", { class: "quiz-question" }, question.q),
      h(
        "div",
        { class: "quiz-options", role: "group", "aria-label": "Alternativas" },
        ...question.opcoes.map((option, optionIndex) => {
          const isSelected = quizState.selected === optionIndex;
          const isCorrect = optionIndex === question.correta;
          const classes = ["quiz-option"];
          if (isSelected) classes.push("is-selected");
          if (quizState.checked && isCorrect) classes.push("is-correct");
          if (quizState.checked && isSelected && !isCorrect) classes.push("is-wrong");
          return h(
            "button",
            {
              class: classes.join(" "),
              type: "button",
              "aria-pressed": isSelected ? "true" : "false",
              onclick: () => {
                if (quizState.checked) return;
                quizState.selected = optionIndex;
                renderQuiz();
              },
            },
            h("span", { class: "opt-mark" }, String.fromCharCode(65 + optionIndex)),
            h("span", {}, option)
          );
        })
      )
    );

    if (quizState.checked) {
      const correct = quizState.selected === question.correta;
      quizBody.append(
        h(
          "div",
          { class: "quiz-feedback", role: "status" },
          h("p", {}, h("strong", {}, correct ? "Certo. " : "Ainda não. "), question.explica),
          h(
            "div",
            { class: "quiz-actions" },
            h(
              "button",
              {
                class: "btn btn--solid",
                type: "button",
                onclick: () => {
                  if (quizState.index + 1 >= total) {
                    quizState.finished = true;
                  } else {
                    quizState.index += 1;
                    quizState.selected = null;
                    quizState.checked = false;
                  }
                  renderQuiz();
                },
              },
              quizState.index + 1 >= total ? "Ver resultado" : "Próxima pergunta",
              icon("arrow", 15)
            )
          )
        )
      );
    } else {
      quizBody.append(
        h(
          "div",
          { class: "quiz-actions", style: { "margin-top": "20px" } },
          h(
            "button",
            {
              class: "btn btn--solid",
              type: "button",
              disabled: quizState.selected === null,
              onclick: () => {
                if (quizState.selected === null) return;
                quizState.checked = true;
                if (quizState.selected === question.correta) quizState.score += 1;
                renderQuiz();
              },
            },
            "Conferir resposta",
            icon("check", 15)
          ),
          h("span", { class: "quiz-score" }, "Escolha uma alternativa para continuar.")
        )
      );
    }
  }

  renderQuiz();

  const node = h(
    "div",
    { class: "view" },
    h(
      "header",
      { class: "module-head" },
      h(
        "div",
        {},
        h("p", { class: "folio" }, `Aprender / ${module.titulo}`),
        h("h1", { class: "display" }, module.titulo),
        h("p", { class: "lede" }, module.chamada)
      ),
      h(
        "aside",
        { class: "module-aside" },
        h("p", { class: "folio" }, `${module.cartoes.length} cartões · ${module.quiz.length} perguntas`),
        h("p", {}, "Leia os cartões na ordem que quiser. O quiz serve para checar o essencial, não para dar nota."),
        doneButton
      )
    ),

    h(
      "div",
      { class: "lesson-list", "data-reveal": "" },
      ...module.cartoes.map((card, position) =>
        h(
          "article",
          { class: "lesson" },
          h("span", { class: "lesson-n" }, String(position + 1).padStart(2, "0")),
          h("div", {}, h("h3", {}, card.t), h("p", {}, card.d))
        )
      )
    ),

    quizBox,

    h(
      "nav",
      { class: "module-nav", "aria-label": "Navegação entre módulos" },
      previous
        ? h(
            "a",
            { href: `#/aprender/${previous.id}` },
            h("span", {}, "Módulo anterior"),
            h("strong", {}, `${String(previous.numero).padStart(2, "0")} · ${previous.titulo}`)
          )
        : h("span", {}),
      next
        ? h(
            "a",
            { href: `#/aprender/${next.id}` },
            h("span", {}, "Próximo módulo"),
            h("strong", {}, `${String(next.numero).padStart(2, "0")} · ${next.titulo}`)
          )
        : h(
            "a",
            { href: "#/encontrar" },
            h("span", {}, "Fim do caminho"),
            h("strong", {}, "Aplicar no recomendador")
          )
    ),

    h("div", { class: "module-aside", style: { "margin-top": "40px" } },
      h("p", { class: "folio" }, "Atalho"),
      h("p", {}, "Quer ver os termos deste módulo em uma lista só? O glossário tem busca sem acento e filtro por categoria."),
      h("a", { class: "text-link", href: "#/glossario" }, "Abrir glossário", icon("arrow", 15))
    )
  );

  return { node, title: `${module.titulo}, módulo ${module.numero}` };
}
