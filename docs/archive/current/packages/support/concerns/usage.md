---
title: Using Concerns
description: How to use concerns.
sidebarDepth: 0
---

# How to use Concerns

[[TOC]]

## Using Concerns

The [class decorator](https://github.com/tc39/proposal-decorators) `use()` is used to inject one or more concern classes into a target class. 

```js
import { use } from "@aedart/support/concerns";

@use(
    ApiConnection,
    Serialization,
    Collections
)
class Flight {}
```

When concern classes are injected, the target class is transformed and all concerns are made available inside a private `CONCERNS` property.
See [Manual interaction](#manual-interaction) and [Aliases](./aliases.md) for additional details.

## Inheritance

All concerns that are used by a parent class are automatically available (_inherited_), by child classes.

```js
@use(
    ApiConnection,
    Serialization,
    Collections
)
class ApiService {}

class Flight extends ApiService {} // Uses ApiConnection, Serialization, ...etc
```

::: warning

A concern class may _**ONLY**_ occur once in a target class' prototype chain.
An `InjectionError` is thrown, if this is violated!

```js
@use(
    ApiConnection,
    Serialization,
    Collections
)
class ApiService {}

@use(Serialization) // InjectionError
class Flight extends ApiService {}
```

See also [Conflict Resolution](./conflictResolution.md) for additional details.
:::

## Manual interaction

When concerns are injected into a target, they are defined inside a "Concerns Container", which is available in the target instance via the `CONCERNS` symbol. 
Should you require to perform more advanced interaction with a concern class instance, then you can obtain a concern instance via the container's `get()` method.
It will automatically ensure to [boot](./booting.md) a concern, if not already booted.

```js
import {
    use,
    CONCERNS,
    AbstractConcern
} from "@aedart/support/concerns";

class Encryption extends AbstractConcern {
    encrypt(value) { /* ...not shown... */ }
}

@use(Encryption)
class CookieStore {
    constructor() {
        const container = this[CONCERNS];
        const value = container.get(Encryption).encrypt('Lorum lipsum');
        
        // ...remaining not shown...
    }
}
```

You can achieve the same result by using the `getContainer()` utility method.

```js
import { use, getContainer } from "@aedart/support/concerns";

// ...Encryption concern not shown...

@use(Encryption)
class CookieStore {
    constructor() {
        const value = getContainer(this)
            .get(Encryption)
            .encrypt('Lorum lipsum');
        
        // ...remaining not shown...
    }
}
```

::: details CONCERNS symbol, getContainer(), and getConcernsContainer()

There are 3 ways to obtain the concerns container instance:

**A) `CONCERNS` symbol**

Inside your target class, if you know that concerns are used (_if target is a "concern owner"_),
then you can use the `CONCERNS` symbol to gain access to the container.

```js
import { CONCERNS } from "@aedart/support/concerns";

// Inside your target class...
const container = this[CONCERNS];
```

**B) `getContainer()`**

`getContainer()` is essentially a just a wrapper for: `return this[CONCERNS]`.

```js
import { getContainer } from "@aedart/support/concerns";

// Inside your target class...
const container = getContainer(this);
```

**C) `getConcernsContainer()`**

The `getConcernsContainer()` achieves the same result as the previous shown methods. However, it does perform a
check of the provided target instance, which ensures that it is a "concern owner".
If the target does not pass this test, then a `TypeError` is thrown.
This might can be useful in situations when you might now know if the target is a concern owner, e.g. when situated
in a child class or outside a target class.

```js
import { getConcernsContainer } from "@aedart/support/concerns";

// Inside your target class...
const container = getConcernsContainer(this);
```
:::

### Determine if target uses concerns

To determine if a target uses one or more concerns, use the `usesConcerns()` method.
It accepts the following arguments:

- `instance: object|Owner` - The target class instance.
- `...concerns: ConcernConstructor[]` - Concern classes to test for.

```js
import {
    use,
    AbstractConcern,
    usesConcerns
} from "@aedart/support/concerns";

class A extends AbstractConcern {}
class B extends AbstractConcern {}
class C extends AbstractConcern {}

@use(
    A,
    B
)
class Game {}

const instance = new Game();

usesConcerns(instance, A); // true
usesConcerns(instance, B); // true
usesConcerns(instance, A, B); // true

usesConcerns(instance, C); // false
usesConcerns(instance, A, C); // false
usesConcerns(instance, B, C); // false
usesConcerns(instance, A, B, C); // false
```