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
* **GC Pressure**: Minimize object/array allocations in hot paths. Avoid unnecessary `.filter()` or `.map()` when a single loop suffices.
* **Collection Threshold**: Use `LOOKUP_THRESHOLD` (16) to switch between nested loops ($O(n^2)$) and `Set`/`Map` lookups ($O(n)$).
* **Generators**: Use `yield` for deep tree/prototype traversals to keep memory footprint $O(1)$.

## Technical Definitions & Utilities

### Arrays & Collections (`@aedart/support/arrays`)

* **`LOOKUP_THRESHOLD`**: Centralized constant (16) used to balance GC pressure vs. lookup complexity in V8.

### Reflection & Prototypes (`@aedart/support/reflections`)

* **`walkParents` / `walkPrototype`**: Generators for chain traversal.
* **`getConstructorName`**: Optimized retrieval using optional chaining and nullish coalescing.
* **`getNameOrDesc`**: Lazy-evaluated utility that prioritizes constructor names over description tags.
* **`isKeyUnsafe`**: Hardened $O(1)$ check against internal frozen map (`__proto__`, `constructor`, `prototype`).

### Exceptions (`@aedart/support/exceptions`)

* **`BaseError`**: Abstract base class that automates `this.name` assignment and optimized `Error.captureStackTrace` for V8 environments. All custom exceptions MUST inherit from this.

### Objects Sub-Module (`@aedart/support/objects`)

* **`populate`**: Optimized shallow copy utility using index loops and `LOOKUP_THRESHOLD` scaling.
* **`CLONE` Symbol**: `unique symbol` for `Cloneable` interface.
* **Encapsulation**: Use native JavaScript private fields (`#field`).

## Maintenance Scripts

* **deps:sync / deps:propagate**: Dependency management.
* **fix:imports**: Appends `.js` to relative imports.
* **build**: `turbo run build`.
