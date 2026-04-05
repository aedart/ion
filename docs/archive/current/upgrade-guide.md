---
description: Ion Upgrade Guide
sidebarDepth: 1
---

# Upgrade Guide

[[TOC]]

## From v0.10.x- to v0.13.x

### Vuepress Utils

The `@aedart/vuepress-utils` has been upgraded to require the latest version of `vuepress` (_`^2.0.0-rc.15` release candidate_).
This has affected various arguments and return types in the navigation utilities, such as `Archive` and `PagesCollection`.

The changes _should not_ directly affect your documentation application directly, when used as described. However,
if you have your own implementation of the `Archive` or `PagesCollection` interfaces (_in TypeScript_), or if you have
extended the default provided classes, then you might have to adapt expected argument and return types.

Please read [vuepress' changelog](https://github.com/vuepress/core/blob/main/CHANGELOG.md) and review the package's
source code for additional details.

## From v0.7.x- to v0.10.x

### Meta (types)

The following deprecated types have been removed (_deprecated in version `v0.7.0`_):

* `ClassContext`
* `MethodContext`
* `GetterContext`
* `SetterContext`
* `FieldContext`
* `AccessorContext`
* `MetadataContext`
* `MemberContext`

_More information available in the source code and `CHANGELOG.md`_

### Meta (`targetMeta()` and `inheritTargetMeta()`)

The util functions `targetMeta()` and `inheritTargetMeta()` now throw a `MetaError` instead of previous `TypeError`.
If you rely on `TypeError` as the type of exception being thrown in a try-catch statement, when decorating class members, then you should change it to `MetaError`. 

## From v0.6.x to v0.7.x

### Node.js 20.11.0 Required

Ion now requires [Node.js](https://nodejs.org) `v20.11.0` or greater.

### Meta

Various metadata related type definitions have now been deprecated in favour of TypeScript's own definitions. Mostly, this should not affect the implementation.
However, if your decorator(s) depend on the following types (_see below_), then you are strongly encouraged to use corresponding TypeScript defined types instead.

_Deprecated types and interfaces are defined in `@aedart/contracts/support/meta`:_

* `ClassContext`
* `MethodContext`
* `GetterContext`
* `SetterContext`
* `FieldContext`
* `AccessorContext`
* `MetadataContext`
* `MemberContext`

_More information available in the source code and `CHANGELOG.md`_

### Vuepress Utils

The `@aedart/vuepress-utils` has been upgraded to use vuepress `v2.0.0-rc.2`, meaning that you no longer should require to manually define your `vuepress` dependency, in your application's `packages.json` file.

**_:x: Previously_**

```json
{
    "devDependencies": {
        "@aedart/vuepress-utils": "^0.6.1",
        "vuepress": "2.0.0-beta.61",
        "@vuepress/core": "2.0.0-beta.61",
        "@vuepress/utils": "2.0.0-beta.61",
        "@vuepress/client": "2.0.0-beta.61"
    }   
}
```

**_:heavy_check_mark: Now_**

```json
{
    "devDependencies": {
        "@aedart/vuepress-utils": "^0.7.0"
    }   
}
```

Please read [vuepress' changelog](https://github.com/vuepress/core/blob/main/CHANGELOG.md) for additional details.

**Webpack Bundle**

In addition to the above, the `@aedart/vuepress-utils` automatically comes with `@vuepress/bundler-webpack` as its peed dependency.

## From v0.3.x to v0.4.x

### Rest Parameters for `forgetAll()`, `hasAll()` and `hasAny()`

`forgetAll()`, `hasAll()` and `hasAny()` (_in `@aedart/support/object` submodule_) now accept rest parameters instead of an array of paths.
If you are using these methods, then you need to upgrade or risk unexpected results.

**_:x: Previously_**

```js
import {
    forgetAll,
    hasAll,
    hasAny
} from "@aedart/support/objects";

hasAny(target, [ 'a', 'b.c.age' ]);
hasAll(target, [ 'a', 'b.c.age' ]);
forgetAll(target, [ 'a', 'b.c.age' ]);
```

**_:heavy_check_mark: Now_**

```js
hasAny(target, ...[ 'a', 'b.c.age' ]);
hasAll(target, ...[ 'a', 'b.c.age' ]);
forgetAll(target, ...[ 'a', 'b.c.age' ]);

// ...Or
hasAny(target, 'a', 'b.c.age');
hasAll(target, 'a', 'b.c.age');
forgetAll(target, 'a', 'b.c.age');
```

## Onward

More details can be found in the [changelog](https://github.com/aedart/ion/blob/main/CHANGELOG.md).
