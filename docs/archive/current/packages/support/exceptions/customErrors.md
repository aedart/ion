---
title: Custom Errors
description: Predefined custom errors.
sidebarDepth: 0
---

# Custom Errors

[[TOC]]

## `AbstractClassError`

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

## `LogicalError`

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