---
title: Arrays
description: Array utilities.
sidebarDepth: 0
---

# Arrays <Badge type="tip" text="Available since v0.9" vertical="middle" />

`@aedart/support/arrays` contains [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) related utilities.

[[TOC]]

## `includesAll`

Determines if an array includes all values.

```js
import { includesAll } from '@aedart/support/arrays';

const arr = [ 1, 2, 3 ];

includesAll(arr, [ 1, 2 ]); // true
includesAll(arr, [ 1, 4 ]); // false
```

## `includesAny`

Determines if an array includes some values.

```js
import { includesAny } from '@aedart/support/arrays';

const arr = [ 1, 2, 3 ];

includesAll(arr, [ 4, 2 ]); // true
includesAll(arr, [ 5, 5 ]); // false
```

## `isArrayLike`

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

See also [_`isSafeArrayLike()`_](#issafearraylike).

## `isConcatSpreadable`

Determines if object contains the [well-known](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols)
symbol [`Symbol.isConcatSpreadable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable).

```js
import { isConcatSpreadable } from '@aedart/support/arrays';

isConcatSpreadable(null); // false
isConcatSpreadable([ 1, 2, 3 ]); // false
isConcatSpreadable({}); // false

// -------------------------------------------------------------------------

const arr = [ 1, 2, 3 ];
arr[Symbol.isConcatSpreadable] = true;
isConcatSpreadable(arr); // true

// -------------------------------------------------------------------------

const obj = {
    [Symbol.isConcatSpreadable]: true,

    // NOTE: length should be present, if Symbol.isConcatSpreadable
    // set to `true` However, isConcatSpreadable() does not check
    // if `length` is set!
    length: 3,
    0: 'a',
    1: 'b',
    2: 'c'
};
isConcatSpreadable(obj); // true

// ------------------------------------------------------------------------- 

class A {}
class B {
    [Symbol.isConcatSpreadable] = false;
}
isConcatSpreadable(new A()); // false
isConcatSpreadable(new B()); // true
```

## `isSafeArrayLike`

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

## `isTypedArray`

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

## `merge`

Merges arrays into a new array.
The function attempts to deep copy values, using [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone).

```js
import { merge } from '@aedart/support/arrays';

const a = [ 1, 2, 3 ];
const b = [ 4, 5, 6 ];
const c = [ 7, 8, 9 ];

merge(a, b, c); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

### Deep Copy Objects

Simple (_or "plain"_) objects are not shallow copied. This means that new object instances returned as the resulting array's values. 

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

### When unable to merge values

In situations when values cannot be copied via `structuredClone`, an `ArrayMergeError` is thrown.

```js
const a = [ 1, 2, 3 ];
const b = [ function() {} ]; // A function cannot be deep copied...

merge(a, b); // ArrayMergeError
```