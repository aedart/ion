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
* **Status**: **Completed (v1)**.
* **Features**:
    * Stage 3 Decorator-based injection.
    * Supports `ShorthandConfiguration`: `[ConcernConstructor, AliasMap]`.
    * **Security**: `isKeyUnsafe` validation on both source keys and alias targets to prevent prototype pollution.
    * **Conflict Resolution**: Throws `InjectionConflictError` on naming collisions or illegal alias targets.

### Meta (`@aedart/support/meta`)
* **Status**: **In Progress**.
* **Architecture**: Native Stage 3 Decorator Metadata integration.
* **Components**:
    * `MetaRepository`: Wraps `context.metadata` for path-aware get/set/has/forget operations.
    * `@meta()`: Decorator supporting class, method, and property metadata association.
* **Inheritance**: Leverages native prototype-based inheritance (`Child[Symbol.metadata].__proto__ === Parent[Symbol.metadata]`).
* **Next Task**: Determine logic for `all()` (Own vs. Merged) and `forget()` (Shadowing vs. Deletion).

### Objects (`@aedart/support/objects`)
* **Utilities**: `get`, `set`, `has`, `forget` (lodash wrappers used by Meta).

## Infrastructure & Testing (Vitest Browser)
* **Configuration**:
    * Stage 3 Decorators require `oxc: false` and `esbuild: false` within the specific browser project configuration.
    * **Transpilation**: `unplugin-swc` (with `decoratorVersion: "2022-03"`) must be injected at the project level to handle the `@` syntax for browsers.
    * **Polyfill**: `Symbol.metadata` is patched in `@aedart/support/meta/index.ts` to ensure compatibility across Node 24 and Browser runtimes.
