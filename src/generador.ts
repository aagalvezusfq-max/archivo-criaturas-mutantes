import { especies, habitats, temperamentos, mutaciones, rarezas } from "./catalogos.js";
import { generarDescripcion } from "./descripcion.js";
import type { Archivo, Criatura, Mutacion, OpcionesGeneracion, Rareza, Rasgos } from "./types.js";

function escanearCatalogo<T>(catalogo: readonly T[], demoraMs = 150): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!catalogo || catalogo.length === 0) {
        reject(new Error("Catálogo vacío: no hay rasgos disponibles para escanear"));
        return;
      }
      const elegido = catalogo[Math.floor(Math.random() * catalogo.length)];
      if (elegido === undefined) {
        reject(new Error("Catálogo vacío: no hay rasgos disponibles para escanear"));
        return;
      }
      resolve(elegido);
    }, demoraMs);
  });
}

function calcularRareza(mutacion: Mutacion): Rareza {
  const [comun, raro, legendario] = rarezas;
  if (mutacion.peso >= 4) return legendario;
  if (mutacion.peso >= 2) return raro;
  return comun;
}

export function crearArchivo(): Archivo {
  const registro: Criatura[] = [];

  async function generarCriatura(opciones: OpcionesGeneracion = {}): Promise<Criatura> {
    const {
      catalogoEspecies = especies,
      catalogoHabitats = habitats,
      catalogoTemperamentos = temperamentos,
      catalogoMutaciones = mutaciones,
    } = opciones;

    try {
      const [especie, habitat, temperamento, mutacion] = await Promise.all([
        escanearCatalogo(catalogoEspecies),
        escanearCatalogo(catalogoHabitats),
        escanearCatalogo(catalogoTemperamentos),
        escanearCatalogo(catalogoMutaciones),
      ]);

      const rasgos: Rasgos = { especie, habitat, temperamento, mutacion };

      const criatura: Criatura = {
        id: `criatura-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...rasgos,
        rareza: calcularRareza(mutacion),
        descripcion: generarDescripcion(rasgos),
        timestamp: new Date().toISOString(),
      };

      registro.push(criatura);
      return criatura;
    } catch (error: unknown) {
      const mensaje = error instanceof Error ? error.message : String(error);
      throw new Error(`No se pudo generar la criatura: ${mensaje}`);
    }
  }

  function listarPorRareza(rarezaBuscada: Rareza): Criatura[] {
    return registro.filter((criatura) => criatura.rareza === rarezaBuscada);
  }

  function listarTodas(): Criatura[] {
    return [...registro];
  }

  return { generarCriatura, listarPorRareza, listarTodas };
}
