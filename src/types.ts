/**
 * Formas de datos del Archivo de Criaturas Mutantes.
 * Aquí se hacen explícitos los estados permitidos y las funciones principales.
 */

/** Unión literal: solo estas rarezas existen en el archivo. */
export type Rareza = "común" | "raro" | "legendario";

export interface Mutacion {
  nombre: string;
  peso: number;
}

export interface Rasgos {
  especie: string;
  habitat: string;
  temperamento: string;
  mutacion: Mutacion;
}

export interface Criatura extends Rasgos {
  id: string;
  rareza: Rareza;
  descripcion: string;
  timestamp: string;
}

export interface OpcionesGeneracion {
  catalogoEspecies?: readonly string[];
  catalogoHabitats?: readonly string[];
  catalogoTemperamentos?: readonly string[];
  catalogoMutaciones?: readonly Mutacion[];
}

export interface Archivo {
  generarCriatura: (opciones?: OpcionesGeneracion) => Promise<Criatura>;
  listarPorRareza: (rarezaBuscada: Rareza) => Criatura[];
  listarTodas: () => Criatura[];
}

export type PlantillaDescripcion = (rasgos: Rasgos) => string;
