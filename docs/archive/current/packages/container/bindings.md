---
description: Service Container Bindings
sidebarDepth: 0
---

# Bindings

[[TOC]]

## Basics

The `bind()` method is used to register bindings in the Service Container. It accepts three arguments:

* `identifier: Identifier` - (_see [Identifiers](#identifiers)_).
* `concrete: FactoryCallback | Constructor` - The value to be resolved.
* `shared: boolean = false` - (_optional - see [Singletons](#singletons)_).

```js
import { CookieStorage } from "@acme/storage";

container.bind('storage', CookieStorage);
``` 

When the binding is [resolved](./resolving.md) from the Service Container, the `concrete` value is returned. Either as a new class
instance (_see [Constructors](#constructors)_), or the value returned from a callback (_see [Factory Callbacks](#factory-callbacks)_).

You can also use `bindIf()` to register a binding. The method will _ONLY_ register the binding, if one has not already
been registered for the given identifier.

```js
container.bindIf('storage', CookieStorage);
```

### Singletons

If you wish to register a "shared" binding, use the `singleton()` method. It ensures that the binding is only resolved
once. This means that the same object instance or value is returned, each time that it is requested resolved.
Invoking the `singleton()` is the equivalent to invoking `bind()` with the `shared` argument set to `true`.

```js
import { ApiClient } from "@acme/api";

container.singleton('api_client', ApiClient);
```

The `singletonIf()` method is similar to `bindIf()`. It will only register a "shared" binding, if one has not already
registered.

```js
container.singletonIf('api_client', ApiClient);
```

### Instances

You can also register existing object instances in the Service Container. This is done via the `instance()` method.
Whenever the binding is requested resolved, the same instance is returned each time.

```js
import { ApiClient } from "@acme/api";

const client = new ApiClient();

container.instance('api_client', client);
```

## Identifiers

To ensure that the Service Container is able to resolve the correct object instances or values, the binding identifiers
must be unique. The following types are supported as binding identifiers:

* `string`
* `symbol`
* `number`
* `object` (_not `null`_)
* Class Constructor
* Callback

::: tip

To ensure that identifiers are truly unique, you _should_ use [symbols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) or
[class constructors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) as binding identifiers.

```js
// Somewhere in your application
export const STORAGE = Symbol('app_storage');
```

```js
import { CookieStorage } from "@acme/storage";
import { STORAGE } from "@acme/services";

container.bind(STORAGE, CookieStorage);
```

:::

## `concrete` Types

The `concrete` argument for the `bind()`, `bindIf()`, `singleton()` and `singletonIf()` methods accepts
either of the following kind of value:

* Class constructor
* "Factory" callback

### Constructors

When registering a binding using a class constructor as the `concrete` argument value, a new instance of that class is
instantiated and returned, when requested [resolved](./resolving.md).

```js
class TextRecorder {}

container.bind('recorder', TextRecorder);

// Later in your application
const recorder = container.make('recorder');

console.log(recorder instanceof TextRecorder); // true
``` 

### Factory Callbacks

If you need more advanced resolve logic, then you can specify a callback as the `concrete` argument value.
When requested resolved, the callback is invoked and the Service Container instance is passed as argument to the callback.
This allows you to perform other kinds of resolve logic.

```js
class TextRecorder {
    constructor(config) {
        this.config = config;
    }
}

container.bind('recorder', (container) => {
    const config = container.make('my_recorder_config');
    
    return new TextRecorder(config);
});
```

Although the above example shows an object instance being returned by the factory callback, any kind of value can be returned.

```js
container.bind('my_message', () => 'Hi there...');

// Later in your application
const msg = container.make('my_message'); // Hi there...
```

#### Arguments

The factory callback is also provided with any arguments that are passed on to the [`make()` method](./resolving.md#the-make-method).

```js
class User {
    constructor(name) {
        this.name = name;
    }
}

container.bind('user', (container, ...args) => {
    return new User(...args);
});

// Later in your application
const user = container.make('user', 'Maya');

console.log(user.name); // Maya
```

## Extend Bindings

The `extend()` method can be used to decorate or configure object instances that have been resolved.
The method accepts the following arguments:

* `identifier: Identifier` - the target binding identifier.
* `callback: ExtendCallback` - callback that is responsible for modifying the resolved instance.

```js
container.extend('user', (resolved, container) => {
    return DecoratedUser(resolved);
});
```