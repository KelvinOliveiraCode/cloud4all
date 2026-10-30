// Testes do motor de recomendação — contratos de honestidade e regras centrais.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { recommend, BUDGETS, LEVELS, areaChoices } from "../js/engine/recommend.js";

const catalog = JSON.parse(
  readFileSync(new URL("../data/catalogo.json", import.meta.url), "utf8")
);

const services = catalog.servicos;

test("catálogo: 124 serviços, 8 provedores, ids únicos", () => {
  assert.equal(services.length, 124);
  const providers = new Set(services.map((s) => s.provedor));
  assert.equal(providers.size, 8);
  const ids = services.map((s) => s.id);
  assert.equal(new Set(ids).size, ids.length);
});

test("catálogo: todo serviço tem campos obrigatórios e preço válido", () => {
  const required = ["id", "provedor", "nome", "areas", "gratis", "min", "max", "complexidade", "frase", "gratuidade", "doc", "preco"];
  for (const s of services) {
    for (const field of required) {
      assert.notEqual(s[field], undefined, `${s.id} sem ${field}`);
      assert.notEqual(s[field], "", `${s.id} com ${field} vazio`);
    }
    assert.equal(typeof s.min, "number", `${s.id} min não numérico`);
    assert.equal(typeof s.max, "number", `${s.id} max não numérico`);
    assert.ok(s.max >= s.min, `${s.id} tem max < min`);
    assert.ok(s.complexidade >= 1 && s.complexidade <= 5, `${s.id} complexidade fora de 1–5`);
    assert.ok(["sempre", "temporario", "nao"].includes(s.gratis), `${s.id} gratuidade inválida`);
  }
});

test("gratuidade: orçamento zero só devolve serviços 'sempre' grátis", () => {
  for (const area of Object.keys(catalog.areas)) {
    const result = recommend(catalog, { area, budget: "zero", level: "guiado" });
    for (const service of result.ranked) {
      assert.equal(service.gratis, "sempre", `${area}: ${service.nome} não é sempre-grátis`);
    }
  }
});

test("nível: filtro de complexidade respeita o teto do usuário", () => {
  const result = recommend(catalog, { area: "qualquer", budget: "alto", level: "guiado" });
  assert.ok(result.ranked.every((s) => s.complexidade <= 2));
});

test("top é o mais barato/grátis dentro dos filtros", () => {
  const result = recommend(catalog, { area: "site", budget: "alto", level: "tecnico" });
  assert.ok(result.top, "deve ter top");
  // nenhum outro ranked pode ter prioridade maior (grátis primeiro, depois min)
  for (const s of result.ranked) {
    const freeW = { sempre: 0, temporario: 1, nao: 2 };
    assert.ok(
      freeW[s.gratis] >= freeW[result.top.gratis],
      `${s.nome} teria prioridade de gratuidade sobre o top`
    );
  }
});

test("empty-state honesto: combinação impossível não força recomendação", () => {
  // área 'banco' + orçamento zero + nível guiado pode não ter opção — se vazio, top é null
  const result = recommend(catalog, { area: "banco", budget: "zero", level: "guiado" });
  if (result.ranked.length === 0) {
    assert.equal(result.top, null);
    assert.equal(result.total, 0);
  } else {
    assert.ok(result.top);
  }
});

test("provedor: filtro restringe ao provedor escolhido", () => {
  const result = recommend(catalog, { area: "app", budget: "alto", level: "tecnico", provider: "Cloudflare" });
  for (const s of result.ranked) {
    assert.equal(s.provedor, "Cloudflare");
  }
});

test("audit: trilha cumulativa começa em 124 e nunca cresce", () => {
  const result = recommend(catalog, { area: "site", budget: "baixo", level: "equilibrado" });
  assert.ok(result.audit.length >= 1);
  assert.equal(result.audit[0].count, 124);
  for (let i = 1; i < result.audit.length; i++) {
    assert.ok(result.audit[i].count <= result.audit[i - 1].count, `trilha cresceu no passo ${i}`);
  }
});

test("alternativas: até 3, de provedores diferentes, distintas do top", () => {
  const result = recommend(catalog, { area: "site", budget: "alto", level: "tecnico" });
  assert.ok(result.alternatives.length <= 3);
  const providers = new Set(result.alternatives.map((a) => a.provedor));
  assert.equal(providers.size, result.alternatives.length, "alternativas repetem provedor");
  assert.ok(!result.alternatives.some((a) => a.id === result.top?.id));
});

test("áreas e níveis expõem escolhas válidas", () => {
  const areas = areaChoices(catalog);
  assert.ok(areas.length >= 7);
  assert.ok(BUDGETS.length === 4);
  assert.ok(LEVELS.length === 3);
});
