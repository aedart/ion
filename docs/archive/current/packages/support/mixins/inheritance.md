---
title: Inheritance
description: How inheritance works.
sidebarDepth: 0
---

# How inheritance works

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
