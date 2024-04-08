---
title: About Facades
description: A static interface to classes
sidebarDepth: 0
---

# Introduction <Badge type="tip" text="Available since v0.11" vertical="middle" /><Badge type="success" text="Browser" vertical="middle" />

The `@aedart/support/facades` package is an adaptation of [Laravel's Facades](https://laravel.com/docs/11.x/facades)
(_originally licensed under [MIT](https://github.com/laravel/framework/blob/11.x/src/Illuminate/Container/LICENSE.md)_). A [Facade](https://en.wikipedia.org/wiki/Facade_pattern) acts as an interface
to an underlying object instance.

```js
import { Container } from "@aedart/support/facades";

const service = Container.obtain().make('api_service');
```

[[TOC]]

## Setup Facade's Service Container instance

Before you can make use of facades, you must ensure that the `Facade` abstraction has a service container instance set.
This can be done via the static `setContainer()` method.

```js
import { Container } from "@aedart/container";
import { Facade } from "@aedart/support/facades";

// Somewhere in your application's setup or boot logic...
Facade.setContainer(Container.getInstance());
```

Consequently, if you need to unset the Service Container instance and make sure that the `Facade` abstraction is cleared
of any previously resolved object instances, invoke the static `destroy()` method.

```js
Facade.destroy();
```

## Define a Facade

To define your own Facade, extend the abstract `Facade` class. Specify the target [binding identifier](../../container/bindings.md#identifiers),
and the `obtain()` method.

```js
import { Facade } from "@aedart/support/facades";

export default class ApiFacade extends Facade
{
    static getIdentifier()
    {
        return 'api_client';
    }

    /**
     * @inheritDoc
     *
     * @return {import('@acme/api').ApiClient}
     */
    static obtain()
    {
        return this.resolveIdentifier();
    }
}
```

### The `obtain()` method

Since a facade is only an "interface" to an underlying object instance, that has been registered in a [Service Container](../../container/README.md),
you must specify how that object instance must be resolved. Typically, invoking the internal `resolveIdentifier()` will be sufficient.
However, in special circumstances, you might need to resolve a binding differently, or perhaps perform
some kind of additional post-resolve logic.

```js
export default class LimitedApiFacade extends Facade
{
    static getIdentifier()
    {
        return 'api_client';
    }

    /**
     * @inheritDoc
     *
     * @return {import('@acme/api').ApiClient}
     */
    static obtain()
    {
        const client = this.resolveIdentifier();
        client.error_response_thresshold = 3;
        client.ttl = 350;
        
        return client;
    }
}
```

## Testing

TODO: ....