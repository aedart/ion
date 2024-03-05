---
title: Has All
description: Determine if all object paths are properties.
sidebarDepth: 0
---

# `hasAll`

Determine if all paths are properties of given object.

_See also [`isset()`](./isset.md)._

```js
import { hasAll } from "@aedart/support/objects";

const mySymbol = Symbol('my-symbol');
const target = {
    a: 1234,
    b: {
        name: 'Sven',
        c: {
            age: 24,
            [mySymbol]: true
        }
    },
    d: [
        { name: 'Jane'},
        { name: 'Ashley'},
    ],
};

const paths = [
    'a',
    'b.name',
    'b.c.age',
    ['b', 'c', mySymbol],
    'd[0]',
    'd[1].name',
];

let result = hasAll(target, paths);
console.log(result); // true
```
