---
title: Has
description: Determine if object path is a property.
sidebarDepth: 0
---

# `has`

Determine if path is a property of given object.
_Method is an alias for [Lodash `hasIn`](https://lodash.com/docs/4.17.15#hasIn)._

_See also [`isset()`](./isset.md)._

```js
import { has } from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        c: {
            age: 24
        }
    },
};

let result = has(target, 'b.c.age');
console.log(result); // true
```
