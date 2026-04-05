---
title: Class Own Keys
description: Get property keys of target class.
sidebarDepth: 0
---

# `classOwnKeys` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Returns property keys that are defined target class's prototype.
It accepts the following arguments:

- `target: ConstructorOrAbstractConstructor` - The target class 
- `recursive: boolean = false` - (_optional_) If `true`, then target's prototype chain is traversed and all property keys are returned.

```js
import { classOwnKeys } from '@aedart/support/reflections';

class A {
    foo() {}
}

class B extends A {
    get bar() {}
}

classOwnKeys(B); // [ 'constructor', 'bar' ]
classOwnKeys(B, true); // [ 'constructor', 'foo', 'bar' ]
```

::: warning Caution
`classOwnKeys()` throws `TypeError` if target does not have a `prototype` property.
:::

## Limitation

The `classOwnKeys()` function does not return static members of a target class.
