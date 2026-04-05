---
title: Introduction
description: Ion Service Container package
sidebarDepth: 0
---

# Introduction <Badge type="tip" text="Available since v0.11" vertical="middle" /><Badge type="success" text="Browser" vertical="middle" />

The `@aedart/container` package offers an adaptation of [Laravel's Service Container](https://laravel.com/docs/11.x/container)
(_originally licensed under [MIT](https://github.com/laravel/framework/blob/11.x/src/Illuminate/Container/LICENSE.md)_).

The tools provided by this package give you a way to:
* Manage class dependencies
* Perform [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection)

## Example

### Bindings

Imagine that you have an Api client (_or any component for that matter_). Whenever it is needed, you want it to be
injected into components that depend on it.

```js
export default class ApiClient
{
    // ...implementation not shown...
}
```

To ensure that dependency injection can be performed, you must first bind the component in the service container.
Each binding requires a unique identifier, e.g. a string, symbol, number...etc.

```js
import { Container } from "@aedart/container";
import { ApiClient } from "@acme/api";

const container = Container.getInstance();

// Bind 'my_api_client' to the ApiClient component...
container.bind('my_api_client', ApiClient);
```

### Define Dependencies

To define the dependencies of a component, use the `dependencies()` decorator.
By itself, the decorator does not do anything more than to associate a component with one or more dependencies
(_binding identifiers_). In other words, the decorator _**does not automatically inject**_ anything into your class.
It only registers the dependencies as [metadata](../support/meta) onto a class.

```js
import { dependencies } from "@aedart/support/container";

@dependencies('my_api_client')
export default class BookService
{
    apiClient;
    
    constructor(client) {
        this.apiClient = client;
    }
    
    // ...remaining not shown...
}
```

### Resolve

When you want to resolve a component, with all of its dependencies injected into it, use the service container's `make()`
method.

```js
import { Container } from "@aedart/container";
import { BookService } from "@acme/app/services";

const bookService = Container.getInstance().make(BookService);

console.log(bookService.apiClient); // ApiClient
```

### Onward

The above shown example illustrates the most basic usage of the service container. Throughout the remaining of this
package's documentation, more examples and use-cases are covered. 