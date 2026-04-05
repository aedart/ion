---
description: Define Contextual Bindings
sidebarDepth: 0
---

# Contextual Bindings

In situations when multiple classes make use of the same dependency, but you wish to inject a different component or
value on some of those classes, then you can make use of "context binding".
The `when()` method allows you to specify (_overwrite_) the implementation to be resolved and injected, for a given
target class.

```js
container.when(ApiService)
        .needs('storage')
        .give(CookieStorage);

container.when(UsersRepository, BooksRepository)
        .needs('api_client')
        .give(() => {
           return new AcmeApiClient(); 
        });
```

To illustrate the usefulness of contextual binding a bit further, consider the following example: 

```js
@dependency('storage')
class A {
    // ...not shown...
}

@dependency('storage')
class B {
    // ...not shown...
}

@dependency('storage')
class C {
    // ...not shown...
}

@dependency('storage')
class D {
    // ...not shown...
}

// Register "default" storage binding
container.singleton('storage', CookieStorage);

// Register contextual binding for C and D
container.when(C, D)
    .needs('storage')
    .give(() => {
        return new CloudStorage('s3');
    });
```

In the above shown example, all classes define the same binding identifier (_"storage"_) as a dependency.
By default, a "storage" binding is registered in the Service Container, which ensures that when the classes are resolved,
a `CookieStorage` component instance is injected into each target class instance.

However, classes `C` and `D` require a different implementation, than the one offered by the "storage" binding.
To achieve this, and without overwriting the default "storage" binding, a new contextual binding is registered that affects
only classes `C` and `D`. When they are resolved, a different implementation of injected into the target classes.

```js
const c = container.make(C);
console.log(c.storage); // CloudStorage
```