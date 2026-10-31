import { h, icon } from "../core/dom.js";
import { getCatalog, getGlossary, getModules, getCourses } from "../core/data.js";
import { viewHead, sectionHead, note } from "../ui/parts.js";
import { art } from "../art.js";

export default async function sobreView() {
  const [catalog, glossary, modules, courses] = await Promise.all([
    getCatalog(),
    getGlossary(),
    getModules(),
    getCourses(),
  ]);

  const facts = [
    ["Versão", "v3, outubro de 2026"],
    ["Serviços no catálogo", String(catalog.total)],
    ["Termos no glossário", String(glossary.termos.length)],
    ["Módulos", String(modules.itens.length)],
    ["Itens de curso", String(courses.itens.length)],
    ["Dependências externas", "nenhuma"],
    ["Armazenamento", "só o seu navegador"],
    ["Rastreamento", "nenhum"],
  ];

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
          folio: "Sobre",
          title: h("span", {}, "Um atlas para ser ", h("em", {}, "conferido"), ", não para ser acreditado."),
          lede: "O Cloud4All Brasil organiza o que existe de nuvem em português claro. Não vende serviço, não recebe comissão e não ranqueia provedor por dinheiro.",
        })
      ),
      h("div", { class: "col-5 hero-art", html: art("contours") })
    ),

    h(
      "section",
      { class: "section" },
      h(
        "div",
        { class: "manifesto", "data-reveal": "" },
        h(
          "blockquote",
          {},
          "Quem entende a conta, o contrato e o vocabulário escolhe melhor do que quem só segue o ranking do mês. ",
          h("em", {}, "O resto é marketing"),
          "."
        ),
        h(
          "aside",
          {},
          h(
            "p",
            {},
            "Cada número desta página tem uma origem declarada. Quando o dado é aproximado, está escrito. Quando não foi possível conferir, também."
          ),
          h("a", { class: "text-link", href: "#/catalogo" }, "Ver o catálogo", icon("arrow", 15))
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Princípios",
        title: "Cinco regras que não mudam.",
        text: "Elas valem para o texto, para o catálogo e para a recomendação.",
      }),
      h(
        "div",
        { class: "about-grid" },
        h(
          "div",
          { class: "principle-list", "data-reveal": "" },
          principle(
            "01",
            "Preço é dado, não argumento.",
            "Todo valor aparece como faixa aproximada para uso pequeno, com a data do retrato. Nenhum serviço sobe na lista porque paga melhor."
          ),
          principle(
            "02",
            "Grátis é uma palavra com prazo.",
            "Separamos grátis para sempre, grátis no começo e pago. Nunca somamos as três em um número só para inflar a contagem."
          ),
          principle(
            "03",
            "A trilha precisa ser visível.",
            "A recomendação mostra cada filtro e quantos serviços sobraram. Se o resultado for vazio, dizemos isso e sugerimos o próximo orçamento."
          ),
          principle(
            "04",
            "Português antes de sigla.",
            "A sigla aparece depois da explicação, nunca no lugar dela. O glossário existe para isso."
          ),
          principle(
            "05",
            "O celular é o padrão.",
            "A leitura foi desenhada para uma coluna, alvo de toque grande e pouca rolagem horizontal. O desktop é uma ampliação, não o contrário."
          )
        ),
        h(
          "aside",
          { class: "about-aside" },
          h("p", { class: "eyebrow" }, "Ficha técnica"),
          h(
            "dl",
            {},
            ...facts.map(([term, value]) =>
              h("div", {}, h("dt", {}, term), h("dd", {}, value))
            )
          ),
          h(
            "p",
            { class: "course-note" },
            icon("info", 14),
            "Os arquivos de dados são JSON locais. O site funciona sem banco, sem API e sem build."
          )
        )
      )
    ),

    h(
      "section",
      { class: "section" },
      sectionHead({
        folio: "Método",
        title: "Como os dados são mantidos.",
        text: "O catálogo é um retrato, não um espelho em tempo real. A diferença importa.",
      }),
      h(
        "div",
        { class: "principle-list", "data-reveal": "" },
        principle(
          "01",
          "Coleta na página oficial.",
          "Nome, finalidade, preço de referência e endereço da documentação vêm do site do provedor. Nada é estimado a partir de blog de terceiro."
        ),
        principle(
          "02",
          "Conversão declarada.",
          "Preços em dólar são convertidos para reais com uma taxa aproximada e arredondados. A taxa aparece na nota do catálogo."
        ),
        principle(
          "03",
          "Gratuidade em três estados.",
          "Grátis para sempre, grátis no começo e pago. Um serviço só entra como grátis para sempre quando a faixa gratuita é permanente."
        ),
        principle(
          "04",
          "Data em cada conferência.",
          "Cursos e plataformas guardam a data em que o link foi aberto. Item que não abriu fica marcado como não conferido, com o motivo."
        ),
        principle(
          "05",
          "Correção é bem-vinda.",
          "Se um preço mudou, o dado antigo é substituído, não escondido. O snapshot do catálogo indica o mês de referência."
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
          { class: "prose" },
          h("h2", { class: "display", style: { "font-size": "var(--step-2)" } }, "Projeto independente."),
          h(
            "p",
            { style: { "margin-top": "16px" } },
            "Este site não pertence a provedor de nuvem, escola ou agência. É um material de estudo mantido de forma aberta, com o código e os dados no mesmo lugar."
          ),
          h(
            "p",
            {},
            "As marcas citadas pertencem aos seus donos. A menção serve para identificar o serviço, não para sugerir parceria ou aprovação."
          ),
          h(
            "p",
            {},
            "Tipografia: Fraunces, para títulos, e Archivo, para texto. As duas são abertas e estão servidas do próprio site, sem chamada para servidor de terceiro."
          )
        ),
        h(
          "aside",
          { class: "about-aside" },
          h("p", { class: "eyebrow" }, "O que este site não faz"),
          h(
            "ul",
            { class: "plain-list" },
            h("li", {}, "Não cria conta e não pede e-mail."),
            h("li", {}, "Não envia seus dados para fora do navegador."),
            h("li", {}, "Não promete economia nem desconto."),
            h("li", {}, "Não substitui a documentação oficial.")
          )
        )
      )
    ),

    h(
      "div",
      { class: "section" },
      note(
        "Todo preço aqui é aproximado e tem data. Antes de contratar, abra a página oficial do provedor e confira a região, o limite do plano e o que gera cobrança extra.",
        "Leia o número com a data ao lado."
      )
    )
  );

  return { node, title: "Sobre e método" };
}

function principle(num, title, text) {
  return h(
    "article",
    { class: "principle" },
    h("span", {}, num),
    h("div", {}, h("h3", {}, title), h("p", {}, text))
  );
}
