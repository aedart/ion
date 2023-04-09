---
description: Ion Upgrade Guide
sidebarDepth: 1
---

# Upgrade Guide

[[TOC]]

## From version 0.3.x to 0.4.x

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
