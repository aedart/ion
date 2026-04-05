---
title: Is Class Constructor
description: Determine if value is a class constructor.
sidebarDepth: 0
---

# `isClassConstructor` <Badge type="tip" text="Available since v0.7" vertical="middle" />

The `isClassConstructor()` is able to determine if a value is a class constructor.

::: warning Caution
`isClassConstructor()` will only be able to return `true` for classes that are defined using the `class` keyword. See [ES6 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) for additional information.
:::

::: warning Built-in Classes
This util is **NOT** able to detect [built-in classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects).
Use [`isConstructor()`](./isConstructor.md) if you wish to test for "constructable" functions / classes, including built-in classes.
:::

```js
import { isClassConstructor } from "@aedart/support/reflections";

isClassConstructor(null); // false
isClassConstructor({}); // false
isClassConstructor([]); // false
isClassConstructor(function() {}); // false
isClassConstructor(() => {}); // false
isClassConstructor(Array); // false

class A {}
isClassConstructor(A); // true
isClassConstructor(class {}); // true
```

**Acknowledgement**

The source code of the above shown methods is heavily inspired by Denis Pushkarev's Core-js implementation of the [Function.isCallable / Function.isConstructor](https://github.com/zloirock/core-js#function-iscallable-isconstructor-) proposal (_License MIT_).

See also [`isConstructor()`](./isConstructor.md).
