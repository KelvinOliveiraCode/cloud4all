// Carregamento dos dados abertos. Os arquivos são buscados por HTTP.

const cache = new Map();

async function load(name) {
  if (cache.has(name)) return cache.get(name);
  const promise = fetch(`data/${name}.json`, { cache: "no-cache" }).then(async (response) => {
    if (!response.ok) throw new Error(`Falha ao carregar ${name}.json (${response.status})`);
    return response.json();
  });
  cache.set(name, promise);
  try {
    return await promise;
  } catch (error) {
    cache.delete(name);
    throw error;
  }
}

export function getCatalog() {
  return load("catalogo");
}

export function getModules() {
  return load("modulos");
}

export function getCourses() {
  return load("cursos");
}

export function getGlossary() {
  return load("glossario");
}

export function catalogIndex(catalog) {
  const services = catalog?.servicos ?? [];
  const providers = new Map();
  const areas = new Map();
  const gratuity = { sempre: 0, temporario: 0, nao: 0 };
  const complexity = new Map();

  for (const service of services) {
    providers.set(service.provedor, (providers.get(service.provedor) ?? 0) + 1);
    for (const area of service.areas) areas.set(area, (areas.get(area) ?? 0) + 1);
    gratuity[service.gratis] = (gratuity[service.gratis] ?? 0) + 1;
    complexity.set(service.complexidade, (complexity.get(service.complexidade) ?? 0) + 1);
  }

  return {
    total: services.length,
    providers: [...providers.entries()].sort((a, b) => b[1] - a[1]),
    areas: [...areas.entries()].sort((a, b) => b[1] - a[1]),
    gratuity,
    complexity,
  };
}

export function findService(catalog, id) {
  return catalog?.servicos?.find((service) => service.id === id) ?? null;
}
