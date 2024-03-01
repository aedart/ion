---
title: Set
description: Set value in object path.
sidebarDepth: 0
---

# `set`

Set a value in object at given path.
_Method is an alias for [Lodash `set`](https://lodash.com/docs/4.17.15#set)._

```js
import { set } from "@aedart/support/objects";

const target = {};

set(target, 'a.foo', 'bar');

console.log(target); // { a: { foo: 'bar } }
```