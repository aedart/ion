---
title: Is Concat Spreadable
description: Determine if object is concat spreadable.
sidebarDepth: 0
---

# `isConcatSpreadable`

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