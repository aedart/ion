# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

* Troubleshooting section for npm installation of `@aedart/vuepress-utils`. 

### Changed

* Improved the "packages" introduction.
* Reformatted the "how to install" section for `@aedart/vuepress-utils`.
* Commit message for lerna "version" command.

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

[Unreleased]: https://github.com/aedart/ion/compare/0.1.1...HEAD
[0.1.1]: https://github.com/aedart/ion/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/aedart/ion/releases/tag/0.1.0