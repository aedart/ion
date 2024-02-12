---
title: Mixins
description: Abstract subclasses ("Mixins") utilities
sidebarDepth: 0
---

# Mixins <Badge type="tip" text="Available since v0.8" vertical="middle" />

`@aedart/support/mixins` offers an adaptation of [Justin Fagnani's](https://justinfagnani.com/author/justinfagnani/)
[`mixwith.js`](https://github.com/justinfagnani/mixwith.js) package (_originally licensed under [Apache License 2.0](https://github.com/justinfagnani/mixwith.js?tab=Apache-2.0-1-ov-file#readme)_).

```js
import { mix, Mixin } from "@aedart/support/mixins";

// Define mixin
const NameMixin = Mixin((superclass) => class extends superclass {

    #name;
    
    set name(value) {
        this.#name = value;
    }
    
    get name() {
        return this.#name;
    }
});

// Apply mixin...
class Item extends mix().with(
    NameMixin
) {
    // ...not shown...    
}

// ...Later in your application
const item = new Item();
item.name = 'My Item';

console.log(item.name); // My Item
```

[[TOC]]

## Define Mixin

You can use the `Mixin` decorator to define a new mixin. 
Amongst other things, the decorator will enable support for [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) checks. 
See [`instanceof` Operator](#instanceof-operator) for additional information.

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

### Constructor

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

## Applying Mixins

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

### Extending Superclass

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

## `instanceof` Operator

When you defined your mixins using the [`Mixin()` decorator function](#define-mixin), then it will support `instanceof` checks.
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

## How inheritance works

To gain an overview of how inheritance works when applying mixins onto a superclass, consider the following example: 

```js
const MyMixin = Mixin((superclass) => class extends superclass {
    constructor(...args) {
        super(...args); // Invokes A's constructor
    }
    
    // Overwrites A's foo() method
    foo() {
        return 'zam';
    }

    // Overwrites A's bar() method
    bar() {
        return super.bar(); // Invoke A's bar() method
    }
});

// -------------------------------------------------------------------- //

class A {
    foo() {
        return 'foo';
    }
    
    bar() {
        return 'bar';
    }
}

// -------------------------------------------------------------------- //

class B extends mix(A).with(
    MyMixin
) {
    constructor(...args) {
        super(...args); // Invokes MyMixin's constructor
    }

    // Overwrite MyMixin's foo()
    foo() {
        const msg = super.foo(); // Invoke MyMixin's bar() method

        return `<${msg}>`;
    }
}

// -------------------------------------------------------------------- //

const instance = new B();

console.log(instance.foo()); // <zam>
console.log(instance.bar()); // bar
```

## Onward

For more information and examples, please read Mozilla's documentation about [_"Mix-ins"_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins),
and Justin Fagnani's blog posts:

* [_"Real" Mixins with JavaScript Classes_](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/)
* [_Enhancing Mixins with Decorator Functions_](https://justinfagnani.com/2016/01/07/enhancing-mixins-with-decorator-functions/)