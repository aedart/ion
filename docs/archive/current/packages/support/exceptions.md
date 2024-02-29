---
title: Exceptions
description: Custom Errors / Exceptions utilities.
sidebarDepth: 0
---

# Exceptions <Badge type="tip" text="Available since v0.9" vertical="middle" />

`@aedart/support/exceptions` offers a few utilities for working with [Custom Errors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types).

[[TOC]]

## `configureCustomError`

Configures a custom error by automatically setting the error's `name` property to the class' constructor name.
The function accepts the following arguments:

* `error: Error`  - the custom error instance
* `captureStackTrace: boolean = false` (_optional_) Captures and sets error's stack trace (_See [`configureStackTrace()`](#configurestacktrace) for details_).

```js
import { configureCustomError } from "@aedart/support/exceptions";

class MyError extends Error {
    constructor(message, options) {
        super(message, options);

        configureCustomError(this);
    }
}
```

See [Mozilla's documentation on Custom Error Types](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#custom_error_types) for additional information.

## `configureStackTrace`

Captures a new stack trace and sets given Error's [`stack`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack) property.
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

## `getErrorMessage`

Returns an Error's `message`, if an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error)
instance is provided. Otherwise, a default message is returned.

```js
import { getErrorMessage } from "@aedart/support/exceptions";

try {
    throw new Error('Something went wrong!');
} catch(e) {
    const msg = getErrorMessage(e, 'unknown error'); // Something went wrong! 
}

// ---------------------------------------------------------------------------

try {
    throw 'Something went wrong!';
} catch(e) {
    const msg = getErrorMessage(e, 'unknown error'); // unknown error 
}
```

## Custom Errors

### `AbstractClassError`

The `AbstractClassError` is intended to be thrown whenever an abstract class is attempted instantiated directly.

```js
import { AbstractClassError } from "@aedart/support/exceptions";

/**
 * @abstract
 */
class MyAbstractClass {
    constructor() {
        if (new.target === MyAbstractClass) {
            throw new AbstractClassError(MyAbstractClass);
        }
    }
}

const instance = new MyAbstractClass(); // AbstractClassError
```

### `LogicalError`

To be thrown whenever there is an error in the programming logic.

_Inspired by PHP's [`LogicException`](https://www.php.net/manual/en/class.logicexception)_

```js
import { LogicalError } from "@aedart/support/exceptions";

function print(person) {
    if (printer === undefined) {
        throw new LogicalError('Printer is missing, unable to print people');
    }
}
```