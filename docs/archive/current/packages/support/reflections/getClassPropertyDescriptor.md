---
title: Get Class Prop. Descriptor
description: Get property descriptor of target class property.
sidebarDepth: 0
---

# `getClassPropertyDescriptor` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Returns [`PropertyDescriptor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/getOwnPropertyDescriptor),
from target's prototype that matches given property key.

It accepts the following arguments:

- `target: ConstructorOrAbstractConstructor` - The target class.
- `key: PropertyKey` - Name of the property.

```js
import { getClassPropertyDescriptor } from '@aedart/support/reflections';

class A {
    set name(v) {}
    get name() {}
}

getClassPropertyDescriptor(A, 'name'); // see "output"...
```

The above show example results in the given output:

```js
const output = {
    get: function () { /* ...Not shown... */ },
    set: function (v) { /* ..Not shown... */ },
    enumerable: false,
    configurable: true
};
```

::: tip Note
`getClassPropertyDescriptor()` returns `undefined` if requested key does not exist in class' prototype. 
:::

::: warning Caution
`getClassPropertyDescriptor()` throws `TypeError` if target does not have a `prototype` property. 
:::