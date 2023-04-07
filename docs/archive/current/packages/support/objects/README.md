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

## `isset`

Determine if paths are properties of given object and have values.
This method differs from [`has()`](#has), in that it only returns true if properties' values are not `undefined` and not `null`.

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

## `set`

Set a value in object at given path.
_Method is an alias for [Lodash `set`](https://lodash.com/docs/4.17.15#set)._

```js
import {set} from "@aedart/support/objects";

const target = {};

set(target, 'a.foo', 'bar');

console.log(target); // { a: { foo: 'bar } }
```