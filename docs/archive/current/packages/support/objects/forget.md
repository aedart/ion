---
title: Forget
description: Forget object key
sidebarDepth: 0
---

# `forget`

Remove (_delete_) a value in object at given path.
_Method is an alias for [Lodash `unset`](https://lodash.com/docs/4.17.15#unset)._

```js
import { forget } from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        c: {
            age: 24
        }
    },
};

forget(target, 'b.c');

console.log(target); // { a: 1234, b: {} }
```