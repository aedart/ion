---
title: Is Safe Array Like
description: Determine if value is "safe" array-like.
sidebarDepth: 0
---

# `isSafeArrayLike`

Determines if value is "safe" [array-like](#isarraylike) object.
In this context "safe" means that value is not a string, not an instance of [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String) object,
and not a [Typed Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) object.

```js
import { isSafeArrayLike } from '@aedart/support/arrays';

isSafeArrayLike([]); // true
isSafeArrayLike({ length: 0 }); // true

isSafeArrayLike('abc'); // false
isSafeArrayLike(new String('abc')); // false
isSafeArrayLike(new Int8Array()); // false
// ...etc
```