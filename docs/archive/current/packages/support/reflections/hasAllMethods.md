---
title: Has All Methods
description: Determine if target has all methods
sidebarDepth: 0
---

# `hasAllMethods` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determine if given target object contains all given methods.

It accepts the following arguments:

- `target: object` - The target.
- `...methods: PropertyKey[]` - Names of the methods to check for.

```js
import { hasAllMethods } from '@aedart/support/reflections';

const a = {
    foo: () => { /* ...not shown... */ },
    bar: () => { /* ...not shown... */ },
}

hasAllMethods(a, 'foo', 'bar'); // true
hasAllMethods(a, 'foo', 'bar', 'zar'); // false
```