# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* `Key`, `PropertyKey`, and `Primitive` types in contracts.
* `when()` which allows building a match expression that can be evaluated, in `@aedart/support`.
* `ObjectId` helper that can generate/obtain a numeric ID for a target object, in `@aedart/support`.
* Cleanup script for removing leftover `*.d.ts` files in source dirs.

### Changed

* Methods in `@aedart/support/objects` now use the new `Key` type (_previously used Lodash's `PropertyKey` type_).
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

[Unreleased]: https://github.com/aedart/ion/compare/0.5.0...HEAD
[0.5.0]: https://github.com/aedart/ion/compare/0.4.0...0.5.0
[0.4.0]: https://github.com/aedart/ion/compare/0.3.1...0.4.0
[0.3.1]: https://github.com/aedart/ion/compare/0.3.0...0.3.1
[0.3.0]: https://github.com/aedart/ion/compare/0.2.0...0.3.0
[0.2.0]: https://github.com/aedart/ion/compare/0.1.1...0.2.0
[0.1.1]: https://github.com/aedart/ion/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/aedart/ion/releases/tag/0.1.0