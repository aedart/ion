---
title: Is Property Key
description: Determine if key is a valid property key name.
sidebarDepth: 0
---

# `isPropertyKey` <Badge type="tip" text="Available since v0.7" vertical="middle" />

Determine if a key a valid property key name (_string, number, or symbol_).

```js
import { isPropertyKey } from '@aedart/support/misc';

isPropertyKey('foo'); // true
isPropertyKey(12); // true
isPropertyKey(Symbol('my-symbol')); // true

isPropertyKey(true); // false
isPropertyKey(['a', 'b', 'c']); // false
isPropertyKey(null); // false
isPropertyKey(undefined); // false
isPropertyKey(() => true); // false
```
