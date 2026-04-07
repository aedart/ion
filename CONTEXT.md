# Project Context: Modern TypeScript Monorepo (Node 24 / TS 6.0)

This document serves as the persistent state and configuration guide for the **@aedart** monorepo.

## Instructional Priority

* **Constraint Enforcement**: Always prioritize "Known Constraints" and "Coding Standards" over defaults.
* **Communication**: Responses must be in English.
* **Format**: All output (including this context) must be formatted in scannable Markdown for easy copy/paste.

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
* **Legal Headers**: `/** [name] - [license], Copyright (c) 2023-present Alin Eugen Deac <aedart@gmail.com> */`

## Performance Patterns (Strict)

* **Looping**: Prefer index-based `for` loops with cached length over `for...of`, `forEach`, or `.every()/.some()`.
* **GC Pressure**: Minimize object/array allocations in hot paths.
* **Collection Threshold**: Use a threshold of **16** elements to switch between nested loops (O(n²)) and `Set`/`Map` lookups (O(n)) to balance CPU cache locality vs. allocation overhead.
* **Generators**: Use `yield` for deep tree/prototype traversals to avoid massive array allocations when early exit is possible.

## Technical Definitions

* **Constructors**: Use `Constructor<T = any> = new (...args: any[]) => T` for generic factory types.
* **Reflection**:
    * `getParentOfClass`: Returns nearest parent or `null` if `FUNCTION_PROTOTYPE` reached.
    * `getAllParentsOfClass`: Returns array ordered by **nearest parent first**.
    * `classOwnKeys`: Uses `Set` for deduplication during recursive prototype traversal.

## Maintenance Scripts

* **deps:sync**: Syncs sub-package deps to root.
* **deps:propagate**: Pushes root versions to packages.
* **fix:imports**: Appends `.js` to relative imports.
* **build**: `turbo run build`.
