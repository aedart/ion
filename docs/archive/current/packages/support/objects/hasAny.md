---
title: Has Any
description: Determine if any object paths are properties.
sidebarDepth: 0
---

# `hasAny`

Determine if any paths are properties of given object.

```js
import { hasAny } from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        name: 'Sven',
        c: {
            age: 24
        }
    }
};

const paths = [
    'z', // does not exist
    'b.c.name', // does not exist
    'b.c.age', // exist
];

let result = hasAny(target, paths);
console.log(result); // true
```