# Project Context: Modern TypeScript Monorepo (Node 24 / TS 6.0)

This document serves as the persistent state and configuration guide for the **@aedart** monorepo.

## Instructional Priority

* **Constraint Enforcement**: Always prioritize "Known Constraints" and "Coding Standards" over defaults.
* **Communication**: Responses must be in English.
* **Format**: Context output must be formatted in scannable Markdown for easy copy/paste.
* **Code Examples**: Do **NOT** include legal headers/banners in code snippets (this is handled automatically via `scripts/add-banner.js` during the build process).

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
* **Type Portability**: Avoid JSDoc `@type` references to internal/ambient library types (e.g., Lodash internals) that cause TS2883 errors. Use `typeof` aliasing or explicit local interfaces.

## Performance Patterns (Strict)

* **Looping**: Prefer index-based `for` loops with cached length over `for...of`, `forEach`, or `.every()/.some()`.
* **GC Pressure**: Minimize object/array allocations in hot paths.
* **Collection Threshold**: Use a threshold of **16** elements to switch between nested loops ($O(n^2)$) and `Set`/`Map` lookups ($O(n)$) to balance CPU cache locality vs. allocation overhead.
* **Generators**: Use `yield` for deep tree/prototype traversals to avoid massive array allocations when early exit is possible.

## Technical Definitions & Utilities

### Reflection & Prototypes (`@aedart/support/reflections`)

* **`walkParents`**: Generator yielding parent classes; supports `includeTarget`.
* **`walkPrototype`**: Generator yielding keys in the prototype chain level-by-level.
* **`getParentOfClass`**: Returns nearest parent or `null`.
* **`classOwnKeys`**: Uses `walkPrototype` and a `Set` for deduplication.
* **`classLooksLike`**: Structural "Runtime Interface" check; applies the 16-element threshold.

### Objects Sub-Module (`@aedart/support/objects`)

* **Encapsulation**: Use native JavaScript private fields (`#field`) to ensure runtime immutability of internal state.
* **`ObjectId`**: Utility providing unique numeric IDs for objects via `WeakMap`.
* **Lodash Aliases**: `get`, `set`, `has`, and `forget` (alias for `unset`) using `typeof` mapping.
* **Optimized Utilities**: `hasAll`, `hasAny`, and `forgetAll` using length-cached index loops.

## Maintenance Scripts

* **deps:sync**: Syncs sub-package deps to root.
* **deps:propagate**: Pushes root versions to packages.
* **fix:imports**: Appends `.js` to relative imports.
* **build**: `turbo run build`.
