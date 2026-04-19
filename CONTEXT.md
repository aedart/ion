# Project Context: Modern TypeScript Monorepo (Node 24 / TS 6.0)

## Tech Stack & Environment
*   **Runtime**: Node.js v24.x (LTS)
*   **Package Manager**: pnpm v9.x
*   **Language**: TypeScript v6.0 (Target: ESNext)
*   **Orchestration**: Turborepo
*   **Formatting**: dprint (4-space indent, Allman braces)
*   **Transpiler**: SWC (via unplugin-swc) - **Current Limitation**: Prototype linking for `Symbol.metadata` is inconsistent (v2022-03/2023-11).

## Sub-Module Status: Meta (`@aedart/support/meta`)

### Architecture: Stage 3 Decorator Metadata
*   **MetaRepository**: En target-bound wrapper omkring `context.metadata`.
    *   Understøtter namespacing af medlemmer via `members.{name}`.
    *   Benytter en "Copy-on-Write" (Shallow Copy) strategi for at isolere metadata mellem forældre- og børne-klasser.
*   **@meta() Decorator**:
    *   Universal dekoratør til klasser, metoder og properties.
    *   Identificerer automatisk `targetName` baseret på `context.kind`.

### Current Implementation Details
*   **Isolation Logic**: For at forhindre prototype pollution (da transpileren ikke altid linker `[Symbol.metadata]` korrekt), sikrer repository manuelt, at hver sti-segment er en "own property" på den nuværende shelf ved skrivning.
*   **Manual Traversal**: På grund af defekt prototype-linking i test-miljøet, er repository designet til manuelt at iterere op gennem klasse-hierarkiet via `Object.getPrototypeOf(owner)` for at finde nedarvet metadata.

### Known Issues & Challenges
*   **Transpiler Bug**: `Object.getPrototypeOf(Sub[Symbol.metadata]) === Base[Symbol.metadata]` returnerer `false` i Vitest Browser (SWC).
*   **Target Isolation**: Ved dekorering af class fields er `target` ofte `undefined`, hvilket kræver alternativ opslag af klassens constructor (f.eks. via `addInitializer` eller `context` metadata referencen).

### Next Steps
1.  **Refaktorisering af Traversal**: Stabilisere den manuelle prototype-opslag logik i `MetaRepository.get()`.
2.  **Shadowing Verification**: Færdiggøre tests for `forget()` for at sikre, at sletning i en barne-klasse ikke påvirker forælderen (korrekt shadowing).
3.  **all() Implementation**: Beslutte om `all()` skal returnere en "merged" view (via traversal) eller kun "own" metadata.
