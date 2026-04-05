---
title: Get Class Prop. Descriptors
description: Get all property descriptors of target class.
sidebarDepth: 0
---

# `getClassPropertyDescriptors` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Returns all property [`descriptors`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor) that are defined target's prototype.

It accepts the following arguments:

- `target: ConstructorOrAbstractConstructor` - The target class.
- `recursive: boolean = false` - (_optional_) If `true`, then target's parent prototypes are traversed. Descriptors are merged, such that the top-most class' descriptors are returned.

```js
import { getClassPropertyDescriptors } from '@aedart/support/reflections';

class A {
    set name(v) {}
    get name() {}
    bar() {}
    [MY_SYMBOL]() {}
}

getClassPropertyDescriptors(A); // { bar: {...}, name: {...}, [MY_SYMBOL]: {...} }
```

When `recursive` is set to `true`, then all property descriptors are returned from the target class' prototype chain.

```js
import { getClassPropertyDescriptors } from '@aedart/support/reflections';

class A {
    set name(v) {}
    get name() {}
    foo() {}
    [MY_SYMBOL]() {}
}

class B extends A {
    set bar(v) {}
    get bar() {}
}

getClassPropertyDescriptors(B, true);
// { bar: {...}, foo: {...}, name: {...}, [MY_SYMBOL]: {...} }
```

::: warning Caution
`getClassPropertyDescriptors()` throws `TypeError` if target does not have a `prototype` property.
:::