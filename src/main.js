// main.js
import { crearArchivo } from "./generador.js";

async function main() {
  const archivo = crearArchivo();

  console.log("=== Generando 4 criaturas ===\n");

  // Promise.all para lanzar generaciones en paralelo (no bloqueante).
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
  } catch (error) {
    console.log(`Error capturado correctamente: ${error.message}`);
  }
}

main();
