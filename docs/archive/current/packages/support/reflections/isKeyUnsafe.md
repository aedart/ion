---
title: Is Key Unsafe
description: Determine if a property key is unsafe.
sidebarDepth: 0
---

# `isKeyUnsafe` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determines if a property key is considered "unsafe".

```js
import { isKeyUnsafe } from '@aedart/support/reflections';

isKeyUnsafe('name'); // false
isKeyUnsafe('length'); // false
isKeyUnsafe('constructor'); // false
isKeyUnsafe('__proto__'); // true
```

::: tip Note
Behind the scene, the `isKeyUnsafe()` function matches the given key against values from the predefined `DANGEROUS_PROPERTIES` list,
which is defined in the `@aedart/contracts/support/objects` submodule;

```js
import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";
```
:::