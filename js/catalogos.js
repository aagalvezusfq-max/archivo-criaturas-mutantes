// catalogos.js
// Catálogos base: cada uno es un conjunto combinable de rasgos.
// Se mantienen separados a propósito (restricción del proyecto: nada hardcodeado
// en una sola función gigante).

export const especies = [
  "Lémur de niebla",
  "Anguila cavernaria",
  "Tejón bioluminiscente",
  "Polilla de cuarzo",
  "Salamandra glacial",
];

export const habitats = [
  "Bosque fosforescente",
  "Grieta submarina",
  "Desierto de sal",
  "Ruinas suspendidas",
  "Pantano de espejos",
];

export const temperamentos = [
  "Curioso",
  "Territorial",
  "Melancólico",
  "Hiperactivo",
  "Sigiloso",
];

// Cada mutación trae un "peso" que influye en la rareza resultante.
export const mutaciones = [
  { nombre: "Escamas cristalizadas", peso: 2 },
  { nombre: "Visión termal doble", peso: 3 },
  { nombre: "Extremidades extra", peso: 3 },
  { nombre: "Piel camaleónica", peso: 1 },
  { nombre: "Bioluminiscencia inestable", peso: 4 },
];

// Nota para la migración a TypeScript: esto se convertirá en una unión literal
// "común" | "raro" | "legendario"
export const rarezas = ["común", "raro", "legendario"];

// Función de orden superior + spread/rest: combina cualquier cantidad de
// catálogos en un único pool, útil para futuras extensiones (ej. catálogos
// de eventos especiales).
export function combinarCatalogos(...catalogos) {
  return catalogos.reduce((pool, catalogo) => [...pool, ...catalogo], []);
}
