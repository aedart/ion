# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Core `Application` in `@aedart/core` (_new package_).
* Configuration `Repository` in `@aedart/config` (_new package_).
* `@aedart/support/services` (_new submodule_).
* `@aedart/support/env` (_new submodule_).
* Abstract `ServiceProvider` in `@aedart/support/services`.
* `ServiceRegistrar` in `aedart/support/services`.
* `isServiceProviderConstructor()` and `isServiceProvider()` utils in `@aedart/support/services`.
* `Env` and `env()` utilities in `@aedart/support/env`.
* `shallowMerge()` in `@aedart/support/objects`.
* `App` and `Config` facades in `@aedart/support/facades`.
* `isPromise()` utility in `@aedart/support/reflections`.
* `BindingTuple`, `IdentifierInstanceTuple` and `IdentifierAliasTuple` type aliases in `@aedart/contracts/container`.
* `isBindingTuple` util in `@aedart/container`.
* `test:fast` script in `packages.json`, to allow testing without (re)transpiling all packages.
* `test:cli` script in `packages.json`, for testing Node.js applications or modules.
* `@types/jasmine` as development dependency (_in root package only_).
* `@babel/plugin-syntax-dynamic-import` as development dependency (_in root package, for testing_).

### Changed

* TypeScript compile options now use `composite: true`, `incremental: true` and `clean: false` settings, in `shared/rollup.config` (_decreases build duration_).
* `@rollup/plugin-json` has now been enabled for all packages.
* `.env` file is parsed as `__ENV__`, for tests (_for root package only. File is parsed in `shared/tests/webpack.config`_).
* Use Node `v22` in Github Actions (_CI environment_).

### Fixed

* Various internal types in `@aedart/support/*` submodules.
* Es-lint warning for `type: any` property in `Facade`, in `@aedart/support/facades`.
* Test suite name(s) for container related tests.
* Babel plugins not applied by webpack, for tests.
* Cannot start ChromeHeadless (_"No usable sandbox!" error shown_) - new "ChromeHeadlessNoSandbox" launcher added in `karma-development.conf.cjs` with `--no-sandbox` flag specified.
* Karma JS unable to run, when root package contains "type: module" property.

## [0.13.0] - 2024-09-27

### Changed

**Breaking**

* Various argument and return types changed in the navigation utilities (_`Archive` and `PagesCollection`_), in `@aedart/vuepress-utils` (_due to upgrade to newer `vuepress` release_).

**Non-breaking Changes**

* Adjusted styles and colours for the documentation (_due to upgrade to newer `vuepress` release_).
* Updated docs for `@aedart/vuepress-utils` package.

### Fixed

* Unable to build documentation, due to missing `sass` module dependency, in `@aedart/vuepress-utils`.
* Unable to navigate to "next" or "current" documentation via top navigation (_caused by missing trailing slashes for `_currentPath` and `_nextPath`, in `Archive`_), in `@aedart/vuepress-utils`.
* Incorrect colours in `VersionDisclaimer.vue`, in `@aedart/vuepress-utils` (_after upgrade to newer `vuepress` release_).

## [0.12.1] - 2024-09-26

### Fixed

* `.eslintignore` file no longer supported (_replaced with new `eslint.config.mjs` file_).

## [0.12.0] - 2024-09-26

### Changed

* Updated dependencies (_service update_).

### Fixed

* `node_modules` directory inside packages/* is not ignored by git.
* 
## [0.11.0] - 2024-04-09

### Added

* Service Container package (`@aedart/container`).
* `Facade` abstraction, in `@aedart/support/facades`.
* `DEPENDENCIES` symbol and `Identifier` type in `@aedart/contracts/container`.
* `dependsOn()`, `dependencies()`, `hasDependencies()`, and `getDependencies()`, in `@aedart/support/container`.
* `isBindingIdentifier`, in `@aedart/support/container`.
* `ClassMethodName` and `ClassMethodReference` type aliases in `@aedart/contracts`.
* `isMethod()` util in `@aedart/support/reflections`.
* `ConstructorLike` and `Callback` type aliases, in `@aedart/constracts`.
* `CallbackWrapper` util class, in `@aedart/support`.
* `isCallbackWrapper` util, in `@aedart/support`.
* `ArbitraryData` concern, in `@aedart/support`.
* `arrayMergeOptions` in object `merge()`. 
* Add upgrade guide for "v0.7.x- to v0.10.x".

### Changed

**Breaking**

* Added `hasAny()` method in `TargetRepository` interface, in `@aedart/contracts/meta`.
* Default generic for `defaultValue` changed to `undefined`, for `get()` methods in meta `Repository` and `TargetRepository`.

**Non-breaking Changes**

* Root package Typescript dependency changed to `^5.4.2`.
* `@typescript-eslint/eslint-plugin` upgraded to `^7.1.1`, in root package.
* Refactored all classes' fields, changed from private to protected visibility (_see [private is not inherited](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain) for details in_).
* Removed decorator return types for `use()`, `meta()`, `targetMeta()`, and `inheritTargetMeta()` (_continued to cause TS1270 and TS1238 errors_). [#8](https://github.com/aedart/ion/pull/8), [#9](https://github.com/aedart/ion/pull/9).
* Refactored `hasAllMethods()` to use new `isMethod()` internally, in `@aedart/support/reflections`.
* Refactored all components that used deprecated `ConstructorOrAbstractConstructor` to use new `ConstructorLike` type alias.
* Marked `isClassConstructor()` and `isCallable()` as stable, in `@aedart/support/reflections`.
* Refactored / redesigned the array `merge()` to use a new `ArrayMerger` component, that allows custom merge callback and options.
* Upgraded root package dependencies (_service update_).

### Fixed

* Decorator types aliases (_TS1270 and TS1238 issues when applying the various decorator and decorator result types_). [#8](https://github.com/aedart/ion/pull/8).
* Broken link in docs for `isArrayLike`.
* Missing `tslib` as peer dependency for `@aedart/support` package.
* Unable to merge arrays containing functions, in `MetaRepository`. 
* `NOTICE` file not included in distributions.

### Deprecated

* `ConstructorOrAbstractConstructor` type alias. It has been replaced with the new `ConstructorLike` type., in `@aedart/constracts`.

## [0.10.0] - 2024-03-07

### Added

* `hasMeta()` util, in `@aedart/support/meta`. 
* `MetaRepository`, `TargetMetaRepository`, `TargetContext`, `Entry`, and `hasTargetMeta()` in `@aedart/support/meta`.
* `ClassDecorator`, `ClassMethodDecorator`, `ClassGetterDecorator`, `ClassSetterDecorator`, `ClassFieldDecorator`, `ClassAutoAccessorDecorator`, and `Decorator` types, in `@aedart/contracts`.
* `ClassDecoratorResult`, `ClassMethodDecoratorResult`, `ClassGetterDecoratorResult`, `ClassSetterDecoratorResult`, `ClassFieldDecoratorResult`, `ClassAutoAccessorDecoratorResult`, and `DecoratorResult` types, in `@aedart/contracts`.

### Changed

**Breaking**

* `targetMeta()` and `inheritTargetMeta()` now throw `MetaError` (_`TypeError` was previously thrown_), in `@aedart/support/meta`.

**Non-breaking Changes**

* Refactored / Redesigned `meta()`, `getMeta()`, and `getAllMeta()` to use new `MetaRepository` as its underlying core component for dealing with metadata.
* Refactored / Redesigned `targetMeta()`, `getTargetMeta()`, and `inheritTargetMeta()` to use new `TargetMetaRepository` underneath.
* Return type of `meta()` changed to `Decorator`.
* `MetaTargetContext` expanded with a `context: Context` property. `@aedart/contracts/support/meta`.

### Fixed

* Broken links in support/exceptions and in support/objects docs. 

### Removed

* `ClassContext`, `MethodContext`, `GetterContext`, `SetterContext`, `FieldContext`, `AccessorContext` and `MetadataContext`, in `@aedart/contracts/support/meta` (_components were deprecated in `v0.7.0`_).
* `MemberContext` type in `@aedart/contracts/support/meta` (_type was deprecated in `v0.7.0`_).

## [0.9.0] - 2024-03-05

### Added

* Concerns - an alternative to mixins, in `@aedart/contracts/support/concerns`. 
* `@aedart/contracts/support/exceptions` and `@aedart/support/exceptions` submodules.
* `@aedart/contracts/support/objects` submodule.
* `@aedart/contracts/support/arrays` and `@aedart/support/arrays` submodules.
* `ConcatSpreadable` (_extends TypeScript's `ArrayLike` interface_) interface in `@aedart/contracts/support/arrays`.
* `Throwable` (_extends TypeScript's `Error` interface_) interface in `@aedart/contracts/support/exceptions`. 
* `Cloneable` and `Populatable` interfaces in `@aedart/contracts/support/objects`.
* `LogicalError` and `AbstractClassError` exceptions in `@aedart/support/exceptions`.
* `getErrorMessage()`, `configureCustomError()` and `configureStackTrace()` in `@aedart/support/exceptions`.
* `FUNCTION_PROTOTYPE` and `TYPED_ARRAY_PROTOTYPE` constants in `@aedart/contracts/support/reflections`.
* `ClassBlueprint` interface in `@aedart/contracts/support/reflections`.
* `DANGEROUS_PROPERTIES` constant in `@aedart/contracts/support/objects`.
* `hasPrototypeProperty()` and `assertHasPrototypeProperty()` in `@aedart/support/reflections`.
* `getParentOfClass()` and `getAllParentsOfClass()` in `@aedart/support/reflections`.
* `getClassPropertyDescriptor()` and `getClassPropertyDescriptors()` in `@aedart/support/reflections`.
* `isWeakKind()` in `@aedart/support/reflections`.
* `isKeySafe()` and `isKeyUnsafe()` in `@aedart/support/reflections`.
* `getConstructorName()` and `getNameOrDesc()` in `@aedart/support/reflections`.
* `isSubclass()`, `classLooksLike()`, `isSubclassOrLooksLike()`, `classOwnKeys()`, `hasMethod()` and `hasAllMethods()` in `@aedart/support/reflections`.
* `merge()`, `populate()`, `isCloneable()` and `isPopulatable()`  in `@aedart/support/objects`.
* Objects `Merger` (_underlying component for the objects `merge()` util_) in `@aedart/support/objects`.
* `merge()`, `isTypedArray()`, `isArrayLike()`, `isSafeArrayLike()`, `isTypedArray()` and `isConcatSpreadable()` in `@aedart/support/arrays`.
* `includesAny()` and `includesAll()` in `@aedart/support/arrays`.

### Changed

* Split the "support" submodules docs into several smaller pages.

### Fixed

* Lodash JSDoc references in `get()`, `set()`, `unset()` and `forget()`, in `@aedart/support/objects`.
* `jasmine-core` `v4.x` was used by `karma-jasmine`, which caused thrown exceptions that contained `ErrorOptions` to not being rendered correctly in the CLI. [_See GitHub issue for details_](https://github.com/jasmine/jasmine/issues/2028).  
* Default `defaultTheme` deprecated, replaced with named import, in docs `config.ts`.
* `defineClientConfig()` does not exist in docs `client.ts` (_replaced with an object of the type `ClientConfig`_).

## [0.8.0] - 2024-02-12

### Added

* `@aedart/support/mixins` submodule that offers an adaptation of Justin Fagnani's [`mixwith.js`](https://github.com/justinfagnani/mixwith.js).
* `NOTICE` files for the root package, and all provided packages.

### Changed

* Generic type is now optional (_defaults to `object`_) for `Constructor`, `AbstractConstructor` and `ConstructorOrAbstractConstructor` types, in `@aedart/contracts/support`.

## [0.7.0] - 2024-02-02

### Added

* `targetMeta()`, `inheritTargetMeta()` and `getTargetMeta()` utils method in `@aedart/support/meta`.
* `isConstructor()` util method in `@aedart/support/reflections`.
* `isCallable()` and `isClassConstructor()` util methods in `@aedart/support/reflections` (_Unsafe / unstable!_).
* `Kind` enum which contains cases of the kind of element that is being decorated (_defined in a decorator context object_).
* `Arrayable` interface, in `@aedart/contracts/support` submodule.
* `toWeakRef()` util method in `@aedart/support/misc`.
* `mergeKets()` util method in `@aedart/support/misc`.
* `isKey()` util method in `@aedart/support/misc`.
* `isPropertyKey()` util method in `@aedart/support/misc`.
* Documentation for `uniqueId()` and `hasUniqueId()` util methods, in the `@aedart/support/objects` package.

### Changed

**Breaking**

* Node `^v20.11.0` is now required when working with the ion mono-repository.
* Decorator `Context` is now an alias for TypeScript's `DecoratorContext` (_affects `@aedart/support/meta`_).
* Decorator `MetadataRecord` is now an alias for TypeScript's `DecoratorMetadata` (_affects `@aedart/support/meta`_).

**Non-Breaking**

* Bumped license year.
* Dependencies updated (_service update_).
* Refactored internal `save()` method to no longer attempt to overwrite `context.metadata` because it has been defined as read-only property by TypeScript.  
* JSDoc now clearly states that `meta()` is intended to be used as a decorator.

### Removed

* Private `@aedart/reflections` package. Desired features added as a submodule in `@aedart/support` package.
* Experimental reflection components in `@aedart/support/reflections` submodule (_was never published_).
* `PropertyKey` from `@aedart/contacts/support` (_Replaced by TypeScript's own definition hereof_).

### Deprecated

* `ClassContext`, `MethodContext`, `GetterContext`, `SetterContext`, `FieldContext`, `AccessorContext` and `MetadataContext`, in `@aedart/contracts/support/meta` - replaced by corresponding TypeScript declarations and will be removed in next version.
* `MemberContext` in `@aedart/contracts/support/meta` (_no longer needed_).

### Fixed

* Docs broken due to out-of-date vuepress dependencies (_switched to `@vuepress` `v2.0.0-rc.2`_).
* `@vuepress/utils` not resolved by rollup during tests (_missing dependency, in the `@aedart/vuepress-utils` package_).
* Missing `@lerna-lite/publish` as dev-dependency in root package.

## [0.6.1] - 2023-04-28

### Security

* Fixed possible prototype pollution for the `MetadataRecord`, when merged with a base class' metadata object, in `meta` decorator (`@aedart/support`).  

## [0.6.0] - 2023-04-23

### Added

* `meta` decorator, in `@aedart/support` package. [#3](https://github.com/aedart/ion/pull/3).
* `Key`, `PropertyKey`, and `Primitive` types in contracts.
* `isPrimitive()` method, in `@aedart/support`.
* `ObjectId` helper that can generate/obtain a numeric ID for a target object, in `@aedart/support`.
* Cleanup script for removing leftover `*.d.ts` files in source dirs.

### Changed

* Methods in `@aedart/support/objects` now use the new `Key` type (_previously used Lodash's `PropertyKey` type_).
* `empty()` new uses a switch case internally, which appears to be much faster, in `@aedart/support/misc`.
* Removed `"gitHead"` from all `package.json` files (_should not have been committed in the first place_).

### Fixed

* Broken link to `isset()`, in Objects `isset()` documentation.
* `deploy.docs.sh` fails when `.build` directory does not exist.

## [0.5.0] - 2023-04-09

### Changed

* Set ["sideEffects"](https://webpack.js.org/guides/tree-shaking/) property to `false`, in `package.json` files (_all packages except `@aedart/vuepress-utils`_). 
* Adapted `lerna-json` for use with [Lerna-lite](https://github.com/lerna-lite/lerna-lite).

### Fixed

* `@aedart/contracts` dependency not specified in published `@aedart/support` package (_peer dependencies bump not supported by lerna_).
This has been fixed by migrating to [Lerna-lite](https://github.com/lerna-lite/lerna-lite) and explicit use of [`--allow-peer-dependencies-update` option](https://github.com/lerna-lite/lerna-lite/tree/main/packages/version#--allow-peer-dependencies-update) for
the version command (_configured in root `lerna.json`_).

## [0.4.0] - 2023-04-09

### Added

* `@aedart/support/misc` submodule, which contains `descTag()`, `empty()` and `isset()` methods.

### Changed

**Breaking Changes**

* `forgetAll()`, `hasAll()` and `hasAny()` now accepts rest parameters instead of an array of property paths, in `@aedart/support/object`.

**Non-breaking Changes**

* `@aedart/support/object`'s `isset()` now uses the `isset()` from `@aedart/support/misc`.

### Fixed

* `hasAll()` returns true when no paths given, in `@aedart/support/objects` submodule.
* Documentation code examples (_examples where marked to be TypeScript, but are written as plain JavaScript_).
* Navigation sidebar closes unexpectedly for support "objects" submodule, in documentation site.
* Unable to "build" packages when interdependent on other packages, due to applied settings in rollup typescript plugin. 

## [0.3.1] - 2023-04-07

### Fixed

* `@aedart/support/object`'s `isset()` method returns `true` when object argument is undefined, and when no paths argument given.

## [0.3.0] - 2023-04-06

### Added

* `@aedart/contracts` package, which is intended to define common types, interfaces and unique identifiers.
* `@aedart/support` package for various helpers and utilities. 
* Enabled eslint for TypeScript, which is now also run during CI tests.

### Changed

* `publish.sh` now runs lerna publish with `--force-publish` flag. 
* Improved the "packages" introduction (_again_).
* Improved description of `@aedart/vuepress-utils`.

### Fixed

* Various minor issues identified by eslint.

## [0.2.0] - 2023-03-29

### Added

* Enabled CI testing via GitHub Actions. Currently testing in Chrome and Firefox. 
* Troubleshooting section for npm installation of `@aedart/vuepress-utils`. 

### Changed

* Refactored location of "browser" tests. These are now located within the `tests/browser/*` directory.
* Firefox Headless is now also used when running tests.
* Improved the "packages" introduction.
* Reformatted the "how to install" section for `@aedart/vuepress-utils`.
* Commit message for lerna "version" command.

### Fixed

* Duplicate code in bundle output for submodules, when importing a function (_or anything for that matter_) from the "root" module of a package.

## [0.1.1] - 2023-03-25

### Fixed

* "homepage" URL in all `package.json` files.
* Links to documentation, in vuepress utils package's `README.md`.
* Version headings in `CHANGELOG.md`.

## [0.1.0] - 2023-03-25

### Added

* `@aedart/vuepress-utils` package, which includes an `Archive` component, a plugin to format "last updated" datetime, and other minor utilities. 
* `@aedart/xyz` package (_private, not published_) for testing various configurations, exports and features.
* `publish.sh` (_helper to publish to npm_).
* `deploy-docs.sh` (_ported and adapted from Athenaeum_).
* Version warning component in docs (_ported and adapted from Athenaeum_).
* Code of conduct, contribution guide and other "introduction" documents (_ported and adapted from Athenaeum_).
* Templates for issues, pull request, etc. (_ported and adapted from Athenaeum_).
* Vuepress documentation boilerplate.
* "Special" Rollup package bundling configuration (_tailored for this exporting multiple submodules_). 
* Typescript version `5.x`.
* Proposal decorators for when running browser tests.
* Browser tests setup using karma, webpack, and jasmine.
* Project init, lerna, directory structure, ...etc.

[Unreleased]: https://github.com/aedart/ion/compare/0.13.0...HEAD
[0.13.0]: https://github.com/aedart/ion/compare/0.12.1...0.13.0
[0.12.1]: https://github.com/aedart/ion/compare/0.12.0...0.12.1
[0.12.0]: https://github.com/aedart/ion/compare/0.11.0...0.12.0
[0.11.0]: https://github.com/aedart/ion/compare/0.10.0...0.11.0
[0.10.0]: https://github.com/aedart/ion/compare/0.9.0...0.10.0
[0.9.0]: https://github.com/aedart/ion/compare/0.8.0...0.9.0
[0.8.0]: https://github.com/aedart/ion/compare/0.7.0...0.8.0
[0.7.0]: https://github.com/aedart/ion/compare/0.6.1...0.7.0
[0.6.1]: https://github.com/aedart/ion/compare/0.6.0...0.6.1
[0.6.0]: https://github.com/aedart/ion/compare/0.5.0...0.6.0
[0.5.0]: https://github.com/aedart/ion/compare/0.4.0...0.5.0
[0.4.0]: https://github.com/aedart/ion/compare/0.3.1...0.4.0
[0.3.1]: https://github.com/aedart/ion/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/aedart/ion/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/aedart/ion/compare/0.1.1...0.2.0
[0.1.1]: https://github.com/aedart/ion/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/aedart/ion/releases/tag/0.1.0