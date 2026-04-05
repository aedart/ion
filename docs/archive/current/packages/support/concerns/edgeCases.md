---
title: Edge Cases
description: A few edge cases when making or using concerns
sidebarDepth: 0
---

# Edge Cases

[[TOC]]

## Getter & Setter declared in different concerns

It is not possible to define a property's getter and setter methods in separate concerns, and thereafter use them in 
a target class. Despite serving different purposes, the getter and setter share the same property name and are therefore
treated as being one and the same property key. The following example will therefore always lead to an
`AliasConflictError` being thrown.

```js
import { AbstractConcern, use } from "@aedart/support/concerns";

class A extends AbstractConcern {
    get title() { /* ...not shown.. */ }
}

class B extends AbstractConcern {
    set title(value) { /* ...not shown.. */ }
}

@use(
    A,
    B // AliasConflictError - "title" property from A!
)
class Person {}
```

You can resolve the above shown issue via a [custom alias](./conflictResolution.md#resolve-naming-conflicts). But, it is
advisable to design your concerns such that the offer appropriate getter and setter methods for a property, in one and
the same concern - _if you intend for such a property to be readable and writable._

## Inheritance vs. Concern members

The concerns mechanism will never overwrite existing methods or properties inside a target class - not even when those
methods or properties are inherited from a parent class.

```js
import { AbstractConcern, use } from "@aedart/support/concerns";

class Connection extends AbstractConcern {
    driver() {
        return 'special';
    }
}

class Api {
    driver() {
        return 'default';
    }
}

@user(Connection) // driver() is NOT aliased - method inherited from Api class!
class SailBoat extends Api {}

const instance = new SailBoat();
instance.driver(); // default
```

The only way to resolve the above shown issue, is by making use of a [custom alias](./conflictResolution.md#resolve-naming-conflicts)
and manually overwrite the inherited method. E.g.

```js
import { AbstractConcern, use } from "@aedart/support/concerns";

class Connection extends AbstractConcern {
    driver() {
        return 'special';
    }
}

class Api {
    driver() {
        return 'default';
    }
}

@user(
    [Connection, {
        'driver': 'specialDriver' // alias "driver" as "specialDriver"
    }]
)
class SailBoat extends Api {
    
    // Overwrite inherited method
    driver() {
        // Invoke the "specialDriver"... 
        return this.specialDriver();
    }
}

const instance = new SailBoat();
instance.driver(); // special
```

## Concerns using other concerns

A concern can use other concerns classes. However, depending on your complexity, doing so may impact performance.
Consider the following example:

```js
import { AbstractConcern, use } from "@aedart/support/concerns";

class Ping extends AbstractConcern {
    ping() {
        return 'ping';
    }
}

@use(Ping)
class Pong extends AbstractConcern {
    pong() {
        return 'pong';
    }
}

@use(Pong)
class Game {}

const instance = new Game();

instance.ping(); // ping
instance.pong(); // pong
```

In the above shown example, whenever the `ping()` method is invoked, the call stack will be similar to the following:

```
Game (instance).ping() -> Pong (instance).ping() -> Ping (instance).ping()

("->" represents concerns container instance)
```

In some isolated cases, this might be acceptable for you. Nevertheless, if your application makes heavy use of concerns
using other concerns, then your application's overall performance could suffer. You should consider merging multiple
concern classes into a single class, if it is reasonable and possible. Alternatively, you can also consider extending
existing concern classes. For instance:

```js
import { AbstractConcern, use } from "@aedart/support/concerns";

class Ping extends AbstractConcern {
    ping() {
        return 'ping';
    }
}

// Extend Ping concern...
class Pong extends Ping {
    pong() {
        return 'pong';
    }
}

@use(Pong)
class Game {}

const instance = new Game();

instance.ping(); // ping
instance.pong(); // pong
```

Now, whenever the `ping()` method is invoked, the call stack is slightly reduced:

```
Game (instance).ping() -> Pong (instance).ping()

("->" represents concerns container instance)
```