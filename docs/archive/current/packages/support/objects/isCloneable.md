---
title: Is Cloneable
description: Determine if object is cloneable.
sidebarDepth: 0
---

# `isCloneable` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determines if given object is "cloneable".
In this context "cloneable" means that an object implements the `Cloneable` interface, and offers a `clone()` method.

_See `@aedart/constracts/support/objects/Cloneable` for details._

```js
import { isCloneable } from "@aedart/support/objects";

class A {};

class B {
    clone() {
        return new this();
    }
}

isCloneable(null); // false
isCloneable([]); // false
isCloneable({}); // false
isCloneable(new A()); // false
isCloneable(new B()); // true
```
