# Project Context: Modern TypeScript Monorepo (@aedart)

This document is the **Source of Truth** for the `@aedart` monorepo. It serves as the persistent state for AI assistants to ensure architectural consistency and prevent "pattern drift."

## 1. Project Identity & Location

* **Repository**: [aedart/ion](https://github.com)
* **Active Branch**: `clean-slate`
* **Primary Docs**: `/docs` directory (Markdown)
* **Secondary Docs**: [Official Site](https://github.io)
* **Context Scope**: AI should prioritize the file structure and logic found within the `clean-slate` branch. When seeking documentation, prefer scanning `.md` files in the `/docs` folder over external HTML links.

## 2. AI Operational Rules (Strict)

* **Constraint Sovereignty**: Always prioritize "Known Constraints," "Coding Standards," and "Performance Patterns" over defaults.
* **Drift Prevention**: If a user request contradicts this file, the AI MUST flag the conflict before proceeding.
* **Strategy**: Prioritize **Planning-first** turns. AI must propose a technical plan and verify it against all constraints before providing a full implementation.
* **Communication**: All responses must be in **English**.
* **Format**: Context (`CONTEXT.md`) output must be formatted in scannable Markdown for easy copy & paste.
* **Write Access & Maintenance**:
  * AI is permitted to fully edit/change the **"AI Session Summary"** (Section 8), after the `**Note to AI**` paragraph.
  * AI is encouraged to add **Atomic Entries** (brief, 1-line definitions) to **"Technical Architecture & Utilities"** (Section 6) when new stable utilities are created.
  * **Strict Prohibition**: AI MUST NOT remove, consolidate, or shorten existing definitions in Section 6.
  * **Density over Verbosity**: New entries must be concise to maintain high context density and minimize computational overhead.

## 3. Tech Stack & Environment

* **Runtime**: Node.js v24.x (LTS)
* **Package Manager**: pnpm v9.x (Workspaces)
* **Language**: TypeScript v6.0 (Target: ESNext)
* **Orchestration**: Turborepo
* **Formatting**: dprint (4-space indent, **Allman Braces** for functions/classes).
* **Linting**: ESLint v9.x (Flat Config).

## 4. Coding Standards & Style

* **Indentation**: 4-space width (Spaces only).
* **Brace Style (Allman)**: Opening brace `{` on a new line for functions, methods, constructors, and classes.
* **Control Flow**: Opening brace `{` on the same line for `if`, `for`, `while`, `try/catch`, `switch`.
* **ESM Resolution**: Relative imports must include explicit `.js` extensions.

## 5. Performance Patterns (Strict)

* **Looping**: Prefer index-based `for` loops with cached length over `for...of`, `forEach`, or `.map()`.
* **Iteration**: Use reverse index loops (`i--`) when consuming inheritance chains to eliminate `.reverse()` allocations.
* **Memory Management**: Pre-allocate arrays when total size is known. Avoid generator usage (`yield`) in high-frequency utility functions; prefer standard `while` loops. Minimize object/array allocations in hot paths.
* **Complexity**: Use `LOOKUP_THRESHOLD` (16) to switch between nested loops ($O(n^2)$) and `Set`/`Map` lookups ($O(n)$).
* **Security**: All path-based operations must utilize `isKeyUnsafe` via `toParts` to prevent prototype pollution.

## 6. Technical Architecture & Utilities

### Arrays & Collections (`@aedart/support/arrays`)

* **`IntersectArrays<T>`**: Variadic recursive type for intersecting multiple array types.
* **`isSafeArrayLike`**: Validates array-like properties while excluding strings, boxed strings, and TypedArrays.
* **`Merger`**: Performance-optimized deep merger using single-pass index loops and `structuredClone`.
* **`CLONE` Support**: Default merge callback prioritizes the `CLONE` symbol override before falling back to `structuredClone`.

### Reflection & Prototypes (`@aedart/support/reflections`)

* **`walkParents` / `walkPrototype`**: Generators for chain traversal.
* **`getConstructorName`**: Optimized retrieval using optional chaining and nullish coalescing.
* **`getNameOrDesc`**: Lazy-evaluated utility prioritizing constructor names.
* **`isKeyUnsafe`**: Hardened $O(1)$ check against internal frozen map (`__proto__`, `constructor`, `prototype`).
* **`isSubclass`**: Optimized $O(1)$ prototype check; returns `false` if target equals superclass.
* **`isTypedArray`**: Uses `TYPED_ARRAY_PROTOTYPE.isPrototypeOf(target)` for V8-optimized instance checking.
* **`isWeakKind`**: Fast-exit $O(1)$ check for `WeakRef`, `WeakMap`, and `WeakSet`.
* **`isConcatSpreadable`**: Uses the `in` operator for high-performance symbol detection in the prototype chain.
* **`TYPED_ARRAY_PROTOTYPE`**: Resolved via `Reflect.getPrototypeOf(Int8Array.prototype)`.

### Objects Sub-Module (`@aedart/support/objects`)

* **`populate`**: Optimized shallow copy utility using index loops and `LOOKUP_THRESHOLD` scaling.
* **`CLONE` Symbol**: `unique symbol` for `Cloneable` interface.
* **Encapsulation**: Use native JavaScript private fields (`#field`).

### Concerns (PHP-style Traits) (`@aedart/support/concerns`)

* **Pattern**: Stateless "Direct Injection" (Descriptor Copy) using Stage 3 Decorators.
* **Base Class**: `AbstractConcern` (Prevents direct instantiation; marked with `CONCERN_CLASS` symbol).
* **Decorator (`@use`)**: Performs $O(n)$ descriptor injection; supports **Registry Flattening** and strict **Conflict Resolution**.
* **Reflection API**: `usesConcerns()`, `appliedConcerns()`, `getAliasSource()`, and `appliedAliases()`.

### Exceptions (`@aedart/support/exceptions`)

* **`BaseError`**: Abstract base class. Automates `this.name` and `Error.captureStackTrace` for V8. All custom exceptions MUST inherit from this.

## 7. Maintenance Scripts

* **deps:sync / deps:propagate**: Dependency management.
* **fix:imports**: Appends `.js` to relative imports.
* **build**: `turbo run build`.

## 8. AI Session Summary

**Note to AI**: This is the ONLY section you are permitted to fully change or edit. Use this to maintain context across sessions.

### Current Sub-Module Status: Meta (`@aedart/support/meta`)

#### Current Architecture (v2.1 - "Clean-Slate" Branch)

* **Storage**: `WeakMap` based registry using `MetaRepository` instances.
* **Inheritance**: Manual branching strategy with optimized O(1) ancestor access via `#parent` reference.
* **Target Steering**: Static members on Constructor; Instance members on Prototype.
* **Namespacing**: Explicit separation using `static.methods` and `static.fields` prefixes.

#### Implementation Details & Breakthroughs

* **Metadata Helper**: `Metadata.get/has` utilizes `resolveTarget()` to pivot between constructor and prototype automatically.
* **Performance**: `findRepository()` uses an optimized iterative `while` loop. Values returned by reference.
* **Registry Flow**: `getOrCreateRepository()` handles "gap" classes in the chain.

#### Current Challenges & Timing Constraints

* **Timing Issue**: Babel 2023-11 defers `addInitializer` for instance members until `new`.
* **Current Workaround**: Class-level `@meta()` decorator is required to "flush" member metadata for eager DI scanning.
* **Static Members**: Flushed during definition via static initializers (no class decorator needed).

### Objectives for Next Session

1. **Remove Class Decorator Requirement**: Explore a "Global Staging Fallback" or a "Metadata.get Trigger" to allow instance member metadata to be accessible eagerly without requiring the class to be decorated or instantiated.
2. **Service Container Integration**: Prepare for the porting of `@aedart/container` using the new high-performance metadata registry.
3. **Reflections**: Ensure `context.metadata` (Symbol.metadata) is utilized as a fallback within the `MetaRepository` or `Metadata` utility where supported.

### Files to Scan Before Resuming

* `packages/support/src/meta/Metadata.ts`
* `packages/support/src/meta/MetaRepository.ts`
* `packages/support/src/meta/getOrCreateRepository.ts`
* `packages/support/src/meta/meta.ts` (the decorator)
* `tests/browser/support/meta/meta.test.ts` (specifically the "Long Walk" inheritance test)
