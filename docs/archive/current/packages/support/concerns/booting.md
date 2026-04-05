---
title: Booting
description: How concerns are booted
sidebarDepth: 0
---

# Booting

By default, a concern class is _ONLY_ instantiated when you interact with its properties or methods, which have been "aliased"
into a target class (_aka. [lazy booting](https://en.wikipedia.org/wiki/Lazy_initialization)_).

```js
class ContactsApi extends AbstractConcern {
    get users() { /* ...not shown here... */}
}

@use(ContactsApi) // Concern is NOT instantiated
class UsersRegistry {}

const users = (new UsersRegistry()).users; // Concern is instantiated
```

## Manual Booting

You can use the `bootConcerns()` utility to manually boot concerns.
It accepts the following arguments:

- `instance: object|Owner` - The target class instance that uses the concerns.
- `...concerns: ConcernConstructor[]` - List of concern classes to instantiate (_aka. boot_).

```js
import { use, bootConcerns } from "@aedart/support/concerns";

@use(
    ConcernA,
    ConcernB,
    ConcernC,
)
class Target {
    constructor() {
        bootConcerns(this, ConcernA, ConcernB);
    }
}

const instance = new Target(); // ConcernA and ConcernB are instantiated
```

::: warning
If you attempt to boot a concern that has already been booted, a `BootError` will be thrown!

To determine if a concern has already been booted, use the concern container's `hasBooted()` method.

```js
import {
    getContainer,
    bootConcerns
} from "@aedart/support/concerns";

class Record extends ApiService {
    constructor() {
        super();
        
        if (!getContainer(this).hasBooted(ApiConnection)) {
            bootConcerns(this, ApiConnection);
        }
    }
}
```

See [Manual interaction](./usage.md#manual-interaction) for details.

:::

### Boot All Concerns

If you wish to boot all concerns, use the `bootAllConcerns()` utility.

```js
import { use, bootAllConcerns } from "@aedart/support/concerns";

@use(
    ConcernA,
    ConcernB,
    ConcernC,
)
class Target {
    constructor() {
        bootAllConcerns(this);
    }
}

const instance = new Target(); // All concerns are initialised
```