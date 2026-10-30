// Monta o prompt que a pessoa copia para a IA que já usa.
// Só entram dados do catálogo. Nenhum preço é inventado.

import { priceLabel, complexityLabel, gratuityLabel } from "../core/format.js";

const AREA_TEXT = {
  site: "hospedar um site ou uma página",
  app: "rodar uma aplicação ou API",
  banco: "hospedar um banco de dados",
  arquivos: "guardar arquivos",
  dados: "analisar dados",
  rede: "cuidar de rede e entrega de conteúdo",
  ia: "treinar ou usar modelos de IA",
  qualquer: "resolver um problema que ainda não sei classificar",
};

export function buildPrompt({ area, budgetLabel, levelLabel, provider, service, catalog }) {
  const lines = [];

  lines.push("Quero escolher um serviço de nuvem e preciso de ajuda para decidir.");
  lines.push("");
  lines.push(`Objetivo: ${AREA_TEXT[area] ?? "usar nuvem"}.`);
  lines.push(`Orçamento mensal aceitável: ${budgetLabel}.`);
  lines.push(`Nível de conforto técnico: ${levelLabel}.`);
  if (provider) lines.push(`Provedor de preferência: ${provider}.`);
  lines.push("");

  if (service) {
    lines.push("O catálogo aberto Cloud4All aponta este serviço como ponto de partida:");
    lines.push(
      `- ${service.provedor} ${service.nome}: ${priceLabel(service)} por mês em uso pequeno, complexidade ${service.complexidade}/5 (${complexityLabel(service.complexidade)}), ${gratuityLabel(service)}.`
    );
    lines.push(`- O que ele faz, em linguagem simples: ${service.frase}.`);
    lines.push(`- Detalhe da gratuidade: ${service.gratuidade}.`);
    lines.push("");
  }

  lines.push("Responda em português do Brasil, em cinco passos curtos:");
  lines.push("1. Explique o que esse serviço faz e para quem ele serve.");
  lines.push("2. Diga se ele cabe no orçamento e o que pode gerar custo extra.");
  lines.push("3. Aponte o principal risco de configuração ou de segurança.");
  lines.push("4. Compare com uma alternativa mais simples e uma mais completa.");
  lines.push("5. Termine com um primeiro passo pequeno, que eu consiga testar hoje.");
  lines.push("");
  lines.push(
    "Regras: não invente preços nem limites de plano. Se faltar informação, diga exatamente o que devo confirmar na página oficial do provedor."
  );
  lines.push("");
  lines.push(
    `Contexto do catálogo: ${catalog?.total ?? 124} serviços, ${Object.keys(catalog?.areas ?? {}).length} áreas, snapshot ${catalog?.snapshot ?? "2026"}. Preços aproximados em reais para uso pequeno.`
  );

  return lines.join("\n");
}
