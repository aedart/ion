---
title: Is Class Method Reference
description: Determine if value is a class method reference
sidebarDepth: 0
---

# `isClassMethodReference` <Badge type="tip" text="Available since v0.11" vertical="middle" />

Determine if value is a "_class method reference_".
A class method reference is an `array` with two values:

- `0 = Constructor | object` Target class constructor or class instance
- `1 = PropertyKey` Name of method (_property key in target_).

```js
import { isClassMethodReference } from '@aedart/support/reflections';

class A {
    age = 23;
    
    foo: () => { /* ...not shown... */ }
}

const instance = new A();

isClassMethodReference([ A, 'age' ]); // false
isClassMethodReference([ instance, 'age' ]); // false

isClassMethodReference([ A, 'foo' ]); // true
isClassMethodReference([ instance, 'foo' ]); // true
```