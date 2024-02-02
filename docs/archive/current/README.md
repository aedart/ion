---
title: Release Notes
description: Ion Release Notes
sidebarDepth: 0
---

# Release Notes

::: danger
Ion is still in development.
You _SHOULD NOT_ use any of the packages in production.
Breaking changes _**MUST**_ be expected for all `v0.x` releases!

_Please review the [`CHANGELOG.md`](https://github.com/aedart/ion/blob/main/CHANGELOG.md) for additional details._
:::

[[toc]]

## Support Policy

| Version | TypeScript | ECMA Script | Release            | Security Fixes Until   |
|---------|------------|-------------|--------------------|------------------------|
| `1.x`   | `5.0 - ?`  | _TBD_       | _TBD_              | _TBD_                  |
| `0.x`*  | `5.0`      | `ES2022`    | _ongoing releases_ | _until `v1.x` release_ |

_*: current supported version._

_TBD: "To be decided"._

## `v0.x` Highlights

### "Target" Meta Decorator <Badge type="tip" text="Available since v0.7" />

Associate arbitrary metadata directly with the target element that is being decorated.
_See [target meta decorator](./packages/support/meta.md) fro additional details._

```js
import {targetMeta, getTargetMeta} from '@aedart/support/meta';

class Service {

    @targetMeta('desc', 'Seaches for cities')
    search() {
        // ...not shown...
    }
}

const instance = new Service();

// ...later in your application...
getTargetMeta(instance.search, 'desc'); // Seaches for cities
```

### Meta Decorator <Badge type="tip" text="Available since v0.6" />

The [meta decorator](./packages/support/meta.md) is able to associate arbitrary metadata with a class and its elements.

```js
import {meta, getMeta} from '@aedart/support/meta';

@meta('description', 'Able to search for locations')
class Service {}

getMeta(Service, 'description'); // Able to search for locations
```

### Support <Badge type="tip" text="Available since v0.3" />

A package intended to contain various helpers and utilities.
At the moment, the package comes with a few [object utilities](./packages/support/objects/README.md).
See [package documentation](./packages/support/README.md) for more details.

### Vuepress Utils <Badge type="tip" text="Available since v0.1" />

Utilities for vuepress sites, which includes an `Archive` component for structuring documentation into an archive.
See [package documentation](./packages/vuepress-utils/README.md) for details.
