# Project Context: Modern TypeScript Monorepo (Node 24 / TS 6.0)

This document serves as the persistent state and configuration guide for the **@aedart** monorepo.

## Instructional Priority

* **Constraint Enforcement**: Always prioritize "Known Constraints" and "Coding Standards" over defaults.
* **Communication**: Responses must be in English.
* **Format**: Context (`CONTEXT.md`) output must be formatted in scannable Markdown for easy copy & paste.
* **Code Examples**: Do **NOT** include legal headers/banners in code snippets.

## Tech Stack & Environment

* **Runtime**: Node.js v24.x (LTS)
* **Package Manager**: pnpm v9.x (Workspaces)
* **Language**: TypeScript v6.0 (Target: ESNext)
* **Orchestration**: Turborepo
* **Formatting**: dprint (4-space indent, Allman braces for functions/classes).
* **Linting**: ESLint v9.x (Flat Config).

## Coding Standards & Style

* **Indentation**: 4-space width (Spaces only).
* **Brace Style (Allman)**: Opening brace `{` on a new line for functions, methods, constructors, and classes.
* **Control Flow**: Opening brace `{` on the same line for `if`, `for`, `while`, `try/catch`, `switch`.
* **ESM Resolution**: Relative imports must include explicit `.js` extensions.
* **Type Portability**: Avoid JSDoc `@type` references to internal/ambient library types. Use `typeof` aliasing or explicit local interfaces.

## Performance Patterns (Strict)

* **Looping**: Prefer index-based `for` loops with cached length over `for...of`, `forEach`, or `.map()`.
* **Memory Management**: Pre-allocate arrays (e.g., `new Array(totalLength)`) when total size is known to reduce resizing/re-allocation overhead.
* **GC Pressure**: Minimize object/array allocations in hot paths. Avoid intermediate arrays (e.g., avoid `[].concat(...).map(...)`).
* **Collection Threshold**: Use `LOOKUP_THRESHOLD` (16) to switch between nested loops ($O(n^2)$) and `Set`/`Map` lookups ($O(n)$).

## Technical Definitions & Utilities

### Reflection & Prototypes (`@aedart/support/reflections`)

* **`isSubclass`**: Optimized $O(1)$ prototype check; returns `false` if target equals superclass.
* **`isTypedArray`**: Uses `TYPED_ARRAY_PROTOTYPE.isPrototypeOf(target)` for V8-optimized instance checking.
* **`isWeakKind`**: Fast-exit $O(1)$ check for `WeakRef`, `WeakMap`, and `WeakSet`.
* **`isKeyUnsafe`**: Validates against prototype pollution keys (`__proto__`, `constructor`, `prototype`).
* **`isConcatSpreadable`**: Returns `true` only if `Symbol.isConcatSpreadable` is explicitly `true`.
* **`TYPED_ARRAY_PROTOTYPE`**: Resolved via `Reflect.getPrototypeOf(Int8Array.prototype)`.

### Arrays & Collections (`@aedart/support/arrays`)

* **`IntersectArrays<T>`**: Variadic recursive type for intersecting multiple array types into a single type.
* **`isSafeArrayLike`**: Validates array-like properties while excluding strings, boxed strings, and TypedArrays.
* **`Merger` (Array)**: Optimized deep merger using `structuredClone` and symbol-based clone support.

### Objects Sub-Module (`@aedart/support/objects`)

* **`Merger`**: Deep merger supporting `mergeArrays`, custom `depth` limits, and safety checks.
* **`merge()`**: Hybrid utility/factory. Supports direct calls with variadic intersection return types and `.using()` configuration.
* **`CLONE` Symbol**: `unique symbol` for `Cloneable` interface.
* **`canCloneUsingStructuredClone`**: Optimized utility using `instanceof` with a guarded loop and `isPrototypeOf` for typed arrays.
* **`populate`**: Optimized shallow copy utility using index loops and `LOOKUP_THRESHOLD` scaling.
* **Encapsulation**: Use native JavaScript private fields (`#field`).

### Exceptions (`@aedart/support/exceptions`)

* **`BaseError`**: Abstract base class automating `this.name` and V8 stack capture.
* **`MergeError` / `ArrayMergeError`**: Specialized exceptions inheriting from `BaseError`.
