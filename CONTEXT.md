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

## Technical Definitions & Utilities

### Reflection & Prototypes (`@aedart/support/reflections`)

* **`isSubclass`**: Optimized $O(1)$ prototype check.
* **`getClassPropertyDescriptors`**: Aggregates descriptors across the prototype chain using reverse iteration.
* **`isKeyUnsafe`**: Validates against prototype pollution keys (`__proto__`, `constructor`, `prototype`).

### Concerns (PHP-style Traits) (`@aedart/support/concerns`)

* **Pattern**: Stateless "Direct Injection" (Descriptor Copy) using Stage 3 Decorators.
* **Base Class**: `AbstractConcern` (Prevents direct instantiation; marked with `CONCERN_CLASS` symbol).
* **Decorator (`@use`)**:
    * Performs $O(n)$ descriptor injection into target prototypes.
    * Supports recursive **Registry Flattening** (merges nested concern registries into the target).
    * Implements strict **Conflict Resolution** (throws `InjectionConflictError` on naming collisions).
    * Supports **Aliasing & Exclusions** via `ConcernConfiguration`.
* **Registry**: `CONCERN_REGISTRY` (Symbol-based `Set` on constructors).
* **Reflection API**:
    * `usesConcerns()`: AND-based check across flattened registries.
    * `appliedConcerns()`: Aggregates all unique concern constructors in the inheritance chain.
    * `getAliasSource()`: Recursive resolution of an aliased property back to its ultimate origin.
    * `appliedAliases()`: Returns a complete map of injected aliases and their sources.

### Objects Sub-Module (`@aedart/support/objects`)

* **`Merger`**: Deep merger supporting custom `depth` limits and safety checks.
* **`populate`**: Optimized shallow copy utility using index loops and `isKeyUnsafe` validation.
