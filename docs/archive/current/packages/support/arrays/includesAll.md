---
title: Includes All
description: Determine if array contains all values.
sidebarDepth: 0
---

# `includesAll`

Determines if an array includes all values.

```js
import { includesAll } from '@aedart/support/arrays';

const arr = [ 1, 2, 3 ];

includesAll(arr, [ 1, 2 ]); // true
includesAll(arr, [ 1, 4 ]); // false
```
