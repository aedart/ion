---
title: Misc.
description: Misc. utilities
sidebarDepth: 0
---

# Misc. <Badge type="tip" text="Available since v0.4" vertical="middle" />

`@aedart/support/misc` offers miscellaneous utility methods.

[[TOC]]

## `empty`

Determine if value is empty.

_See also [`isset()`](#isset)._

```js
import {empty} from '@aedart/support/misc';

empty(''); // true
empty(false); // true
empty(0); // true
empty(0n); // true
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