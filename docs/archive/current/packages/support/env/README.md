---
title: About Env
description: Environment Variables
---


# About Env <Badge type="tip" text="Available since v0.12" vertical="middle" />

The `@aedart/support/env` submodule offers a way to use [environment variables](https://en.wikipedia.org/wiki/Environment_variable)
in your application's runtime.

```js
import { Env } from "@aedart/support/env";

// During your application's bootstrapping...
Env.define({
    APP_ENV: 'production'
});

// Later in your application
const environment = Env.get('APP_ENV');
console.log(environment); E.g. production
```

::: warning Disclaimer
By itself, this submodule does not read any `.env` files, nor does it access node's [`process.env.`](https://nodejs.org/en/learn/command-line/how-to-read-environment-variables-from-nodejs).
It only acts as a "repository" that can access a key-value store.
Please see the [bundlers](./bundlers.md) section for additional details. 
:::