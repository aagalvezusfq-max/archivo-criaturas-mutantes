# Archivo de criaturas mutantes

Máquina de intenciones tipadas — catálogo interactivo que combina rasgos base
(especie, hábitat, temperamento) con mutaciones para generar fichas de
criaturas únicas, con nivel de rareza y descripción narrativa.

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
src/
  catalogos.js    # rasgos base combinables
  descripcion.js  # generación de texto narrativo
  generador.js    # lógica principal (closures, promesas, async/await)
  main.js         # punto de entrada / demo
```

## Cómo ejecutar (versión JavaScript)

```bash
npm start
# equivalente a: node src/main.js
```

## Conceptos de JavaScript avanzado utilizados

- Funciones de orden superior (`filter`, `map`, `reduce`)
- Destructuring (con valores por defecto)
- Spread / rest
- Módulos ES (`import` / `export`)
- Promesas y `async/await`
- Manejo de errores (`try/catch`, errores custom)
- Closures (`crearArchivo` encapsula el registro interno)

## Próximos pasos

- Migración a TypeScript (tipos, interfaces, uniones literales).
