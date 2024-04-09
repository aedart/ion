---
description: How to define dependencies
sidebarDepth: 0
---

# Dependencies

In order for the Service Container to be able to automatically inject dependencies, when [resolving](./resolving.md)
components, you must first define them on a target class. The `dependencies()` decorator is used for this purpose.

```js
import { dependencies } from "@aedart/support/container";

@dependencies('engine')
export default class Car
{
    engine = undefined;
    
    constructor(engine) {
        this.engine = engine;
    }
}
```

::: tip No automatic injection
The `dependencies()` decorator _**does not automatically inject**_ anything into your class.
It will only associate binding identifiers with the target class, as [metadata](../support/meta).
This means that you can instantiate a new instance of the class, without any side effects (_dependencies must
be manually given as arguments to the target class_).

```js
const car = new Car();
console.log(car.engine); // undefined
```

The Service Container's [`make()` method](./resolving.md#the-make-method) is responsible for reading the defined
dependencies, resolve them, and inject them into the target class.
:::

## Multiple Dependencies

The `dependencies()` decorator accepts an arbitrary amount of binding identifiers. This allows you to define multiple
dependencies in a single call.

```js
@dependencies(
    'warehouse_manager',
    'api_client',
    'events'
)
export default class Warehouse
{
    manager = undefined;
    apiClient = undefined;
    eventDispatcher = undefined;
    
    constructor(manager, apiClient, dispatcher) {
        this.manager = manager;
        this.apiClient = apiClient;
        this.eventDispatcher = dispatcher;
    }
}
```