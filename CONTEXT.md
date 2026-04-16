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
* **Iteration**: Use reverse index loops (`i--`) when consuming inheritance chains to eliminate `.reverse()` allocations.
* **Memory Management**: Pre-allocate arrays when total size is known. Avoid intermediate arrays/iterator overhead in hot paths.
* **GC Pressure**: Avoid generator usage (`yield`) in high-frequency utility functions; prefer standard `while` loops.
* **Collection Threshold**: Use `LOOKUP_THRESHOLD` (16) to switch between nested loops ($O(n^2)$) and `Set`/`Map` lookups ($O(n)$).

## Technical Definitions & Utilities

### Reflection & Prototypes (`@aedart/support/reflections`)

* **`isSubclass`**: Optimized $O(1)$ prototype check; returns `false` if target equals superclass.
* **`walkParents`**: Generator-based traversal of the inheritance chain.
* **`getAllParentsOfClass`**: Returns an array of parent classes; optimized to minimize prototype lookups.
* **`getClassPropertyDescriptors`**: Aggregates descriptors across the prototype chain using `Reflect.getOwnPropertyDescriptor`. Processes chain in reverse to respect child overrides.
* **`TYPED_ARRAY_PROTOTYPE`**: Resolved via `Reflect.getPrototypeOf(Int8Array.prototype)`.

### Objects Sub-Module (`@aedart/support/objects`)

* **`Merger`**: Deep merger supporting `mergeArrays`, custom `depth` limits, and safety checks.
* **`merge()`**: Hybrid utility/factory. Supports direct calls with variadic intersection return types.
* **`populate`**: Optimized shallow copy utility using index loops and `isKeyUnsafe` validation.
* **Encapsulation**: Use native JavaScript private fields (`#field`).

### Exceptions (`@aedart/support/exceptions`)

* **`BaseError`**: Abstract base class automating `this.name` and V8 stack capture.
* **`MergeError` / `ArrayMergeError`**: Specialized exceptions inheriting from `BaseError`.
