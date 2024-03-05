---
title: Merge Keys
description: Merge keys into a single key.
sidebarDepth: 0
---

# `mergeKeys` <Badge type="tip" text="Available since v0.7" vertical="middle" />

The `mergeKeys()` method is able to merge two or more keys into a single key (_see [`isKey()`](./isKey.md)_).

```js
import { mergeKeys } from "@aedart/support/misc";

const key = mergeKeys(Symbol('my-symbol'), [ 'b', 'c.d' ], 23);

console.log(key); // [ Symbol('my-symbol'), 'b', 'c.d', 23 ];
```
