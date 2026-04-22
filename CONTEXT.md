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
* **Security**: All path-based operations must utilize `isKeyUnsafe` to prevent prototype pollution.

## Sub-Module Status

### Objects & Arrays (`@aedart/support/objects`, `@aedart/support/arrays`)

* **Status**: **Completed (v2)**.
* **Features**: Custom high-performance replacements for Lodash (`get`, `set`, `has`, `forget`, `isArrayLike`, `isSafeArrayLike`).
* **Capabilities**: Full support for `PropertyKey` (including Symbols), dot-notation, bracket-notation, and automatic array initialization during deep `set` operations.
* **Dependencies**: **Lodash dependency removed**.

### Concerns (`@aedart/support/concerns`)

* **Status**: Completed (v1).
* **Features**: Stage 3 Decorator-based injection, `ShorthandConfiguration`, prototype pollution security, conflict resolution.

### Meta (`@aedart/support/meta`)

* **Status**: **Redesign Required (Current state: Influx)**.
* **Diagnostic Findings**:
  * **Shelf Identity Leak**: The current environment incorrectly shares the same `Symbol.metadata` object instance across parent and child classes.
  * **Prototype Failure**: Metadata shelves are not being linked via the prototype chain during transpilation.
* **Resolution Strategy**: Pivot to a manual branching strategy using the new `@aedart/support/objects` utilities to achieve inheritance-safe metadata isolation.

## Infrastructure & Testing (Vitest Browser)

* **Transpilation**: `@rolldown/plugin-babel` with `@babel/plugin-proposal-decorators` (version: "2023-11").
* **Polyfill**: `Symbol.metadata` is patched in `@aedart/support/meta/index.ts`.
