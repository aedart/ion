---
title: Get All Parents Of Class
description: Get all parents of a class
sidebarDepth: 0
---

# `getAllParentsOfClass` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Returns all parents of target class.
It accepts the following arguments:

- `target: ConstructorOrAbstractConstructor` - The target class.
- `includeTarget: boolean = false` - (_optional_) If `true`, then given target is included in the output as the first element.

```js
import { getAllParentsOfClass } from '@aedart/support/reflections';

class A {}

class B extends A {}

class C extends B {}

getAllParentsOfClass(C); // [ B, A ]
getAllParentsOfClass(C, true); // [ C, B, A ]
```

_See also [`getParentOfClass()`](./getParentOfClass.md)._