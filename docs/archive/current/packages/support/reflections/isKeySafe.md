---
title: Is Key Safe
description: Determine if a property key is safe.
sidebarDepth: 0
---

## `isKeySafe` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Opposite of [`isKeyUnsafe()`](./isKeyUnsafe.md).

```js
import { isKeySafe } from '@aedart/support/reflections';

isKeySafe('name'); // true
isKeySafe('length'); // true
isKeySafe('constructor'); // true
isKeySafe('__proto__'); // false
```