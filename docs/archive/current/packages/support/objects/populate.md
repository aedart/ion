---
title: Populate
description: Populate target object.
sidebarDepth: 0
---

# `populate` <Badge type="tip" text="Available since v0.9" vertical="middle" />

The `populate()` allows you to populate a target object's properties with those from a source object.
The values are [shallow copied](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy).

[[TOC]]

## Arguments

`populate()` accepts the following arguments:

* `target: object`

* `source: object`

* `keys: PropertyKey | PropertyKey[] | SourceKeysCallback = '*'` - The keys to select and copy from `source` object. If wildcard (`*`) given, then all properties from the `source` are selected.
  If a callback is given, then that callback must return key or keys to select from `source`.

* `safe: boolean = true` - When `true`, properties must exist in target (_must be defined in target_), before they are shallow copied.

::: warning Caution
The `target` object is mutated by this function.
:::

::: tip Note
["Unsafe" properties](../reflections/isKeyUnsafe.md) are disregarded, regardless of what `keys` are given.
:::

```js
import { populate } from "@aedart/support/objects";

class Person {
    name = null;
    age = null;

    constructor(data) {
        populate(this, data);
    }
}

const instance = new Person({ name: 'Janine', age: 36 });
instance.name // Janine
instance.age // 36
```

## Limit keys to populate

By default, all keys (_`*`_) from the `source` object are attempted populated into the `target`.
You can limit what properties can be populated, by specifying what keys are allowed to be populated.

```js
class Person {
    name = null;
    age = null;
    phone = null;

    constructor(data) {
        populate(this, data, [ 'name', 'age' ]);
    }
}

const instance = new Person({ name: 'Janine', age: 36, phone: '555 555 555' });
instance.name // Janine
instance.age // 36
instance.phone // null
```

## Source Keys Callback

If you need a more advanced way to determine what keys to populate, then you can specify a callback as the `keys` argument.

```js
populate(target, source, (source, target) => {
    if (Reflect.has(source, 'phone') && Reflect.has(target, 'phone')) {
        return [ 'name', 'age', 'phone' ];
    }

    return [ 'name', 'age' ];
});
```

## When keys do not exist

When the `safe` argument is set to `true` (_default behavior_), and a property key does not exist in the `target` object,
then a `TypeError` is thrown.

```js
class Person {
    name = null;
    age = null;

    constructor(data) {
        populate(this, data, [ 'name', 'age', 'phone' ]);
    }
}

const instance = new Person({
    name: 'Janine',
    age: 36,
    phone: '555 555 555'
}); // TypeError - phone does not exist in target 
```

However, if a requested key does not exist in the source object, then a `TypeError` is thrown regardless of the `safe` argument value.

```js
class Person {
    name = null;
    age = null;

    constructor(data) {
        populate(this, data, [ 'name', 'age', 'phone' ], false);
    }
}

const instance = new Person({
    name: 'Janine',
    age: 36
}); // TypeError - phone does not exist in source 
```
