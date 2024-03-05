---
title: Is Subclass Or Looks Like
description: Determine if target is a subclass of another class, or looks like blueprint
sidebarDepth: 0
---

# `isSubclassOrLooksLike` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determine if target class is a subclass of given superclass, or if it looks like given blueprint.

It accepts the following arguments:

- `target: object` - The target.
- `superclass: ConstructorOrAbstractConstructor` - The superclass.
- `blueprint: ClassBlueprint` - Class Blueprint (_See [`classLooksLike`](./classLooksLike.md#class-blueprint)_).

```js
import { isSubclassOrLooksLike } from '@aedart/support/reflections';

class A {
    foo() {}
}
class B extends A {}

class C {
    foo() {}
}

isSubclassOrLooksLike(B, A, { members: [] }); // true
isSubclassOrLooksLike(C, A, { members: [] }); // false
isSubclassOrLooksLike(C, A, { members: [ 'foo' ] }); // true
```

_See [`isSubclass()`](./isSubclass.md) and [`classLooksLike()`](./classLooksLike.md) for additional details._