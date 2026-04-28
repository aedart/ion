# Project Context: Modern TypeScript Monorepo (@aedart)

## Tech Stack & Environment
*   **Runtime**: Node.js v24.x (LTS)
*   **Package Manager**: pnpm v9.x
*   **Language**: TypeScript v6.0 (Target: ESNext)
*   **Decorators**: Stage 3 (Babel "2023-11" transform)
*   **Formatting**: dprint (4-space indent, Allman braces for functions/classes).

## Sub-Module Status: Meta (`@aedart/support/meta`)

### Current Architecture (v2.1 - "Clean-Slate" Branch)
*   **Storage**: `WeakMap` based registry using `MetaRepository` instances.
*   **Inheritance**: Manual branching strategy with optimized O(1) ancestor access via `#parent` reference.
*   **Target Steering**:
    *   **Classes & Static Members**: Stored on the **Constructor**.
    *   **Instance Members**: Stored on the **Prototype**.
*   **Namespacing**: Explicit separation of static and instance members using `static.methods` and `static.fields` prefixes to ensure deterministic resolution for Dependency Injection (DI).

### Implementation Details & Breakthroughs
*   **Metadata Helper**: `Metadata.get/has` utilizes a `resolveTarget()` utility that automatically pivots to the prototype if querying instance members via a class constructor.
*   **Performance Patterns**:
    *   `findRepository()` is implemented as an optimized iterative `while` loop (non-recursive) to handle deep inheritance chains safely and quickly.
    *   Metadata values are returned by reference (no deep cloning/freezing) to prioritize performance and minimize GC pressure.
*   **Registry Flow**: `getOrCreateRepository()` ensures the inheritance bridge is established even for undecorated "gap" classes in the chain.

### Current Challenges & Timing Constraints
*   **Timing Issue**: In the Babel 2023-11 environment, `addInitializer` for instance members is deferred until instantiation (`new`).
*   **Current Workaround**: To allow eager scanning (DI-ready) without `new`, a class-level `@meta()` decorator is currently required to "flush" member metadata from the `context.metadata` staging area to the repositories.
*   **Static Members**: These are successfully flushed during class definition time via static initializers, requiring no class-level decorator.

### Objectives for Next Session
1.  **Remove Class Decorator Requirement**: Explore a "Global Staging Fallback" or a "Metadata.get Trigger" to allow instance member metadata to be accessible eagerly without requiring the class to be decorated or instantiated.
2.  **Service Container Integration**: Prepare for the porting of `@aedart/container` using the new high-performance metadata registry.
3.  **Reflections**: Ensure `context.metadata` (Symbol.metadata) is utilized as a fallback within the `MetaRepository` or `Metadata` utility where supported.

### Files to Scan Before Resuming
*   `packages/support/src/meta/Metadata.ts`
*   `packages/support/src/meta/MetaRepository.ts`
*   `packages/support/src/meta/getOrCreateRepository.ts`
*   `packages/support/src/meta/meta.ts` (the decorator)
*   `tests/browser/support/meta/meta.test.ts` (specifically the "Long Walk" inheritance test)
