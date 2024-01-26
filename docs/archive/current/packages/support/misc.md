---
title: Misc.
description: Misc. utilities
sidebarDepth: 0
---

# Misc. <Badge type="tip" text="Available since v0.4" vertical="middle" />

`@aedart/support/misc` offers miscellaneous utility methods.

[[TOC]]

## `descTag`

Return the default string description of an object.

```js
import {descTag} from '@aedart/support/misc';

descTag('foo'); // [object String]
descTag(3); // [object Number]
descTag([1, 2, 3]); // [object Array]
descTag(true); // [object Boolean]
// ... etc
```

The method is a shorthand for the following:

```js
Object.prototype.toString.call(/* your value */);
```

See [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) for additional information.


## `empty`

Determine if value is empty.

_See also [`isset()`](#isset)._

```js
import {empty} from '@aedart/support/misc';

empty(''); // true
empty(false); // true
empty(0); // true
empty(0n); // true
empty(NaN); // true
empty(null); // true
empty(undefined); // true
empty([]); // true
empty({}); // true
empty(new Set()); // true
empty(new Map()); // true
empty(new Int8Array()); // true

empty(' '); // false
empty('a'); // false
empty(true); // false
empty(1); // false
empty(1n); // false
empty(-1); // false
empty(Infinity); // false
empty([ 1 ]); // false
empty({ name: 'Jimmy' }); // false
empty((new Set()).add('a')); // false
empty((new Map).set('foo', 'bar')); // false
empty(new Date()); // false
empty(function() {}); // false
empty(Symbol('my-symbol')); // false

let typedArr = new Int8Array(1);
typedArr[0] = 1;
empty(typedArr); // false
```

::: warning WeakMap and WeakSet
`empty()` is not able to determine if a [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) or [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) is empty.
:::

## `isPrimitive`

Determine if a value is a [primitive value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values).

```js
import {isPrimitive} from '@aedart/support/misc';

isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive(true); // true
isPrimitive(1); // true
isPrimitive(1n); // true
isPrimitive('foo'); // true
isPrimitive(Symbol('my-symbol')); // true

isPrimitive([1, 2, 3]); // false
isPrimitive({ name: 'Rian' }); // false
isPrimitive(function() {}); // false
```

## `isset`

Determine if value is different from `undefined` and `null`.

_See also [`empty()`](#empty)._

```js
import {isset} from '@aedart/support/misc';

isset('foo'); // true
isset(''); // true
isset(true); // true
isset(false); // true
isset(1234); // true
isset(1.234); // true
isset([]); // true
isset({}); // true
isset(() => true); // true

isset(undefined); // false
isset(null); // false
```

You can also determine if multiple values differ from `undefined` and `null`.

**Note**: _All given values must differ from `undefined` and `null`, before method returns `true`._

```js
isset('foo', { name: 'Jane' }, [ 1, 2, 3 ]); // true

isset('foo', null, [ 1, 2, 3 ]); // false
isset('foo', { name: 'Jane' }, undefined); // false
```

## `toWeakRef` <Badge type="tip" text="Available since v0.7" vertical="middle" />

Wraps a target object into a [`WeakRef`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef), if not already instance of a weak reference.

```js
import { toWeakRef } from "@aedart/support/misc";

const person = { name: 'Sine' };

const a = toWeakRef(person); // new WeakRef of "person"
const b = toWeakRef(a); // same WeakRef instance as "a"

toWeakRef(null); // undefined
toWeakRef(undefined); // undefined
```