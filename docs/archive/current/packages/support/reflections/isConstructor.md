---
title: Is Constructor
description: Determine if value is a constructor.
sidebarDepth: 0
---

# `isConstructor`

Based on the [TC39 `Function.isCallable() / Function.isConstructor()`](https://github.com/caitp/TC39-Proposals/blob/trunk/tc39-reflect-isconstructor-iscallable.md) proposal, the `isConstructor()` can determine if given argument is a constructor.

```js{6,8-9}
import { isConstructor } from "@aedart/support/reflections";

isConstructor(null); // false
isConstructor({}); // false
isConstructor([]); // false
isConstructor(function() {}); // true
isConstructor(() => {}); // false
isConstructor(Array); // true
isConstructor(class {}); // true
```

**Acknowledgement**

The source code of the above shown methods is heavily inspired by Denis Pushkarev's Core-js implementation of the [Function.isCallable / Function.isConstructor](https://github.com/zloirock/core-js#function-iscallable-isconstructor-) proposal (_License MIT_).

See also [`isClassConstructor()`](./isClassConstructor.md).