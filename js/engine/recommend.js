// Motor de recomendação. Regras explícitas e auditáveis, sem caixa-preta.

export const BUDGETS = [
  {
    id: "zero",
    label: "R$ 0",
    full: "sem gastar nada",
    max: 0,
    hint: "Só serviços grátis para sempre",
  },
  {
    id: "baixo",
    label: "até R$ 50",
    full: "até R$ 50 por mês",
    max: 50,
    hint: "Uso pequeno, um site ou uma API",
  },
  {
    id: "medio",
    label: "até R$ 200",
    full: "até R$ 200 por mês",
    max: 200,
    hint: "Projeto com banco, arquivos e tráfego",
  },
  {
    id: "alto",
    label: "sem teto",
    full: "sem teto definido",
    max: Infinity,
    hint: "Prioriza o que resolve, não o preço",
  },
];

export const LEVELS = [
  {
    id: "guiado",
    label: "Quero o mais guiado possível",
    short: "guiado",
    max: 2,
    hint: "Poucos cliques, menos decisões",
  },
  {
    id: "equilibrado",
    label: "Aceito configurar um pouco",
    short: "equilibrado",
    max: 3,
    hint: "Equilíbrio entre controle e simplicidade",
  },
  {
    id: "tecnico",
    label: "Não me importo de configurar",
    short: "técnico",
    max: 5,
    hint: "Aceito terminal, rede e permissões",
  },
];

export function budgetById(id) {
  return BUDGETS.find((item) => item.id === id) ?? BUDGETS[1];
}

export function levelById(id) {
  return LEVELS.find((item) => item.id === id) ?? LEVELS[1];
}

function rank(a, b) {
  const freeWeight = { sempre: 0, temporario: 1, nao: 2 };
  const freeDiff = (freeWeight[a.gratis] ?? 2) - (freeWeight[b.gratis] ?? 2);
  if (freeDiff !== 0) return freeDiff;
  if (a.min !== b.min) return a.min - b.min;
  if (a.complexidade !== b.complexidade) return a.complexidade - b.complexidade;
  return a.nome.localeCompare(b.nome, "pt-BR");
}

function passesBudget(service, budget) {
  if (budget.id === "zero") return service.gratis === "sempre";
  if (budget.id === "alto") return true;
  return service.min <= budget.max;
}

export function recommend(catalog, { area, budget, level, provider }) {
  const budgetInfo = budgetById(budget);
  const levelInfo = levelById(level);
  const services = catalog?.servicos ?? [];
  const audit = [];
  let pool = services;

  audit.push({ step: "catálogo", label: "todos os serviços", count: pool.length });

  if (area) {
    pool = pool.filter(
      (service) => service.areas.includes(area) || service.areas.includes("qualquer")
    );
    audit.push({
      step: "área",
      label: catalog?.areas?.[area] ?? area,
      count: pool.length,
    });
  }

  if (budget) {
    pool = pool.filter((service) => passesBudget(service, budgetInfo));
    audit.push({
      step: "orçamento",
      label: budgetInfo.full,
      count: pool.length,
    });
  }

  if (provider) {
    pool = pool.filter((service) => service.provedor === provider);
    audit.push({ step: "provedor", label: provider, count: pool.length });
  }

  if (level) {
    pool = pool.filter((service) => service.complexidade <= levelInfo.max);
    audit.push({
      step: "nível",
      label: `até ${levelInfo.short}`,
      count: pool.length,
    });
  }

  const ranked = [...pool].sort(rank);
  const top = ranked[0] ?? null;

  const alternatives = [];
  const seen = new Set(top ? [top.provedor] : []);
  for (const service of ranked.slice(1)) {
    if (alternatives.length >= 3) break;
    if (seen.has(service.provedor)) continue;
    seen.add(service.provedor);
    alternatives.push(service);
  }

  let suggestion = null;
  if (!top && area) {
    const nextBudget = BUDGETS.find(
      (item) =>
        item.max > (budgetInfo.max === Infinity ? 0 : budgetInfo.max) &&
        services.some(
          (service) =>
            (service.areas.includes(area) || service.areas.includes("qualquer")) &&
            passesBudget(service, item) &&
            (!provider || service.provedor === provider) &&
            (!level || service.complexidade <= levelInfo.max)
        )
    );
    if (nextBudget) {
      const count = services.filter(
        (service) =>
          (service.areas.includes(area) || service.areas.includes("qualquer")) &&
          passesBudget(service, nextBudget) &&
          (!provider || service.provedor === provider) &&
          (!level || service.complexidade <= levelInfo.max)
      ).length;
      suggestion = { budget: nextBudget, count };
    }
  }

  return {
    top,
    alternatives,
    ranked,
    audit,
    suggestion,
    budget: budgetInfo,
    level: levelInfo,
    total: ranked.length,
  };
}

export function areaChoices(catalog) {
  return Object.entries(catalog?.areas ?? {}).map(([id, label]) => ({
    id,
    label,
    hint: hintForArea(id),
  }));
}

function hintForArea(id) {
  return {
    site: "Página, portfólio ou loja",
    app: "API, backend ou aplicação",
    banco: "Guardar e consultar dados",
    arquivos: "Imagens, vídeos e backups",
    dados: "Relatórios e análise",
    rede: "Domínio, cache e proteção",
    ia: "Modelos e treinamento",
    qualquer: "Ainda não sei",
  }[id] ?? "";
}
