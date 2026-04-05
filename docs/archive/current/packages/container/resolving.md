---
description: Resolving Dependencies
sidebarDepth: 0
---

# Resolving

[[TOC]]

## The `make()` method

To resolve component instances or values from the Service Container, use the `make()` method.
It accepts the following arguments:

* `identifier: Identifier` - Target [binding identifier](./bindings.md#identifiers).
* `args: any[] = []` - (_optional_) Eventual arguments to be passed on to [class constructor](./bindings.md#constructors) or ["factory" callback](./bindings.md#factory-callbacks).

```js
const recorder = container.make('recorder');
```

When specifying a class constructor as the `identifier` argument, the `make()` method will automatically attempt to
create a new instance of the given class, even if no binding was registered for it.

```js
class AudioPlayer
{
    // ...not shown...
}

const audio = container.make(AudioPlayer); // new AudioPlayer instance
```

### Dependencies

If the target that must be resolved is a class that has [dependencies defined](./dependencies.md) as [metadata](../support/meta),
then the `make()` method will automatically resolve them, and inject them into the target class.

```js
import { dependencies } from "@aedart/support/container";

@dependencies('storage')
class TextRecorder
{
    storage = undeinfed;

    constructor(storage) {
        this.storage = storage;
    }
}

// Register binding in the Service Container
container.singleton('storage', () => {
   return new CookieStorage(); 
});


// ...Later in your application
const recorder = container.make(TextRecorder);
console.log(recorder.storage); // CookieStorage
```

### The `args` Argument

You can also manually specify what arguments a class constructor or "factory" callback should receive, via the `args` argument.

```js
const recorder = container.make(TextRecorder, [ new CloudStorage() ]);
console.log(recorder.storage); // CloudStorage
```

::: warning
When specifying the `args` argument for `make()`, any defined dependencies are **overwritten** by the values
in the `args` array, if a class constructor is requested resolved!
In other words, the binding identifiers defined via the [`dependencies` decorator](./dependencies.md) are ignored.
:::

## The `call()` method

The Service Container can also be used to invoke class methods or callbacks. This allows you to resolve a method's dependencies
and inject them.
The `call()` method accepts the following arguments:

* `method: Callback | CallbackWrapper | ClassMethodReference` - The target callback or class method to invoke.
* `args: any[] = []` - (_optional_) Eventual arguments to be passed on to class method or callback.

```js
class UsersRepository
{
    @dependencies('users_api_service')
    fetchUser(usersService)
    {
        // ...not shown...
    }
}

// Later in your application
const promise = container.call([UsersRepository, 'fetchUser']);
```

### Class Method Reference

A "class method reference" is an array that holds two values:

* A class constructor or object instance.
* The name of the method to be invoked in the target class.

```js
const reference = [AudioPlayer, 'play'];
```

When given as the `method` argument, for `call()`, the target class constructor is automatically resolved (_instantiated with eventual dependencies injected_).
The method is thereafter invoked and output is returned.
If the class method has any dependencies defined, then those will be resolved and injected into the method as arguments.

```js
class AudioPlayer
{
    @dependencies('audio_processor', 'my_song')
    play(processor, song) {
        // ...play logic not shown...
        return this;
    }
}

const player = container.call([AudioPlayer, 'play']);
```

::: warning
If you specify the `args` argument for `call()`, then eventual defined dependencies are **overwritten** with the values
provided in the `args` array. Thus, the dependencies of the class method are ignored.

```js
const player = container.call(
    [AudioPlayer, 'play'],
    
    // Arguments passed on to "play" method.
    [
        new AudioProcessor(),
        new FavouriteSong()
    ]
);
```
:::

### Callback Wrapper

When specifying a [callback wrapper](../support/CallbackWrapper.md) as target for `call()`, then the callback will be
invoked and eventual output is returned. If the wrapper has arguments specified, then they will automatically be applied,
the underlying callback is invoked.

::: warning
Providing the `args` argument for `call()` will **overwrite** eventual arguments set in the callback wrapper!

```js
import { CallbackWrapper } from "@aedart/support";

const wrapped = CallbackWrapper.make((firstname, lastname) => {
    return `Hi ${firstname} ${lastname}`;
}, 'Brian', 'Jackson');

const result = container.call(wrapped, [ 'James', 'Brown' ]);
console.log(result); // Hi James Brown
```
:::

To define dependencies for a callback wrapper, you must use the wrapper's `set()` method and specify an array of target
binding identifiers for the `DEPENDENCIES` symbol as key. 

```js
import { DEPENDENCIES } from "@aedart/contracts/container";

const wrapped = CallbackWrapper.make((apiClient) => {
    // ...fetch user logic not shown...
    
    return promise;
}).set(DEPENDENCIES, [ 'api_client' ]);

const promise = container.call(wrapped); // Api Client injected into callback...
```

### Callback

The `call()` can also be used for invoking a regular callback. Any `args` argument given to `call()` are passed on to
the callback, and eventual output value is returned.

```js
const result = container.call((x) => {
    return x * 2;
}, 4);

console.log(result); // 8
```

::: warning Limitation
At the moment, it is not possible to associate dependencies with a native callback directly.
Please use a [callback wrapper](#callback-wrapper) instead, if you need to inject dependencies into a callback.
:::

## Hooks

If you need to react to components or values that are being resolved from the Service Container, then you can use the
`before()` and `after()` hook methods.

### `before()`

The `before()` method registers a callback to be invoked before a binding is resolved.

```js
container.before('user', (identifier, args, container) => {
    // ...not shown...
});
```

### `after()`

The `after()` method registers a callback to be invoked after a binding has been resolved

```js
container.after('user', (identifier, resolved, container) => {
    // ...not shown...
});
```