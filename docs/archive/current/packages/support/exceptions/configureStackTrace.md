---
title: Configure Stack Trace
description: Configuration error stack trace.
sidebarDepth: 0
---

# `configureStackTrace`

Captures a new stack trace and sets given Error's [`stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) property.

## Arguments

The function accepts an `Error` as argument.

```js
import { configureStackTrace } from "@aedart/support/exceptions";

class MyError extends Error {
    constructor(message, options) {
        super(message, options);

        configureStackTrace(this);
    }
}
```

::: warning
The `stack` is [not yet an official feature](https://github.com/tc39/proposal-error-stacks), even though it's supported by many major browsers and Node.js.
If you are working with custom errors, you might not need to capture and set the `stack` property.
Therefore, you should only use `configureStackTrace()` in situations when your JavaScript environment does not support stack traces in custom errors.
:::