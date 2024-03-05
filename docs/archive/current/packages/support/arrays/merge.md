---
title: Merge
description: Merge multiple arrays into a new array.
sidebarDepth: 0
---

# `merge`

Merges arrays into a new array.
This function attempts to deep copy values, using [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone).

```js
import { merge } from '@aedart/support/arrays';

const a = [ 1, 2, 3 ];
const b = [ 4, 5, 6 ];
const c = [ 7, 8, 9 ];

merge(a, b, c); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## Deep Copy Objects

Simple (_or "plain"_) objects [deep copied](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy).
This means that new objects are returned in the resulting array.

See [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm) for additional
information about what data types are supported.

```js
const a = { foo: 'foo' };
const b = { bar: 'bar' };
const c = { ping: 'pong' };

const result = merge([ a ], [ b, c ]);

console.log(result[0] === a); // false
console.log(result[1] === b); // false
console.log(result[2] === c); // false
```

## When unable to merge values

In situations when values cannot be copied via `structuredClone`, an `ArrayMergeError` is thrown.

```js
const a = [ 1, 2, 3 ];
const b = [ function() {} ]; // A function cannot be deep copied...

merge(a, b); // ArrayMergeError
```