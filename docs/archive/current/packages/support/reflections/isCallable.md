---
title: Is Callable
description: Determine if value is callable.
sidebarDepth: 0
---

# `isCallable` <Badge type="tip" text="Available since v0.7" vertical="middle" />

Determine if a value is "callable" - a function that is not a [class constructor](./isClassConstructor.md).

```js
import { isCallable } from "@aedart/support/reflections";

isCallable(null); // false
isCallable({}); // false
isCallable([]); // false
isCallable(class {}); // false

isCallable(function() {}); // true
isCallable(() => {}); // true
isCallable(Array); // true

```

**Acknowledgement**

The source code of the above shown methods is heavily inspired by Denis Pushkarev's Core-js implementation of the [Function.isCallable / Function.isConstructor](https://github.com/zloirock/core-js#function-iscallable-isconstructor-) proposal (_License MIT_).

See also [`isClassConstructor()`](./isClassConstructor.md).