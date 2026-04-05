# Project Context: Modern TypeScript Monorepo (Node 24 / TS 6.0)

This document serves as the persistent state and configuration guide for the **@aedart** monorepo. Use this to maintain architectural consistency during porting and development.

## 🛠 Tech Stack & Environment

* **Runtime**: Node.js **v24.x** (LTS)
* **Package Manager**: **pnpm v9.x** (Workspaces enabled)
* **Language**: **TypeScript v6.0** (Target: `ESNext`)
* **Orchestration**: **Turborepo** (Tasks: `build`, `lint`, `format`, `type-check`, `test`)
* **Testing**: **Vitest v4.1.2** + **Playwright** (Provider)
  * **Node Context**: `tests/node/[pkg]/*.test.ts`
  * **Browser Context**: `tests/browser/[pkg]/*.test.ts` (Headless Chromium & Firefox)
* **Formatting**: **dprint** (Rust-based)
* **Linting**: **ESLint v9.x** (Flat Config format)

## 📐 Coding Standards & Style

* **Indentation**: **4-space** width (Spaces only).
* **Brace Style (Allman)**: Opening brace `{` on a **new line** for functions, methods, and classes.
* **Control Flow**: Opening brace `{` on the **same line** for `if`, `for`, `while`, `try/catch`.
* **JSDoc**: Required for all functions; multiline strategy; vertical alignment of tags.
* **Legal Headers**: Every `dist` file must contain:
  `/** [name] - [license], Copyright (c) 2023-present Alin Eugen Deac <aedart@gmail.com> */`

## 📦 Workspace Architecture

* **Root**: Private orchestrator. `noEmit: true` in root `tsconfig.json`.
* **Packages**: Located in `packages/*`. Each must override `noEmit: false`, use `composite: true`, and define recursive `include: ["src/**/*"]`.
* **Sub-modules**: Defined via `package.json` `exports` map (e.g., `@aedart/xyz/utils`).
* **Dependencies**: `tslib` is a global `peerDependency`.
* **Versioning**: **Strict Lockstep**. All packages share the exact same version. Verified via `scripts/check-versions.js`.
* **Tests**: Centralized in root `/tests` folder, isolated by environment sub-directories.

## 🚀 Key Automation Scripts

* **Build**: `pnpm build` (Runs `tsc` + `scripts/add-banner.js`).
* **Test**: `pnpm test` (Runs Node + multi-browser headless suite).
* **Format**: `pnpm format:fix` (Uses `dprint fmt`).
* **Publish**: `pnpm version:sync && pnpm build && pnpm version:tag && pnpm -r publish --access public`.

## 🛑 Known Constraints & Fixes

* **No Prettier**: Completely removed due to AST `FormattedText` errors with TS 6.0.
* **No baseUrl**: Deprecated in TS 6.0; all path mapping in `tsconfig.json` is relative.
* **Private Packages**: Strictly marked `"private": true`; automated skip during recursive publish.
* **TS Build Info**: `*.tsbuildinfo` files must be cleared before clean builds to ensure `.d.ts` emission.
* **Vitest**: Uses `vitest.config.ts` (not workspace.ts) with the `projects` array for stable environment switching.
