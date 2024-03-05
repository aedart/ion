---
title: Isset
description: Determine if object object paths are set and have values.
sidebarDepth: 0
---

# `isset`

Determine if paths are properties of given object and have values.
This method differs from [`has()`](./has.md), in that it only returns true if properties' values are not `undefined` and not `null`.

_See also [misc. `isset()`](../misc/isset.md)._

```js
import { isset } from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        name: undefined,
        c: {
            age: null
        }
    },
};

console.log(isset(target, 'a')); // true
console.log(isset(target, 'b')); // true
console.log(isset(target, 'b.name')); // false
console.log(isset(target, 'b.c')); // true
console.log(isset(target, 'b.c.age')); // false
```

You can also check if multiple paths are set.

```js
console.log(isset(target, 'a', 'b')); // true
console.log(isset(target, 'b.c', 'b.name')); // false
console.log(isset(target, 'a', 'b.name', 'b.c.age')); // false
```
