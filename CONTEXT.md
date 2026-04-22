# Project Context: Modern TypeScript Monorepo (Node 24 / TS 6.0)

This document serves as the persistent state and configuration guide for the **@aedart** monorepo.

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

## Performance Patterns (Strict)

* **Looping**: Prefer index-based `for` loops with cached length.
* **Iteration**: Use reverse index loops (`i--`) when consuming inheritance chains.
* **Memory Management**: Pre-allocate arrays when total size is known.

## Sub-Module Status

### Concerns (`@aedart/support/concerns`)

* **Status**: Completed (v1).
* **Features**: Stage 3 Decorator-based injection, `ShorthandConfiguration`, prototype pollution security, conflict resolution.

### Meta (`@aedart/support/meta`)

* **Status**: **Redesign Required (Blocked)**.
* **Diagnostic Findings**:
  * **Shelf Identity Leak**: The current environment (Babel `2023-11`) incorrectly shares the same `Symbol.metadata` object instance across parent and child classes.
  * **Prototype Failure**: The environment fails to link metadata shelves via the prototype chain (Object.getPrototypeOf(Child[Symbol.metadata]) !== Parent[Symbol.metadata]).
  * **Resolution Strategy**: Native `context.metadata` is currently unreliable. A pivot to a custom registry or a manual branching strategy is required to achieve inheritance-safe metadata isolation.

### Objects (`@aedart/support/objects`)

* **Utilities**: `get`, `set`, `has`, `forget` (custom logic/lodash wrappers).

## Infrastructure & Testing (Vitest Browser)

* **Transpilation**: `@rolldown/plugin-babel` with `@babel/plugin-proposal-decorators` (version: "2023-11").
* **Polyfill**: `Symbol.metadata` is patched in `@aedart/support/meta/index.ts`.
* **Current Issue**: The transpiler/runtime exhibits shared state behavior for metadata, leading to cross-contamination between `Base` and `Sub` classes during deep-path writes.
