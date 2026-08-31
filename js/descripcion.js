// descripcion.js
// Construye la descripción narrativa de una criatura a partir de sus rasgos.
// Usa destructuring para extraer solo lo que necesita del objeto de rasgos.

const PLANTILLAS = [
  ({ especie, habitat }) =>
    `Un ${especie.toLowerCase()} fue avistado merodeando por ${habitat.toLowerCase()}.`,
  ({ temperamento }) =>
    `Su comportamiento se registra como ${temperamento.toLowerCase()}.`,
  ({ mutacion }) =>
    `Presenta una mutación de tipo "${mutacion.nombre.toLowerCase()}".`,
];

export function generarDescripcion(rasgos) {
  const { especie, habitat, temperamento, mutacion } = rasgos;

  if (!especie || !habitat || !temperamento || !mutacion) {
    throw new Error("Faltan rasgos para generar la descripción");
  }

  // Higher-order function: map sobre las plantillas, cada una es una función.
  return PLANTILLAS.map((plantilla) => plantilla(rasgos)).join(" ");
}
