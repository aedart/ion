---
title: Is Typed Array
description: Determine if object is a typed array.
sidebarDepth: 0
---

# `isTypedArray`

Determines if target is an instance of a [`TypedArray`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray).

```js
import { isTypedArray } from '@aedart/support/arrays';

isTypedArray(null); // false
isTypedArray({}); // false
isTypedArray([]); // false
isTypedArray(new Map()); // false

isTypedArray(new Int8Array()); // true
isTypedArray(new Uint8Array()); // true
isTypedArray(new Uint8ClampedArray()); // true
isTypedArray(new Int16Array()); // true
isTypedArray(new Uint16Array()); // true
isTypedArray(new Int32Array()); // true
isTypedArray(new Uint32Array()); // true
isTypedArray(new Float32Array()); // true
isTypedArray(new Float64Array()); // true
isTypedArray(new BigInt64Array()); // true
isTypedArray(new BigUint64Array()); // true
```