# Changelog

Temporary changelog for feature branch.

## [Unreleased]

### Added

* `Wildcard` type alias (_contracts package_).
* `walkPrototype()` and `walkParents` reflection utils (_support package_).
* Abstract `BaseError` (_support package_).
* Array `LOOKUP_THRESHOLD` const, the maximum number of elements in a collection before switching from nested loops (_support package_).
* `isBoundFunction()` (_support package_).
* `CONTEXT.md` (_AI context_).
* `scripts/sync-peer-deps.js` and `scripts/propagate-deps.js` utils scripts for synchronising dependencies between root package.json and packages' dependencies.
* `scripts/sync-assets.js` util for exporting assets, like `vue`, `scss`, `css`...etc.
* `scripts/fix-esm-imports.js` util for fixing ESM imports.

### Changed

**Breaking**

* Switched to use TypeScript `v6` and Node.js `v24`.
* Now using pnpm, with turbo, vite, and vitest (_previously used rollup, karma.js, webpack and other_).
* Upgraded to vuepress `^2.0.0-rc.28`, using vite as bundler.
* Custom exceptions now inherit from new `BaseError`.
* Order of returned properties from `classOwnKeys()` changed, as a result of optimisation.
* `classLooksLike()` now expects blueprint argument's `members` or `staticMembers` to contain at least one value.
* The `Cloneable` interface now defines a "clone" method using a unique symbol (`CLONE`) (_contracts package_).
* Type of `data?` argument changed from `any` to `Record<PropertyKey, any>` in `Populatable` interface (_contracts package_).
* `DANGEROUS_PROPERTIES` refactored to be a frozen object, containing `__proto__`, `constructor` and `prototype`. `isKeySafe()` and `isKeyUnsafe()` are affected by this change. (_contracts and support package_).
* Replaced `SourceKeysCallback` with new `AllowedKeysCallback` type alias, in `@aedart/contracts/support/objects` submodule.
* Refactored `populate()` to accept a list of "allowed" properties, with respect for "safe" mode (_support package_).
* `ConcatSpreadable` interface changed to include numeric indexer to ensure type safety for the elements being spread (_contracts package_).

**Non-breaking Changes**

* Optimized performance of arrays' `includeAll()`, `includesAny()`, `isTypedArray()`, `isSafeArrayLike()` and `isConcatSpreadable()` (_support package_).
* Optimized performance of misc's `isset()`, `empty()`, `isPropertyKey()`, `isKey()`, `mergeKeys()` and `toWeakRef()` (_support package_).
* Optimized performance of reflections utilities (_support package_).
* Optimized performance of objects' `hasAll()`, `hasAny()`, `forgetAll()`, `ObjectId`, `isset()` and `populate()` (_support package_).
* `ObjectId` properties are now set to be private.
* The TypeScript source files are now also published, along with appropriate source maps.
* dprint is now used for formatting.

### Fixed

* Incorrect return type description for `getAllParentsOfClass()` (_support package_).
* Incorrect `TYPED_ARRAY_PROTOTYPE`, changed from `Reflect.getPrototypeOf(Int8Array)` to `Reflect.getPrototypeOf(Int8Array.prototype)` (_contracts package_).

### Removed

* `FUNCTION_PROTOTYPE` const in `contracts/src/support/reflections` (_no longer used_).
* `configureStackTrace()` and `configureCustomError()`, replaced by new `BaseError` abstraction (_support package_).
* `LastUpdatedPlugin.vue` (_no longer needed, the adapted `LastUpdatedPlugin.ts` does the job_).
