---
title: New Mixin
description: How to defined a new Mixin class.
sidebarDepth: 0
---

# Define a new Mixin

You can use the `Mixin` decorator to define a new mixin.
Amongst other things, the decorator will enable support for [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) checks.
See [`instanceof` Operator](./instanceof.md) for additional information.

```js
import { Mixin } from "@aedart/support/mixins";

export const RectangleMixin = Mixin((superclass) => class extends superclass {
    length = 0
    width = 0;
    
    area() {
        return this.length * this.width;
    }
});
```

## Constructor

If you need to perform initialisation logic in your mixins, then you can do so by implementing a class [`constructor`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor).
When doing so, it is important to invoke the parent constructor via [`super()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) and pass on eventual arguments.

```js
import { Mixin } from "@aedart/support/mixins";

export const RectangleMixin = Mixin((superclass) => class extends superclass {
    
    constructor(...args) {
        super(...args); // Invoke parent constructor and pass on arugments!
        
        // Perform your initialisaiton logic...
    }
    
    // ...remaining not shown...
});
```