---
title: Get Parent Of Class
description: Get parent class.
sidebarDepth: 0
---

# `getParentOfClass` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Returns the parent class of given target class, or `null` if class does not have a parent.

```js
import { getParentOfClass } from '@aedart/support/reflections';

class A {}

class B extends A {}

class C extends B {}

getParentOfClass(A); // null
getParentOfClass(B); // A
getParentOfClass(C); // B
```

_See also [`getAllParentsOfClass()`](./getAllParentsOfClass.md)._