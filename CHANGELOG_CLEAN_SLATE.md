# Changelog

Temporary changelog for feature branch.

## [Unreleased]

### Added

* `CONTEXT.md` (_AI context_).
* `scripts/sync-peer-deps.js` and `scripts/propagate-deps.js` utils scripts for synchronising dependencies between root package.json and packages' dependencies.
* `scripts/sync-assets.js` util for exporting assets, like `vue`, `scss`, `css`...etc.
* `scripts/fix-esm-imports.js` util for fixing ESM imports.

### Changed

**Breaking**

* Switched to use TypeScript `v6` and Node.js `v24`.
* Now using pnpm, with turbo, vite, and vitest (_previously used rollup, karma.js, webpack and other_).
* Upgraded to vuepress `^2.0.0-rc.28`, using vite as bundler.

**Non-breaking Changes**

* Optimized performance of misc's `isset()`, `empty()`, `isPropertyKey()`, `isKey()`, `mergeKeys()` and `toWeakRef()` (_support package_).
* The TypeScript source files are now also published, along with appropriate source maps.
* dprint is now used for formatting.

### Removed

* `LastUpdatedPlugin.vue` (_no longer needed, the adapted `LastUpdatedPlugin.ts` does the job_).
