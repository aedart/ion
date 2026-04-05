---
title: Has Prototype Property
description: Determine if "prototype" property exists.
sidebarDepth: 0
---

# `hasPrototypeProperty` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determines if object has a `prototype` property defined and that it is not `null` or `undefined`.

```js
import { hasPrototypeProperty } from '@aedart/support/reflections';

hasPrototypeProperty(null); // false
hasPrototypeProperty(Object.create(null)); // false
hasPrototypeProperty({ __proto__: undefined }); // false
hasPrototypeProperty({ prototype: null }); // false
hasPrototypeProperty(() => true); // false

hasPrototypeProperty(Object.create({ prototype: {} })); // true
hasPrototypeProperty({ __proto__: function() {} }); // true
hasPrototypeProperty(function() {}); // true
hasPrototypeProperty(class {}); // true
```
