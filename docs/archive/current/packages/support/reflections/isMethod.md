---
title: Is Method
description: Determine if property is a method in target
sidebarDepth: 0
---

# `isMethod` <Badge type="tip" text="Available since v0.11" vertical="middle" />

Determine if property (_name_) is a method in given target object.

It accepts the following arguments:

- `target: object` - The target.
- `property: PropertyKey` - Name of property.

```js
import { isMethod } from '@aedart/support/reflections';

class A {
    age = 23;
    
    #title = 'AAA';
    get title() {
        return this.#title;
    }

    #job = 'AAA';
    set job(v) {
        this.#job = v; 
    }

    foo: () => { /* ...not shown... */ }
}

const a = new A();

isMethod(a, 'age'); // false
isMethod(a, 'title'); // false
isMethod(a, 'job'); // false
isMethod(a, 'foo'); // true
```

See also [`hasMethod()`](./hasMethod.md).