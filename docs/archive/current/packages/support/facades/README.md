---
title: About Facades
description: A static interface to classes
sidebarDepth: 0
---

# Introduction <Badge type="tip" text="Available since v0.11" vertical="middle" /><Badge type="success" text="Browser" vertical="middle" />

The `@aedart/support/facades` package is an adaptation of [Laravel's Facades](https://laravel.com/docs/11.x/facades)
(_originally licensed under [MIT](https://github.com/laravel/framework/blob/11.x/src/Illuminate/Container/LICENSE.md)_). In this context, a [Facade](https://en.wikipedia.org/wiki/Facade_pattern) acts as an interface (_or gateway_) to an
underlying object instance, resolved from the [Service Container](../../container/README.md).

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

To define your own Facade, extend the abstract `Facade` class, and specify the target [binding identifier](../../container/bindings.md#identifiers).

```js
import { Facade } from "@aedart/support/facades";

export default class ApiFacade extends Facade
{
    static getIdentifier()
    {
        return 'api_client';
    }
}
```

If you are using TypeScript, then you can also specify the return type of the `obtain()` method, by declaring the
underlying resolved object's type, for the internal `type` property (_`type` property is not used for any other purpose_).

```ts
import type { Identifier } from "@aedart/contracts/container";
import { Facade } from "@aedart/support/facades";
import type { AcmeApiClient } from "@acme/contracts/api";

export default class ApiFacade extends Facade
{
    protected static type: AcmeApiClient;
    
    public static getIdentifier(): Identifier
    {
        return 'api_client';
    }
}
```

## The `obtain()` method

The `obtain()` is used to obtain the Facade's underlying object instance. Typically, you do not need to do anything more
than to implement the `getIdentifier()` method in your concrete facade class.
But, in some situations you might need to resolve a binding differently. Or, perhaps perform some kind of additional
post-resolve logic, in order to make easier / simpler to work with the resolved object.

```js
export default class LimitedApiFacade extends Facade
{
    static getIdentifier()
    {
        return 'api_client';
    }

    /**
     * @return {import('@acme/contracts/api').AcmeApiClient}
     */
    static obtain()
    {
        const client = this.resolve(this.getIdentifier());
        client.error_response_thresshold = 3;
        client.ttl = 350;
        
        return client;
    }
}
```

```js
const promise = LimitedApiFacade.obtain().fetch('https://acme.com/api/users');
```

## Testing

When you need to test components that rely on Facades, you can register a "spy" (_mocked object_), via the static
method `spy()`. Consider, for instance, that you have a users repository component that relies on a custom Api facade.

```js
import { ApiFacade } from "@acme/facades";

class UsersRepository {
    
    fetch() {
        return ApiFacade.obtain().fetch('https://acme.com/api/users');
    }
    
    // ...remaining not shown...
}
```

In your testing environment, you can specify a callback that can be used to create a fake object (_mocked object_) that
must behave in a certain way, via the `spy()` method. The callback must return either of the following:

* The Facade's underlying resolved object.
* Or, a fake object that behaves as desired (_in the context of your test_).

```js
ApiFacade.spy((container, identifier) => {
    // ...mocking not shown ...

    return myResolvedObject; // resolved or mocked object
});
```

All subsequent calls to the facade's underlying object will be made to the registered "spy" object instead. 

The following example uses [Jasmine](https://jasmine.github.io/) as testing framework.
However, the `spy()` method is not tied to any specific testing or object mocking framework. Feel free to use whatever
testing tools or frameworks fits your purpose best.

```js
import { ApiFacade } from "@acme/facades";
import { UsersRepository } from "@app";

// E.g. testing via Jasmine Framework...
describe('@acme/api', () => {

    // Test setup not shown in this example...
    
    afterEach(() => {
        Facade.destroy();
    });
    
    it('can obtain users', () => {

        let mocked = null;
        ApiFacade.spy((container, identifier) => {
            const apiClient = container.get(identifier);

            mocked = spyOn(apiClient, 'fetch')
                .and
                .returnValue([
                    { id: 12, name: 'Jackie' },
                    { id: 14, name: 'Lana' },
                    // ...etc
                ]);

            // return the resolved api client...
            return apiClient;
        });

        const repo = new UsersRepository();
        const users = repo.fetch();
        
        expect(users)
            .not
            .toBeUndefined();

        expect(mocked)
            .toHaveBeenCalled();
    });
});
```

## Onward

Please consider reading Laravel's ["When to Utilize Facades"](https://laravel.com/docs/11.x/facades#when-to-use-facades),
to gain an idea of when using Facades can be good, and when not. 