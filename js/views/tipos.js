import { h, icon } from "../core/dom.js";
import { art } from "../art.js";
import { viewHead, sectionHead, note } from "../ui/parts.js";

export default async function tiposView() {
  const node = h(
    "div",
    { class: "view" },
    h(
      "div",
      { class: "page-grid" },
      h(
        "div",
        { class: "col-7" },
        viewHead({
          folio: "Tipos de nuvem",
          title: h("span", {}, "Não existe nuvem melhor. Existe ", h("em", {}, "decisão mais honesta"), "."),
          lede: "Pública, privada e híbrida não são níveis de qualidade. São arranjos diferentes de controle, custo e responsabilidade.",
        })
      ),
      h("div", { class: "col-5 hero-art", html: art("clouds") })
    ),

    h(
      "div",
      { class: "prose", "data-reveal": "" },
      h(
        "p",
        {},
        "A pergunta útil não é qual modelo é mais moderno. É quanto você precisa controlar, quanto pode gastar e quem vai cuidar da manutenção no próximo mês."
      ),
      h(
        "p",
        {},
        "Um projeto pequeno costuma começar na nuvem pública. Uma empresa com dados regulados pode manter parte em nuvem privada. Quase todo arranjo real vira híbrido em algum momento, mesmo sem esse nome."
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Modelo Pública",
        title: "Nuvem pública",
        text: "Capacidade compartilhada, contratada por uso e operada por um provedor externo.",
      }),
      h(
        "div",
        { class: "type-block", "data-reveal": "" },
        h(
          "div",
          { class: "type-copy" },
          h("p", {}, "Você entra com uma conta, escolhe a região e começa. A separação entre clientes é lógica: cada um vê apenas o próprio pedaço, mesmo dividindo o mesmo data center."),
          h(
            "p",
            {},
            "É o caminho mais rápido para publicar e o mais fácil de escalar. Também é o mais fácil de gastar sem perceber, porque cada recurso ligado tem preço."
          ),
          h(
            "dl",
            { class: "type-facts" },
            fact("Quem opera", "O provedor"),
            fact("Controle", "Médio, sobre o que você configura"),
            fact("Melhor para", "Site, API, teste, projeto novo"),
            fact("Risco principal", "Conta aberta e recurso esquecido")
          )
        ),
        h(
          "div",
          { class: "type-art" },
          h(
            "ol",
            { class: "type-list" },
            item("Comece pelo serviço mais guiado que resolve."),
            item("Defina teto de gasto no primeiro dia."),
            item("Escolha a região mais próxima de quem acessa."),
            item("Marque uma data para revisar o que ficou ligado.")
          )
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Modelo Privada",
        title: "Nuvem privada",
        text: "Infraestrutura dedicada a uma organização, no próprio prédio ou em um data center alugado.",
      }),
      h(
        "div",
        { class: "type-block", "data-reveal": "" },
        h(
          "div",
          { class: "type-copy" },
          h("p", {}, "Aqui o controle é maior e a conta inicial também. Alguém precisa cuidar de energia, hardware, atualização e plantão. Esse alguém pode ser o seu time ou um fornecedor."),
          h(
            "p",
            {},
            "Faz sentido quando a lei, o volume ou a latência exigem proximidade e controle. Não faz sentido só porque a palavra privada soa mais segura."
          ),
          h(
            "dl",
            { class: "type-facts" },
            fact("Quem opera", "Você ou um fornecedor dedicado"),
            fact("Controle", "Alto, do hardware ao sistema"),
            fact("Melhor para", "Dados regulados e carga previsível"),
            fact("Risco principal", "Custo fixo e equipe insuficiente")
          )
        ),
        h(
          "div",
          { class: "type-art" },
          h(
            "ol",
            { class: "type-list" },
            item("Some o custo de pessoas, energia e reposição."),
            item("Verifique se há plantão fora do horário."),
            item("Planeje a capacidade com folga real."),
            item("Teste a restauração antes de confiar.")
          )
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Modelo Híbrida",
        title: "Nuvem híbrida",
        text: "Parte dentro, parte fora, com integração entre os dois lados.",
      }),
      h(
        "div",
        { class: "type-block", "data-reveal": "" },
        h(
          "div",
          { class: "type-copy" },
          h("p", {}, "Híbrido não é ter duas contas em provedores diferentes. É ter uma parte do sistema em ambiente privado e outra em pública, com identidade, rede e dados conversando."),
          h(
            "p",
            {},
            "A vantagem é manter o que é sensível perto e escalar o que varia. A desvantagem é que a complexidade dobra: duas redes, duas permissões, dois lugares para monitorar."
          ),
          h(
            "dl",
            { class: "type-facts" },
            fact("Quem opera", "Os dois lados, com regras comuns"),
            fact("Controle", "Alto onde importa, elástico no resto"),
            fact("Melhor para", "Migração gradual e dados sensíveis"),
            fact("Risco principal", "Complexidade de integração")
          )
        ),
        h(
          "div",
          { class: "type-art" },
          h(
            "ol",
            { class: "type-list" },
            item("Desenhe a rede antes de escolher o serviço."),
            item("Defina identidade única para os dois lados."),
            item("Meça a latência entre ambientes."),
            item("Documente o que fica onde e por quê.")
          )
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Comparação",
        title: "Lado a lado, sem adjetivo.",
        text: "A mesma pergunta aplicada aos três modelos. Nenhuma coluna vence em tudo.",
      }),
      h(
        "div",
        { class: "table-wrap", "data-reveal": "" },
        h(
          "table",
          { class: "table" },
          h(
            "thead",
            {},
            h(
              "tr",
              {},
              h("th", { scope: "col" }, "Critério"),
              h("th", { scope: "col" }, "Pública"),
              h("th", { scope: "col" }, "Privada"),
              h("th", { scope: "col" }, "Híbrida")
            )
          ),
          h(
            "tbody",
            {},
            row("Custo inicial", "Baixo", "Alto", "Médio a alto"),
            row("Tempo para começar", "Minutos", "Semanas ou meses", "Semanas"),
            row("Controle do hardware", "Nenhum", "Total", "Parcial"),
            row("Escala", "Rápida e elástica", "Limitada ao que existe", "Elástica no lado público"),
            row("Manutenção", "Do provedor", "Sua ou contratada", "Dividida"),
            row("Dados regulados", "Depende da região", "Mais fácil de isolar", "Ficam onde você decidir")
          )
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      h(
        "div",
        { class: "about-grid" },
        h(
          "div",
          {},
          h("h2", { class: "display", style: { "font-size": "var(--step-3)" } }, "Como decidir em quatro perguntas."),
          h(
            "div",
            { class: "principle-list", style: { "margin-top": "24px" } },
            principle("01", "A lei exige que os dados fiquem em algum lugar específico?", "Se sim, a região e o modelo vêm antes do preço. Residência de dados não é detalhe de contrato."),
            principle("02", "Alguém do time consegue cuidar de servidor fora do horário?", "Se não, nuvem privada vira dívida operacional. Melhor alugar capacidade e manter o time pequeno."),
            principle("03", "A carga é previsível ou explode em alguns dias?", "Carga estável aceita reserva e planejamento. Picos pedem elasticidade e cobrança por uso."),
            principle("04", "Quanto custa errar a escolha?", "Se a resposta for pouco, comece pequeno e aprenda. Se for muito, faça um piloto com dados reais antes de migrar.")
          )
        ),
        h(
          "aside",
          { class: "about-aside" },
          h("p", { class: "eyebrow" }, "Nota honesta"),
          h(
            "p",
            {},
            "Multicloud é usar mais de um provedor ao mesmo tempo. Pode reduzir dependência, mas não é sinônimo de resiliência: duas contas mal configuradas continuam sendo um ponto único de falha."
          ),
          h("a", { class: "text-link", href: "#/glossario" }, "Ver termos de modelos", icon("arrow", 15)),
          h("a", { class: "text-link", href: "#/catalogo" }, "Filtrar serviços por área", icon("arrow", 15))
        )
      )
    ),

    h(
      "div",
      { class: "section" },
      note(
        " Nenhum modelo substitui configuração. Contas, permissões, código e dados continuam sendo responsabilidade de quem contrata.",
        "Responsabilidade compartilhada."
      )
    )
  );

  return { node, title: "Tipos de nuvem" };
}

function fact(term, value) {
  return h("div", { class: "type-fact" }, h("dt", {}, term), h("dd", {}, value));
}

function item(text) {
  return h("li", {}, text);
}

function row(criterion, a, b, c) {
  return h(
    "tr",
    {},
    h("td", {}, criterion),
    h("td", {}, a),
    h("td", {}, b),
    h("td", {}, c)
  );
}

function principle(num, title, text) {
  return h(
    "article",
    { class: "principle" },
    h("span", {}, num),
    h("div", {}, h("h3", {}, title), h("p", {}, text))
  );
}
