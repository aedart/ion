---
title: Get
description: Get object value from given path.
sidebarDepth: 0
---

# `get`

Get value in object at given path.
_Method is an alias for [Lodash `get`](https://lodash.com/docs/4.17.15#get)._

_See also [`set()`](./set.md)._

```js
import { get } from "@aedart/support/objects";

const target = {
    a: 1234,
    b: {
        c: {
            age: 24
        }
    },
};

let age = get(target, 'b.c.age');
console.log(age); // 24
```

## Default Value

You can also specify a default value to be returned, if the resolved value is `undefined`.

```js
const target = {
    a: 1234,
    b: {
        c: {
            age: undefined
        }
    },
};

// Returns default value...
let age = get(target, 'b.c.age', 20);
console.log(age); // 20
```
