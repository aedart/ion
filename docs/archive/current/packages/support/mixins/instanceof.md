---
title: Instanceof
description: Using instanceof operator.
sidebarDepth: 0
---

# `instanceof` Operator

When you defined your mixins using the [`Mixin()` decorator function](./newMixin.md), then it will support `instanceof` checks.
Consider the following example:

```js
// A regular mixin without "Mixin" decorator 
const MixinA = (superclass) => class extends superclas {
    // ...not shown...
};

// Mixin with "Mixin" decorator
const MixinB = Mixin((superclass) => class extends superclass {
    // ...not shown...
});

// -------------------------------------------------------------------- //

class A {}

class B extends mix(A).with(
    MixinA,
    MixinB
) {}

// -------------------------------------------------------------------- //

const instance = new B();

console.log(instance instanceof A); // true
console.log(instance instanceof B); // true
console.log(instance instanceof MixinA); // false
console.log(instance instanceof MixinB); // true
```