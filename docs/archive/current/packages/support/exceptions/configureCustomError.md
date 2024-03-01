---
title: Configure Custom Error
description: Configuration of custom errors.
sidebarDepth: 0
---

# `configureCustomError`

Configures a custom error by automatically setting the error's `name` property to the class' constructor name.

## Arguments

`configureCustomError`() accepts the following arguments:

* `error: Error`  - the custom error instance
* `captureStackTrace: boolean = false` (_optional_) Captures and sets error's stack trace¹.

¹: _See [`configureStackTrace()`](./configurestacktrace.md) for details._

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
