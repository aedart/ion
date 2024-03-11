---
title: Has Method
description: Determine if target has method
sidebarDepth: 0
---

# `hasMethod` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determine if given target object contains method.

It accepts the following arguments:

- `target: object` - The target.
- `method: PropertyKey` - Name of the method to check for.

```js
import { hasMethod } from '@aedart/support/reflections';

const a = {
    foo: () => { /* ...not shown... */ },
    bar: () => { /* ...not shown... */ },
}

hasMethod(a, 'foo'); // true
hasMethod(a, 'bar'); // true
hasMethod(a, 'zar'); // false
```

See also [`isMethod()`](./isMethod.md).