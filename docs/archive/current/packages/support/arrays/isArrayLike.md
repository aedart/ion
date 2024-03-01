---
title: Is Array Like
description: Determine if value is array-like.
sidebarDepth: 0
---

# `isArrayLike`

Determines if a value is ["array-like"](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#array-like_objects).

(_`isArrayLike()` is an alias for Lodash's [isArrayLike](https://lodash.com/docs/4.17.15#isArrayLike)._)

```js
import { isArrayLike } from '@aedart/support/arrays';

isArrayLike([]); // true
isArrayLike('abc'); // true
isArrayLike(new String('abc')); // true
isArrayLike({ length: 0 }); // true
isArrayLike(new Int8Array()); // true

isArrayLike({}); // false
isArrayLike(function() {}); // false
isArrayLike(new Boolean(true)); // false
isArrayLike(123); // false
isArrayLike(new Number(123)); // false
// ...etc
```

See also [_`isSafeArrayLike()`_](./issafearraylike.md).