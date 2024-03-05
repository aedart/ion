---
title: Concern Class
description: How to define a new concern class.
sidebarDepth: 0
---

# Concern Class

This chapter shows how to create a new concern class.

[[TOC]]

## Inherit from `AbstractConcern`

To create a new concern class, you can inherit from the `AbstractConcern` class.

```js
import { AbstractConcern } from "@aedart/support/concerns";

class MyConcern extends AbstractConcern {
    
    get message() { /* ...not shown */ }
    set message(message) { /* ...not shown */ }
    
    foo() { /* ...not shown */ }
    
    [MY_SYMBOL]() { /* ...not shown */ }
}
```

By default, all the public properties and methods (_all property keys_) are made available for ["aliasing"](./aliases.md) into a target class.
To configure which members should be made available for aliasing, see [Customise "alias" members](#customise-alias-members).

### Private Members

::: warning Note
Private methods and properties are **NEVER** "aliased" into a target class.    
:::

### Static Members

::: warning Note
Static methods and properties are **NOT** "aliased" into target class.

_At the moment, such a feature is not supported by the concerns' mechanism._
_This may become available in the future, but presently you SHOULD NOT rely on static members becoming available for aliasing._
:::

### Transpilers

::: warning Caution
Some transpilers, like [Babel](https://babeljs.io/) and [TypeScript](https://www.typescriptlang.org/), automatically move property declarations into the class' `constructor`.
For instance:

```js
class A {
    foo = 'bar';
}
```

becomes like the following, after it has been transpiled:

```js
class A {
    constructor() {
        this.foo = 'bar';
    }
}
```


When this happens, properties cannot be "aliased". The concern mechanisms relies on the class' prototype for reading
what properties are available. To overcome such an issue, you can use [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) and [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) instead.

```js
class A {
    #foo = 'bar';
    
    get foo() {
        return this.#foo
    }

    set foo(v) {
        this.#foo = v;
    }
}
```

:::

## Customise "alias" members

If you wish to customise what properties and methods _should_ be available for [aliasing](./aliases.md) when used by a
target class, overwrite the static `PROVIDES` method.

```js
import { AbstractConcern, PROVIDES } from "@aedart/support/concerns";

class MyConcern extends AbstractConcern {
    
    get message() { /* ...not shown */ }
    set message(message) { /* ...not shown */ }
    foo() { /* ...not shown */ }
    [MY_SYMBOL]() { /* ...not shown */ }
    
    static [PROVIDES]() {
        // Make "message" and "foo" available for aliasing...
        return [
            'message',
            'foo'
        ];
    }
}
```

::: warning
Even if you do customise what properties and methods are available for aliasing, the returned property keys of the
`PROVIDES` method can be overruled, via [conflict resolution](./conflictResolution.md)!

If you truly wish to prevent certain properties or methods from being aliased into a target class, then you _should_
declare them as [private](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties).
:::

## Concern Owner instance

The `concernOwner` property gives you direct access to the target class instance, in your concern.
This allows you to create interaction between the target instance and your concern, which can be usefully in any
number of situations. For instance, you can use the `concernOwner` to create a [fluent design](https://en.wikipedia.org/wiki/Fluent_interface) of your utilities.

```js
class ConcernsPeople extends AbstractConcern {
    with(value) {
        // ...not shown here...

        return this.concernOwner;
    }
}

@use(ConcernsPeople)
class Invitation {
    invite() { /* ...not shown here... */ }
}

const party = new Invitation();
party
    .with('Anna')
    .with('Anders')
    .with('Ulla')
    .with('Jimmy')
    .invite();
```

## Constructor

Should you require initialisation logic, then you can overwrite the `constructor` in your concern class.
A concern's constructor is only given the target class instance as argument.

_See [booting](./booting.md) for additional information._

```js
class Recording extends AbstractConcern {
    constructor(owner) {
        super(owner);
        
        // ...perform your initialisation here...
    }
}
```
