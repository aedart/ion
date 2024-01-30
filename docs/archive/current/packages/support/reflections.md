---
title: Reflections
description: Reflection utilities
sidebarDepth: 0
---

# Reflections <Badge type="tip" text="Available since v0.7" vertical="middle" />

The `@aedart/support/reflections` submodule offers a few reflection related utilities. 

[[TOC]]

## `isConstructor`

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
