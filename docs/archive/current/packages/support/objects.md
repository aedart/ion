---
title: Objects
description: Objects related utilities
sidebarDepth: 0
---

# Object Utility Methods

The `@aedart/support/objects` submodule offers object related utilities.

[[TOC]]

## `forget`

Remove (_delete_) a value in object at given path.
_Method is an alias for [Lodash `unset`](https://lodash.com/docs/4.17.15#unset)._

```js
import {forget} from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        c: {
            age: 24
        }
    },
};

forget(target, 'b.c');

console.log(target); // { a: 1234, b: {} }
```

## `forgetAll`

Remove (_deletes_) all values in object, at given paths.

```js
import {forgetAll} from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        c: {
            age: 24
        }
    },
};

forgetAll(target, [ 'a', 'b.c.age' ]);

console.log(target); // { b: { c: {} } }
```

## `get`

Get value in object at given path.
_Method is an alias for [Lodash `get`](https://lodash.com/docs/4.17.15#get)._

_See also [`set()`](#set)._

```js
import {get} from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        c: {
            age: 24
        }
    },
};

let age = get(target, 'b.c.age');
console.log(age); // 24
```

You can also specify a default value to be returned, if the resolved value is `undefined`.

```js
const target = {
    a: 1234,
    b: {
        c: {
            age: undefined
        }
    },
};

// Returns default value...
let age = get(target, 'b.c.age', 20);
console.log(age); // 20
```

## `has`

Determine if path is a property of given object.
_Method is an alias for [Lodash `hasIn`](https://lodash.com/docs/4.17.15#hasIn)._

_See also [`isset()`](#isset)._

```js
import {has} from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        c: {
            age: 24
        }
    },
};

let result = has(target, 'b.c.age');
console.log(result); // true
```

## `hasAll`

Determine if all paths are properties of given object.

_See also [`isset()`](#isset)._

```js
import {hasAll} from "@aedart/support/objects";

const mySymbol = Symbol('my-symbol');
const target = {
    a: 1234,
    b: {
        name: 'Sven',
        c: {
            age: 24,
            [mySymbol]: true
        }
    },
    d: [
        { name: 'Jane'},
        { name: 'Ashley'},
    ],
};

const paths = [
    'a',
    'b.name',
    'b.c.age',
    ['b', 'c', mySymbol],
    'd[0]',
    'd[1].name',
];

let result = hasAll(target, paths);
console.log(result); // true
```

## `hasAny`

Determine if any paths are properties of given object.

```js
import {hasAny} from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        name: 'Sven',
        c: {
            age: 24
        }
    }
};

const paths = [
    'z', // does not exist
    'b.c.name', // does not exist
    'b.c.age', // exist
];

let result = hasAny(target, paths);
console.log(result); // true
```

## `hasUniqueId` <Badge type="tip" text="Available since v0.6" vertical="middle" />

Determine if an object has a unique id.

_See [`uniqueId`](#uniqueid) for additional details._

```js
import {hasUniqueId} from "@aedart/support/objects";

const target = {
    name: 'Ursula'
};

console.log(hasUniqueId(target)); // false
```

## `isCloneable` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determines if given object is "cloneable".
In this context "cloneable" means that an object implements the `Cloneable` interface, and offers a `clone()` method.

_See `@aedart/constracts/support/objects/Cloneable` for details._

```js
import { isCloneable } from "@aedart/support/objects";

class A {};

class B {
    clone() {
        return new this();
    }
}

isCloneable(null); // false
isCloneable([]); // false
isCloneable({}); // false
isCloneable(new A()); // false
isCloneable(new B()); // true
```

## `isPopulatable` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determines if given object is "populatable".
Here, "populatable" means that an object implements the `Populatable` interface, and offers a `populate()` method.

_See `@aedart/constracts/support/objects/Populatable` for details._

```js
import { isPopulatable } from "@aedart/support/objects";

class A {};

class B {
    populate(data) {
        // ...not shown here...
        
        return this;
    }
}

isPopulatable(null); // false
isPopulatable([]); // false
isPopulatable({}); // false
isPopulatable(new A()); // false
isPopulatable(new B()); // true
```

## `isset`

Determine if paths are properties of given object and have values.
This method differs from [`has()`](#has), in that it only returns true if properties' values are not `undefined` and not `null`.

_See also [misc. `isset()`](./misc/README.md#isset)._

```js
import {isset} from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        name: undefined,
        c: {
            age: null
        }
    },
};

console.log(isset(target, 'a')); // true
console.log(isset(target, 'b')); // true
console.log(isset(target, 'b.name')); // false
console.log(isset(target, 'b.c')); // true
console.log(isset(target, 'b.c.age')); // false
```

You can also check if multiple paths are set.

```js
console.log(isset(target, 'a', 'b')); // true
console.log(isset(target, 'b.c', 'b.name')); // false
console.log(isset(target, 'a', 'b.name', 'b.c.age')); // false
```

## `populate` <Badge type="tip" text="Available since v0.9" vertical="middle" />

The `populate()` allows you to populate a target object's properties with those from a source object.
The values are [shallow copied](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy).
It accepts the following arguments:

* `target: object` 

* `source: object`

* `keys: PropertyKey | PropertyKey[] | SourceKeysCallback = '*'` - The keys to select and copy from `source` object. If wildcard (`*`) given, then all properties from the `source` are selected.
  If a callback is given, then that callback must return key or keys to select from `source`.

* `safe: boolean = true` - When `true`, properties must exist in target (_must be defined in target_), before they are shallow copied.

::: warning Caution
The `target` object is mutated by this function.
:::

::: tip Note
["Unsafe" properties](./reflections.md#iskeyunsafe) are disregarded, regardless of what `keys` are given.
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

### Limit keys to populate

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

### Source Keys Callback

If you need a more advanced way to determine what keys to populate, then you can specify a callback as the `keys` argument.

```js
populate(target, source, (source, target) => {
    if (Reflect.has(source, 'phone') && Reflect.has(target, 'phone')) {
        return [ 'name', 'age', 'phone' ];
    }

    return [ 'name', 'age' ];
});
```

### When keys do not exist

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

## `set`

Set a value in object at given path.
_Method is an alias for [Lodash `set`](https://lodash.com/docs/4.17.15#set)._

```js
import {set} from "@aedart/support/objects";

const target = {};

set(target, 'a.foo', 'bar');

console.log(target); // { a: { foo: 'bar } }
```

## `uniqueId` <Badge type="tip" text="Available since v0.6" vertical="middle" />

The `uniqueId()` is able to return a "unique¹" reference identifier for any given object.

```js
import {uniqueId, hasUniqueId} from "@aedart/support/objects";

const target = {
    name: 'Ursula'
};

console.log(uniqueId(target)); // 27

// ...later in your application
console.log(hasUniqueId(target)); // true
console.log(uniqueId(target)); // 27
```

The source code is heavily inspired by [Nicolas Gehlert's](https://github.com/ngehlert) blog post: ["_Get object reference IDs in JavaScript/TypeScript_" (September 28, 2022)](https://developapa.com/object-ids/)

¹: _In this context, the returned number is unique in the current session. The number will NOT be unique across multiple sessions, nor guarantee that an object will receive the exact same identifier as in a previous session!_