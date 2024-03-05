---
title: Aliases
description: What are aliases
sidebarDepth: 0
---

# Aliases

In this context, an "alias" is a proxy property or method inside a target class.
It is responsible for forwarding interaction to the original property or method, inside the concern class instance.
Aliases are created automatically by the `use()` class decorator.

[[TOC]]

## Properties & Methods

When injecting a concern into a target class, the concern's public properties and methods are defined as "aliases"
(_aka. proxy properties or methods_), in the target class' prototype (_see [`PROVIDES` symbol](./concernClass.md#customise-alias-members) for additional details_).

Consider the following example:

```js
import { use, AbstractConcern } from "@aedart/support/concerns";

class Levels extends AbstractConcern {
    get level() { /* ...not shown */ }
    set level(value) { /* ...not shown */ }
    clear() { /* ...not shown */ }
}

@use(Levels)
class Recorder {}
```

The aliasing mechanism will transform the target class into something that _**very roughly**_ corresponds to this:

```js
import {
    use,
    CONCERNS,
    AbstractConcern
} from "@aedart/support/concerns";

class Levels extends AbstractConcern {
    get level() { /* ...not shown */ }
    set level(value) { /* ...not shown */ }
    clear(level) { /* ...not shown */ }
}

class Recorder {
    // ...private concerns container not shown...

    // get level "alias"
    get level() {
        return this[CONCERNS].get(Levels)['level'];
    }

    // set level "alias"
    set level(value) {
        this[CONCERNS].get(Levels)['level'] = value;
    }

    // method clear "alias"
    clear(...args) {
        return this[CONCERNS].get(Levels)['clear'](...args);
    }
}
```

See [Manual interaction](./usage.md#manual-interaction) and [Conflict Resolution](./conflictResolution.md) for additional details.

## If property or method already exists

When a property or method from a concern already exists in the target class' prototype chain¹, then **NO Alias** is
defined. Said differently, the `use()` class decorator does **NOT** overwrite a target class' properties or methods.

```js
class Label extends AbstractConcern {
    get name() { /* ...not shown.. */ }
    set name(v) { /* ...not shown.. */ }
}

@use(Label) // Label's "name" property is NOT aliased
class Battery {

    // Battery's get/set "name" remains untouched by concern
    get name() { /* ...not shown.. */ }
    set name(v) { /* ...not shown.. */ }
}
```

¹: _Inherited properties and methods are also respected._

See [Conflict Resolution](./conflictResolution.md) for additional details.