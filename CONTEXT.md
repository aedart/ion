# Project Context: Modern TypeScript Monorepo (Node 24 / TS 6.0)

This document serves as the persistent state and configuration guide for the **@aedart** monorepo.

## Instructional Priority

* **Constraint Enforcement**: Always prioritize "Known Constraints" and "Coding Standards" over defaults.
* **Communication**: Responses must be in English.
* **Format**: Context output must be formatted in scannable Markdown for easy copy/paste.
* **Code Examples**: Do **NOT** include legal headers/banners in code snippets.

## Tech Stack & Environment

* **Runtime**: Node.js v24.x (LTS)
* **Package Manager**: pnpm v9.x (Workspaces)
* **Language**: TypeScript v6.0 (Target: ESNext)
* **Orchestration**: Turborepo
* **Testing**: Vitest v4.1.2 + Playwright
* **Formatting**: dprint (4-space indent, Allman braces for functions/classes).
* **Linting**: ESLint v9.x (Flat Config).

## Coding Standards & Style

* **Indentation**: 4-space width (Spaces only).
* **Brace Style (Allman)**: Opening brace `{` on a new line for functions, methods, constructors, and classes.
* **Control Flow**: Opening brace `{` on the same line for `if`, `for`, `while`, `try/catch`, `switch`.
* **ESM Resolution**: Relative imports must include explicit `.js` extensions.
* **Type Portability**: Avoid JSDoc `@type` references to internal/ambient library types. Use `typeof` aliasing or explicit local interfaces.

## Performance Patterns (Strict)

* **Looping**: Prefer index-based `for` loops with cached length over `for...of`, `forEach`, or `.every()/.some()`.
* **GC Pressure**: Minimize object/array allocations in hot paths (avoid unnecessary `.filter()` or `.map()` when a single loop suffices).
* **Collection Threshold**: Use a threshold of **16** elements to switch between nested loops ($O(n^2)$) and `Set`/`Map` lookups ($O(n)$).
* **Generators**: Use `yield` for deep tree/prototype traversals.

## Technical Definitions & Utilities

### Reflection & Prototypes (`@aedart/support/reflections`)

* **`walkParents` / `walkPrototype`**: Generators for chain traversal.
* **`isKeyUnsafe`**: Hardened $O(1)$ check against an internal frozen, null-prototype map containing `__proto__`, `constructor`, and `prototype`. Implemented with computed keys to ensure `__proto__` is a data property.
* **`isKeySafe`**: Logical negation of `isKeyUnsafe`.
* **`hasAllMethods`**: Optimized index-loop check for multiple method existence.

### Objects Sub-Module (`@aedart/support/objects`)

* **`CLONE` Symbol**: `unique symbol` used for the `Cloneable` interface to avoid naming collisions.
* **`populate`**: Shallow copies properties/descriptors from source to target; uses `Reflect.getOwnPropertyDescriptor` to support getters/setters and enforces `isKeySafe` checks.
* **Encapsulation**: Use native JavaScript private fields (`#field`).
* **Lodash Aliases**: `get`, `set`, `has`, and `forget` using `typeof` mapping.

## Maintenance Scripts

* **deps:sync / deps:propagate**: Dependency management.
* **fix:imports**: Appends `.js` to relative imports.
* **build**: `turbo run build`.
