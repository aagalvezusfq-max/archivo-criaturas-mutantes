// generador.js
import { especies, habitats, temperamentos, mutaciones, rarezas } from "./catalogos.js";
import { generarDescripcion } from "./descripcion.js";

// Simula una consulta asíncrona no bloqueante a un catálogo externo
// (ej. una base de datos remota). Devuelve una Promise que se rechaza
// si el catálogo está vacío -> maneja el caso de error exigido por la consigna.
function escanearCatalogo(catalogo, demoraMs = 150) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!catalogo || catalogo.length === 0) {
        reject(new Error("Catálogo vacío: no hay rasgos disponibles para escanear"));
        return;
      }
      const elegido = catalogo[Math.floor(Math.random() * catalogo.length)];
      resolve(elegido);
    }, demoraMs);
  });
}

// A partir del peso de la mutación, calcula la rareza resultante.
function calcularRareza(mutacion) {
  const [comun, raro, legendario] = rarezas;
  if (mutacion.peso >= 4) return legendario;
  if (mutacion.peso >= 2) return raro;
  return comun;
}

// crearArchivo() es una factory que usa CLOSURE: `registro` vive encapsulado
// y solo es accesible a través de las funciones que devuelve. Nadie fuera de
// este scope puede mutar el registro directamente.
export function crearArchivo() {
  const registro = [];

  async function generarCriatura(opciones = {}) {
    // Destructuring con valores por defecto sobre el objeto de opciones.
    const {
      catalogoEspecies = especies,
      catalogoHabitats = habitats,
      catalogoTemperamentos = temperamentos,
      catalogoMutaciones = mutaciones,
    } = opciones;

    try {
      // Promesas + async/await: cada "escaneo" es no bloqueante.
      const especie = await escanearCatalogo(catalogoEspecies);
      const habitat = await escanearCatalogo(catalogoHabitats);
      const temperamento = await escanearCatalogo(catalogoTemperamentos);
      const mutacion = await escanearCatalogo(catalogoMutaciones);

      const rasgos = { especie, habitat, temperamento, mutacion };

      const criatura = {
        id: `criatura-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        ...rasgos,
        rareza: calcularRareza(mutacion),
        descripcion: generarDescripcion(rasgos),
        timestamp: new Date().toISOString(),
      };

      // Evento auditable: se registra con trazabilidad a sus rasgos de origen.
      registro.push(criatura);
      return criatura;
    } catch (error) {
      // Manejo de error controlado, re-lanzado con contexto adicional.
      throw new Error(`No se pudo generar la criatura: ${error.message}`);
    }
  }

  // Función de orden superior: filtra el registro por rareza.
  function listarPorRareza(rarezaBuscada) {
    return registro.filter((criatura) => criatura.rareza === rarezaBuscada);
  }

  function listarTodas() {
    return [...registro]; // spread: devuelve copia, no la referencia interna.
  }

  return { generarCriatura, listarPorRareza, listarTodas };
}
