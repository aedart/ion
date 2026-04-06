# Project Context: Modern TypeScript Monorepo (Node 24 / TS 6.0)

This document serves as the persistent state and configuration guide for the **@aedart** monorepo. Use this to maintain architectural consistency during development and porting.

## Instructional Priority

* **Constraint Enforcement**: Always prioritize the "Known Constraints" and "Coding Standards" over standard defaults for TypeScript or Node.js.
* **Communication**: All responses must be in English.

## Tech Stack & Environment

* **Runtime**: Node.js v24.x (LTS)
* **Package Manager**: pnpm v9.x (Workspaces enabled)
* **Language**: TypeScript v6.0 (Target: ESNext)
* **Orchestration**: Turborepo
* **Testing**: Vitest v4.1.2 + Playwright (Provider)
    * Node Context: `tests/node/[pkg]/*.test.ts`
    * Browser Context: `tests/browser/[pkg]/*.test.ts`
* **Formatting**: dprint (Rust-based)
* **Linting**: ESLint v9.x (Flat Config format)

## Coding Standards & Style (dprint rules)

* **Indentation**: 4-space width (Spaces only).
* **Brace Style (Allman)**: Opening brace `{` on a new line for functions, methods, constructors, and classes.
* **Control Flow**: Opening brace `{` on the same line for `if`, `for`, `while`, `try/catch`, `switch`.
* **JSDoc**: Required for all functions; multiline strategy; vertical alignment of tags.
* **ESM Resolution**: Relative imports must include explicit `.js` extensions (required by TS 6.0 / Node 24).
* **Legal Headers**: Every `dist` file must contain:
  `/** [name] - [license], Copyright (c) 2023-present Alin Eugen Deac <aedart@gmail.com> */`

## Workspace Architecture

* **Root**: Private orchestrator. `noEmit: true` in root `tsconfig.json`.
* **Packages**: Located in `packages/*`. Each package must override `noEmit: false`, use `composite: true`, and define recursive `include: ["src/**/*"]`.
* **Dependencies**: `tslib` is a global `peerDependency`.
* **Workspace Protocol**: Internal dependencies use `workspace:*`. This is automatically replaced with the actual version during publishing.
* **Sync Strategy**: External dependencies in sub-packages are synchronized to the root `package.json` while maintaining their specific blocks (`dependencies` vs `devDependencies`).

## Maintenance & Automation Scripts

* **deps:sync**: (Refined) Pulls all external dependencies from sub-packages into root package.json.
    * Skips `workspace:` protocols.
    * Updates versions in root if they differ.
    * Sorts all dependency blocks alphabetically.
* **deps:propagate**: Pushes root dependency version constraints down to all workspace packages.
* **fix:imports**: Interactive script to append `.js` extensions to relative imports.
* **sync-assets**: Recursively copies assets (.vue, .scss, .svg, etc.) from `src` to `dist`.
* **build**: `turbo run build` (Runs `tsc` + `sync-assets.js` + `add-banner.js`).

## Known Constraints & Fixes

* **Performance Patterns**: For `support` utilities, prefer direct property checks and index-based `for` loops over higher-order functions or array-wrapping to minimize GC pressure and maximize V8 speed.
* **No Prettier**: Completely removed; use `dprint` for all formatting.
* **No baseUrl**: Deprecated in TS 6.0; all path mapping in `tsconfig.json` is relative.
* **Asset Sync**: `tsc` does not emit non-TS files; `scripts/sync-assets.js` handles this.
* **Internal Paths**: Use relative paths with `.js` extensions for internal package imports.
