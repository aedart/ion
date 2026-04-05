---
title: Is Primitive
description: Determine if value is a primitive.
sidebarDepth: 0
---

# `isPrimitive`

Determine if a value is a [primitive value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values).

```js
import { isPrimitive } from '@aedart/support/misc';

isPrimitive(null); // true
isPrimitive(undefined); // true
isPrimitive(true); // true
isPrimitive(1); // true
isPrimitive(1n); // true
isPrimitive('foo'); // true
isPrimitive(Symbol('my-symbol')); // true

isPrimitive([1, 2, 3]); // false
isPrimitive({ name: 'Rian' }); // false
isPrimitive(function() {}); // false
```