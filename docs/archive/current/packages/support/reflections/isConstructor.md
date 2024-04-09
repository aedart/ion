---
title: Is Constructor
description: Determine if value is a constructor.
sidebarDepth: 0
---

# `isConstructor`

Based on the [TC39 `Function.isCallable() / Function.isConstructor()`](https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md) proposal, the `isConstructor()` can determine if value is a constructor.

```js
import { isConstructor } from "@aedart/support/reflections";

isConstructor(null); // false
isConstructor({}); // false
isConstructor([]); // false
isConstructor(() => {}); // false

isConstructor(function() {}); // true
isConstructor(class {}); // true

// Built-in objects
isConstructor(Array); // true
isConstructor(String); // true
isConstructor(Number); // true
isConstructor(Date); // true
isConstructor(Map); // true
isConstructor(Set); // true
// ...etc
```

**Acknowledgement**

The source code of the above shown methods is heavily inspired by Denis Pushkarev's Core-js implementation of the [Function.isCallable / Function.isConstructor](https://github.com/zloirock/core-js#function-iscallable-isconstructor-) proposal (_License MIT_).

See also [`isClassConstructor()`](./isClassConstructor.md).