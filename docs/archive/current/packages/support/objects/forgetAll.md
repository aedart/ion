---
title: Forget All
description: Forget object all keys
sidebarDepth: 0
---

# `forgetAll`

Remove (_deletes_) all values in object, at given paths.

```js
import { forgetAll } from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        c: {
            age: 24
        }
    },
};

forgetAll(target, [ 'a', 'b.c.age' ]);

console.log(target); // { b: { c: {} } }
```