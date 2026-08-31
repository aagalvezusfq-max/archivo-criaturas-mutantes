import type { PlantillaDescripcion, Rasgos } from "./types.js";

const PLANTILLAS: PlantillaDescripcion[] = [
  ({ especie, habitat }) =>
    `Un ${especie.toLowerCase()} fue avistado merodeando por ${habitat.toLowerCase()}.`,
  ({ temperamento }) =>
    `Su comportamiento se registra como ${temperamento.toLowerCase()}.`,
  ({ mutacion }) =>
    `Presenta una mutación de tipo "${mutacion.nombre.toLowerCase()}".`,
];

export function generarDescripcion(rasgos: Rasgos): string {
  const { especie, habitat, temperamento, mutacion } = rasgos;

  if (!especie || !habitat || !temperamento || !mutacion) {
    throw new Error("Faltan rasgos para generar la descripción");
  }

  return PLANTILLAS.map((plantilla) => plantilla(rasgos)).join(" ");
}
