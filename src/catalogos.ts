import type { Mutacion, Rareza } from "./types.js";

export const especies: readonly string[] = [
  "Lémur de niebla",
  "Anguila cavernaria",
  "Tejón bioluminiscente",
  "Polilla de cuarzo",
  "Salamandra glacial",
];

export const habitats: readonly string[] = [
  "Bosque fosforescente",
  "Grieta submarina",
  "Desierto de sal",
  "Ruinas suspendidas",
  "Pantano de espejos",
];

export const temperamentos: readonly string[] = [
  "Curioso",
  "Territorial",
  "Melancólico",
  "Hiperactivo",
  "Sigiloso",
];

export const mutaciones: readonly Mutacion[] = [
  { nombre: "Escamas cristalizadas", peso: 2 },
  { nombre: "Visión termal doble", peso: 3 },
  { nombre: "Extremidades extra", peso: 3 },
  { nombre: "Piel camaleónica", peso: 1 },
  { nombre: "Bioluminiscencia inestable", peso: 4 },
];

// `as const` fija los literales; sin él TypeScript infiere string[] y se pierde la unión.
export const rarezas = ["común", "raro", "legendario"] as const satisfies readonly Rareza[];

export function combinarCatalogos<T>(...catalogos: readonly T[][]): T[] {
  return catalogos.reduce<T[]>((pool, catalogo) => [...pool, ...catalogo], []);
}
