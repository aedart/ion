---
title: Apply Mixins
description: How to apply mixins.
sidebarDepth: 0
---

# Applying Mixins

To apply one or more mixins, use the `mix()` function and call `width()` with the mixins you wish to apply to a superclass.

```js
import { mix } from "@aedart/support/mixins";
import {
    RectangleMixin,
    DescMixin
} from "@acme/mixins";

class Box extends mix().with(
    RectangleMixin,
    DescMixin
) {
    // ...remaining not shown...
}
```

## Extending Superclass

To extend a superclass and apply mixins onto it, pass the superclass as argument for the `mix()` function.

```js
class Shape {
    // ...not shown...
}

class Box extends mix(Shape).with(
    RectangleMixin,
    DescMixin
) {
    // ...remaining not shown...
}
```

::: tip Note
By default, if you do not provide `mix()` with a superclass, an empty class is automatically created.
It is the equivalent of the following:

```js
class Box extends mix(class {}).with(
    MyMixinA,
    MyMixinB,
    MyMixinC,
) {
    // ...
}
```
:::