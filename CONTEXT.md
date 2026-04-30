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
* **Security**: All path-based operations must utilize `isKeyUnsafe` via `toParts` to prevent prototype pollution.

## Sub-Module Status

### Objects & Arrays (`@aedart/support/objects`, `@aedart/support/arrays`)

* **Status**: **Completed (v2)**.
* **Features**: High-performance replacements for Lodash; full `PropertyKey` and dot-notation support.

### Meta (`@aedart/support/meta`)

* **Status**: **Completed (v2 Redesign)**.
* **Architecture**: Manual Branching Strategy.
* **Storage**: `WeakMap` based registry using `MetaRepository` instances.
* **Inheritance**:
  * Repositories maintain a `#parent` reference for optimized O(1) ancestor access.
  * `findRepository` utility bridges gaps in the inheritance chain (skipping undecorated classes).
* **Member Metadata**:
  * Uses namespaced keys (`methods.[name].[key]`, `fields.[name].[key]`) stored on the Class/Prototype.
  * Resolves the "Method Gap" by allowing child classes to inherit parent member metadata even when methods are overridden.
* **Security**: `MetaRepository.set()` enforces strict `isKeyUnsafe` validation, throwing `TypeError` on pollution attempts.
* **Usage**: `Metadata` static helper provides the primary public API.

### Concerns (`@aedart/support/concerns`)

* **Status**: Completed (v1).
* **Features**: Stage 3 Decorator-based injection.

## Infrastructure & Testing (Vitest Browser)

* **Transpilation**: `@rolldown/plugin-babel` with `@babel/plugin-proposal-decorators` ("2023-11").
* **Metadata Note**: Native `Symbol.metadata` polyfills removed in favor of the manual `MetaRepository` registry.
