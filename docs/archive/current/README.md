---
title: Release Notes
description: Ion Release Notes
sidebarDepth: 0
---

# Release Notes

::: danger
Ion is still in development.
You _SHOULD NOT_ use any of the packages in a production environment.
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

### Service Container <Badge type="tip" text="Available since v0.11" />

An adaptation of Laravel's Service Container that offers a way to with powerful tool to manage dependencies and perform
dependency injection.

```js
import { Container } from "@aedart/container";

container.bind('storage', () => {
    return new CloudService('s3');
});

// Later in your application.
const storage = container.make('storage');
```

For additional examples, see the [Service Container documentation](./packages/container/README.md).

### Facades  <Badge type="tip" text="Available since v0.11" />

Adaptation of Laravel's Facade component. It acts as an interface or gateway to an underlying object that is resolved
from the Service Container.

```js
import { Facade } from "@aedart/support/facades";

export default class ApiFacade extends Facade
{
    static getIdentifier()
    {
        return 'api_client';
    }
}

// Later in your application
const promise = ApiFacade.obtain().fetch('https://acme.com/api/users');
```

See the [Facades documentation](./packages/support/facades/README.md) for additional details.

### Concerns <Badge type="tip" text="Available since v0.9" />

Intended as an alternative to mixins, the [Concerns](./packages/support/concerns/README.md) submodule offers a different
way to overcome some of the limitations of single inheritance.

```js
import { use, AbstractConcern } from "@aedart/support/concerns";

// A concern class...
class Role extends AbstractConcern {
    addRole(name) {
        /* ...not shown... */
    }
}

// Use concern in target class...
@use(Role)
class User {}

// Later in your application...
const user = new User();
user.addRole('maintainer');
user.addRole('supporter');
```

### Merge <Badge type="tip" text="Available since v0.9" />

Objects [merge](./packages/support/objects/merge.md) utility, using [deep copy](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy).

```js
import { merge } from "@aedart/support/objects";

const a = {
    'name': 'Alin',
};

const b = {
    'address': {
        'street': 'Northern Street 1'
    },
};

const result = merge(a, b); // { 'name': 'Alin', 'address': { 'street': '...' } }
```

### Mixins <Badge type="tip" text="Available since v0.8" />

Adaptation of Justin Fagnani's [`mixwith.js`](https://github.com/justinfagnani/mixwith.js).

```js
import { mix, Mixin } from "@aedart/support/mixins";

const NameMixin = Mixin((superclass) => class extends superclass {
    #name;
    
    set name(value) {
        this.#name = value;
    }
    
    get name() {
        return this.#name;
    }
});

class Item extends mix().with(
    NameMixin
) {}

// ...Later in your application
const item = new Item();
item.name = 'My Item';

console.log(item.name); // My Item
```

See details and more examples in the [`@aedart/support/mixins` documentation](./packages/support/mixins/README.md).

### "Target" Meta Decorator <Badge type="tip" text="Available since v0.7" />

Associate arbitrary metadata directly with the target element that is being decorated.
_See [target meta decorator](./packages/support/meta/targetMeta.md) fro additional details._

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

The [meta decorator](./packages/support/meta/README.md) is able to associate arbitrary metadata with a class and its elements.

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
