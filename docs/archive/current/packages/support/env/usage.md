---
title: How to use
description: How to use the Env component
sidebarDepth: 0
---

# How to use Env

[[TOC]]

## Define "Environment Variables"

The `define()` method allows you to define your application's environment variables (_at runtime_).
It is intended to be used during your application's boot or initialisation logic.
The method accepts two arguments:

* `variables: Record<PropertyKey, any>`: a key-value object
* `safe: boolean = true`: (_optional_) If `true`, then the defined variables cannot be changed¹ 

¹: _Defined variables can still be [cleared](#clear-all)!_

```js
import { Env } from "@aedart/support/env";

Env.define({
    APP_ENV: 'development'
});
```

Once the environment variables have been defined, you can [access](#retrieve-values) them throughout your entire application.

::: warning Caution
`define()` automatically invokes the [`clear()`](#clear-all) method, before storing the environment
variables, in the `Env`'s internal repository.
:::

::: tip .env Files
The `Env` component is **NOT** able to define real [environment variables](https://en.wikipedia.org/wiki/Environment_variable).
It can only act as a key-value store, during your application's runtime.
See [bundlers](./bundlers.md) for examples on how to read `.env` files and injecting environment variables into
your runtime.
:::

## Retrieve Values

Use the `get()` method to retrieve a value for a defined variable.
The method accepts the following arguments:

* `key: PropertyKey`: The name of the environment variable
* `defaultValue?: any` (_optional_) Eventual default value to return, if environment variable does not exist.

```js
const url = Env.get('HOME', 'https://localhost.test');
```

### `env()`

Alternatively, you can also use the `env()` util, to retrieve values. It acts as an alias for `Env.get()`.

```js
import { env } from "@aedart/support/env";

const environment = env('APP_ENV', 'production');
```

## Clear All

In rare situations, you may wish to clear all defined environment variables (_e.g. in your tests_). 
To do so, call the `clear()` method.

```js
Env.clear();
```