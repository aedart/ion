---
title: Get Error Message
description: Obtain error or default message.
sidebarDepth: 0
---

# `getErrorMessage`

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