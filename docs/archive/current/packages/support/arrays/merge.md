---
title: Merge
description: Merge multiple arrays into a new array.
sidebarDepth: 0
---

# `merge`

[[TOC]]

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

Simple (_or "plain"_) objects are [deep copied](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy).
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

_See [merge options](#merge-options) for details on how to deal with functions._

## Merge Options <Badge type="tip" text="Available since v0.11" vertical="middle" />

`merge()` supports a number of options. To specify thom, use the `using()` method.

```js
merge()
    .using({ /** option: value */ })
    .of(arrayA, arrayB, arrayC);
```

::: tip Note
When invoking `merge()` without any arguments, an underlying array `Merger` instance is returned.
:::

### `transferFunctions`

By default, functions are not transferred (_not copied_). When encountered an `ArrayMergeError` is thrown, because
the underlying [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone) is not able to
duplicate functions. To change this behaviour, you can set the `transferFunctions` setting to `true`. Function are then
"transferred" into the resulting array.

```js
const foo = () => true;
const bar = () => false;

merge()
    .using({ transferFunctions: true })
    .of([ foo ], [ bar ]) // [ foo, bar ]
```

### `callback`

If you require more advanced duplication logic of the array values, then you can specify a callback that can process and
return the value in question.

```js
const a = [ 1, 2 ];
const b = [ 3, 4 ];

const result = merge()
    .using({
        callback: (element, index, array, options) => {
            return element * 2;
        }
    })
    .of(a, b); // [ 2, 4, 6, 8 ]
```

#### Arguments

* `element: any` The current element being processed in the array.
* `index: number` The index of the current element being processed in the array.
* `array: any[]` The concatenated array this callback was called upon.
* `options: Readonly<ArrayMergeOptions>` The merge options to be applied.