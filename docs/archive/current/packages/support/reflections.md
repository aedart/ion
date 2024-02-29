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

## `isKeyUnsafe` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determines if a property key is considered "unsafe".

```js
import { isKeyUnsafe } from '@aedart/support/reflections';

isKeyUnsafe('name'); // true
isKeyUnsafe('length'); // true
isKeyUnsafe('constructor'); // true
isKeyUnsafe('__proto__'); // false
```

::: tip Note
Behind the scene, the `isKeyUnsafe()` function matches the given key against values from the predefined `DANGEROUS_PROPERTIES` list,
which is defined in the `@aedart/contracts/support/objects` submodule;

```js
import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";
```
:::