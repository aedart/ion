---
title: Empty
description: Determine if value is empty
sidebarDepth: 0
---

# `empty`

Determine if value is empty.

_See also [`isset()`](./isset.md)._

```js
import { empty } from '@aedart/support/misc';

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

## WeakMap and WeakSet

::: warning Caution
`empty()` is not able to determine if a [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) or [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet) is empty.
:::
