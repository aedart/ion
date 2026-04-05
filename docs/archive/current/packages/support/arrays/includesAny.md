---
title: Includes Any
description: Determine if array contains some values.
sidebarDepth: 0
---

# `includesAny`

Determines if an array includes some values.

```js
import { includesAny } from '@aedart/support/arrays';

const arr = [ 1, 2, 3 ];

includesAll(arr, [ 4, 2 ]); // true
includesAll(arr, [ 5, 5 ]); // false
```