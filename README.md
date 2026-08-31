# Archivo de criaturas mutantes

Máquina de intenciones tipadas: un catálogo interactivo que combina rasgos
base (especie, hábitat, temperamento) con mutaciones para generar fichas de
criaturas únicas, cada una con rareza y descripción narrativa.

## Intención inicial

**Idea:** Un "Archivo de Criaturas Mutantes" — un catálogo interactivo donde
el usuario combina rasgos base (especie, hábitat, temperamento) con
mutaciones aleatorias o elegidas para generar fichas de criaturas únicas,
cada una con un nivel de rareza y una breve descripción narrativa generada a
partir de los rasgos combinados.

**Intención auditable:** El programa debe registrar cada criatura generada
como un evento verificable (con timestamp simulado), de modo que cualquier
ficha pueda rastrearse hasta los rasgos e inputs que la originaron — nada se
genera "en el aire" sin trazabilidad.

**Restricciones:**
- La generación de cada criatura debe simularse como un proceso asíncrono no
  bloqueante (como si "escaneara" una base de datos externa).
- Los rasgos y mutaciones deben venir de catálogos separados y combinables
  (no hardcodeados en una sola función gigante).
- Debe manejar al menos un caso de error controlado (ej. combinación
  inválida de rasgos, catálogo vacío).

**Criterios de aceptación:**
1. El usuario puede generar al menos una criatura combinando rasgos de forma
   asíncrona, y ver su ficha completa (especie, mutación, hábitat,
   temperamento, rareza, descripción).
2. El sistema puede filtrar o listar criaturas generadas por rareza usando
   una función de orden superior.
3. Un input inválido o un catálogo vacío produce un error manejado
   explícitamente, sin romper el programa.

## Estructura

```
js/                 # versión inicial en JavaScript
  catalogos.js
  descripcion.js
  generador.js
  main.js
src/                # versión migrada a TypeScript
  types.ts          # type aliases, interfaces y unión literal
  catalogos.ts
  descripcion.ts
  generador.ts
  main.ts
tsconfig.json
```

## Cómo ejecutar

```bash
npm install
```

Versión JavaScript (sin compilar):

```bash
npm run start:js
```

Versión TypeScript (compilar y demo):

```bash
npm run build    # tsc → dist/
npm start        # node dist/main.js
npm run demo     # build + start
```

## Conceptos de JavaScript avanzado utilizados

- Funciones de orden superior (`filter`, `map`, `reduce`)
- Destructuring (con valores por defecto)
- Spread / rest
- Módulos ES (`import` / `export`)
- Promesas, `async/await` y `Promise.all` (flujo no bloqueante)
- Manejo de errores (`try/catch`, errores custom)
- Closures (`crearArchivo` encapsula el registro interno)

## Decisiones de tipado

| Forma | Qué representa |
| --- | --- |
| `type Rareza` | Unión literal `"común" \| "raro" \| "legendario"`: estados de rareza permitidos. |
| `interface Mutacion` | Forma de cada mutación (`nombre`, `peso`). |
| `interface Rasgos` | Inputs combinables que originan una ficha. |
| `interface Criatura` | Ficha auditable: rasgos + `id`, `rareza`, `descripcion`, `timestamp`. |
| `interface OpcionesGeneracion` | Catálogos opcionales para inyectar (p. ej. el caso de catálogo vacío). |
| `interface Archivo` | API pública del closure: generar, filtrar, listar. |
| `type PlantillaDescripcion` | Función que convierte rasgos en una frase narrativa. |

Funciones tipadas (parámetros y retorno explícitos): `escanearCatalogo`,
`calcularRareza`, `generarDescripcion`, `generarCriatura`, `listarPorRareza`,
`combinarCatalogos`.

`rarezas` usa `as const` para que TypeScript no las infiera como `string[]`
y se pierda la unión literal.

## Errores que detectó TypeScript durante la migración

1. **`console` y `setTimeout` no existían en el tipo.** Con `"lib": ["ES2022"]`
   (sin DOM) TypeScript no conoce el runtime de Node. Se corrige con
   `@types/node` y `"types": ["node"]` en `tsconfig.json`.
2. **Índice de arreglo posiblemente `undefined`.** Con
   `noUncheckedIndexedAccess`, `catalogo[i]` es `T | undefined`. El escaneo
   ahora rechaza ese caso en lugar de resolver un valor inexistente.
3. **`error` en `catch` es `unknown`.** En JavaScript se accedía a
   `error.message` sin comprobar. Con `strict`, hay que estrechar el tipo
   (`error instanceof Error`) antes de leer el mensaje.
4. **Rarezas como `string[]`.** Sin `as const`, `calcularRareza` devolvería
   `string` y no sería asignable a `Rareza`. La unión literal exige literales
   exactos: `"legendaria"` no compila; `"legendario"` sí.
5. **Imports de tipo.** Con módulos ES, los tipos se importan con
   `import type` desde `./types.js` (extensión `.js` porque NodeNext emite
   ESM para Node).

## Aprendizajes

- El Event Loop no se bloquea: `setTimeout` encola un macrotask y
  `Promise.all` dispara varios escaneos en paralelo.
- TypeScript no cambia el runtime; hace explícitas las formas de datos y
  los estados permitidos para que el error aparezca al escribir, no al
  ejecutar.
- Un closure (`crearArchivo`) sigue siendo el coordinador del registro; los
  tipos (`Archivo`, `Criatura`) son el contrato auditable de esa API.
- GitHub Flow: rama `feature/proyecto-1`, commits semánticos y pull request
  hacia `main`.

## Evidencia de GitHub Flow

- Repositorio: https://github.com/aagalvezusfq-max/archivo-criaturas-mutantes
- Rama de trabajo: `feature/proyecto-1`
- Historial: commits de la versión JavaScript, luego la migración a TypeScript
- Integración: pull request de `feature/proyecto-1` hacia `main`
