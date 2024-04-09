---
title: Callback Wrapper
description: Wrapper object for a callback
sidebarDepth: 0
---

# Callback Wrapper <Badge type="tip" text="Available since v0.11" vertical="middle" />

The `CallbackWrapper` objects offers a convenient way to wrap a callable function.

```js
import { CallbackWrapper } from "@aedart/support";

const wrapped = CallbackWrapper.make(() => {
    return 'Hi there...';
});

// Later in your application
wrapped.call(); // Hi there...
```

[[TOC]]

## Call

The `call()` method invokes the wrapped callback and returns its eventual output.

```js
const wrapped = CallbackWrapper.make(() => {
    return true;
});

wrapped.call(); // true
```

## Arguments

There are several ways to specify arguments that must be applied for the wrapped callback, when `call()` is invoked.  

### Via `make()`

The static `make()` method allows you to specify arguments right away.
This is useful, if you already know the arguments.

```js
const wrapped = CallbackWrapper.make((firstname, lastname) => {
    return `Hi ${firstname} ${lastname}`;
}, 'Timmy', 'Jackson');

wrapped.call(); // Hi Timmy Jackson
```

### Via `with()`

In situations when you must add additional arguments, e.g. because you might not know all arguments up front, then you
can use the `with()` method.

```js
const wrapped = CallbackWrapper.make((firstname, lastname) => {
    return `Hi ${firstname} ${lastname}`;
}, 'Siw');

wrapped
    .with('Orion')
    .call(); // Hi Siw Orion
```

### Via `arguments`

Lastly, in situations when you must completely overwrite all arguments, then you can specify them via the `arguments`
property.

```js
const wrapped = CallbackWrapper.make((firstname, lastname) => {
    return `Hi ${firstname} ${lastname}`;
});

wrapped.arguments = [ 'Alpha', 'Zero' ];
wrapped
    .call(); // Hi Alpha Zero
```

## Binding

Use `bind()` to specify the callback's [`this` value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

```js
class A {
    sayHi(name) {
        return `Hi ${name}`;
    }
}
const instance = new A();

const wrapped = CallbackWrapper.make(function(name) {
    return this.sayHi(name);
});

wrapped
    .bind(instance)
    .with('Akari')
    .call(); // Hi Akari
```

### Binding vs. Arrow Function

::: warning
It is not possible to apply a binding on an arrow function callback. Doing so can result in a `TypeError` or other unexpected behaviour.
See [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for additional information.

**_:x:_**

```js
// Callback Wrapper for arrow function...
const wrapped = CallbackWrapper.make(() => {
    // ...not shown ...
});

wrapped
    .bind(myObject)
    .call(); // TypeError
```

**_:heavy_check_mark:_**

```js
// Callback Wrapper for normal function...
const wrapped = CallbackWrapper.make(function () {
    // ...not shown ...
});

wrapped
    .bind(myObject)
    .call();
```
:::

## Misc.

If you need to determine if a value is a "callback wrapper" object, then you can use the `isCallbackWrapper()` util.

```js
import { isCallbackWrapper, CallbackWrapper } from "@aedart/support";

isCallbackWrapper(() => true); // false
isCallbackWrapper(CallbackWrapper.make(() => true)); // true
```

### Custom Callback Wrapper

`isCallbackWrapper()` can also accept custom implementation of a callback wrapper.

```js
// Custom implementation of a callback wrapper
const custom = {
    'callback': function() { /* not shown */ },
    'binding': undefined,
    'arguments': [],
    'with': function() { /* not shown */ },
    'hasArguments': function() { /* not shown */ },
    'bind': function() { /* not shown */ },
    'hasBinding': function() { /* not shown */ },
    'call': function() { /* not shown */ },
};

isCallbackWrapper(custom); // true
```

_See the source code of `isCallbackWrapper()` for additional details._