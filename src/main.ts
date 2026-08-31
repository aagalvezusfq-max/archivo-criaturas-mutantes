import { crearArchivo } from "./generador.js";

async function main(): Promise<void> {
  const archivo = crearArchivo();

  console.log("=== Generando 4 criaturas ===\n");

  const criaturas = await Promise.all(
    Array.from({ length: 4 }, () => archivo.generarCriatura())
  );

  criaturas.forEach(({ id, especie, habitat, temperamento, mutacion, rareza, descripcion }) => {
    console.log(`[${rareza.toUpperCase()}] ${id}`);
    console.log(`  Especie: ${especie} | Hábitat: ${habitat} | Temperamento: ${temperamento}`);
    console.log(`  Mutación: ${mutacion.nombre}`);
    console.log(`  ${descripcion}\n`);
  });

  console.log("=== Criaturas legendarias registradas ===");
  const legendarias = archivo.listarPorRareza("legendario");
  console.log(legendarias.length > 0 ? legendarias.map((c) => c.id) : "(ninguna en esta corrida)");

  console.log("\n=== Caso de error controlado: catálogo vacío ===");
  try {
    await archivo.generarCriatura({ catalogoMutaciones: [] });
  } catch (error: unknown) {
    const mensaje = error instanceof Error ? error.message : String(error);
    console.log(`Error capturado correctamente: ${mensaje}`);
  }
}

void main();
