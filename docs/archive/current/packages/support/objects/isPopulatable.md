---
title: Is Populatable
description: Determine if object is populatable.
sidebarDepth: 0
---

# `isPopulatable` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determines if given object is "populatable".
Here, "populatable" means that an object implements the `Populatable` interface, and offers a `populate()` method.

_See `@aedart/constracts/support/objects/Populatable` for details._

```js
import { isPopulatable } from "@aedart/support/objects";

class A {};

class B {
    populate(data) {
        // ...not shown here...
        
        return this;
    }
}

isPopulatable(null); // false
isPopulatable([]); // false
isPopulatable({}); // false
isPopulatable(new A()); // false
isPopulatable(new B()); // true
```