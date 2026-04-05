---
title: Assert Has Prototype Prop.
description: Assert that object has a "prototype" property.
sidebarDepth: 0
---

# `assertHasPrototypeProperty` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Assert that given target object has a `prototype` property defined.
Throws a `TypeError` if target object does not have a  `prototype` property

_See [`hasPrototypeProperty`](./hasPrototypeProperty.md) for details._

```js
import { assertHasPrototypeProperty } from '@aedart/support/reflections';

assertHasPrototypeProperty({ __proto__: null }); // TypeError
```
