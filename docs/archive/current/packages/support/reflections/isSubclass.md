---
title: Is Subclass
description: Determine if target is a subclass of another class.
sidebarDepth: 0
---

# `isSubclass` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determine if target class is a subclass (_child class_) of given superclass (_parent class_).

It accepts the following arguments:

- `target: object` - The target.
- `superclass: ConstructorOrAbstractConstructor` - The superclass.

```js
import { isSubclass } from '@aedart/support/reflections';

class A {}

class B extends A {}

isSubclass({}, A); // false
isSubclass(A, A); // false
isSubclass(A, B); // false

isSubclass(B, A); // true
```