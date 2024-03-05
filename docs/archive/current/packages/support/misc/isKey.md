---
title: Is Key
description: Determine if is a key or path identifier
sidebarDepth: 0
---

# `isKey` <Badge type="tip" text="Available since v0.7" vertical="middle" />

Determine if given is a valid [key](./isPropertyKey.md) or [property path identifier](../objects/has.md).

```js
import { isKey } from '@aedart/support/misc';

isKey('foo'); // true
isKey(12); // true
isKey(Symbol('my-symbol')); // true
isKey([ 'a', 'b.c', Symbol('my-other-symbol')]); // true

isKey(true); // false
isKey([]); // false
isKey(null); // false
isKey(undefined); // false
isKey(() => true); // false
```
