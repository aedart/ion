---
title: About Concerns
description: Alternative mixin utility.
sidebarDepth: 0
---

# About Concerns  <Badge type="tip" text="Available since v0.9" vertical="middle" />

Inspired by PHP's [Traits](https://www.php.net/manual/en/language.oop5.traits.php), traditional [mixins](https://javascript.info/mixins), and a few concepts from [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection),
the `@aedart/support/concerns` submodule offers an alternative approach to reducing some of the limitations of [single inheritance](https://en.wikipedia.org/wiki/Inheritance_(object-oriented_programming)#Types). 

In this context, a "concern" is a class that can be injected into a target class, by means of the `use()` class decorator. 
The public properties and methods of the concern class are then _"aliased"_ into the target class' prototype. In other words,
"proxy" properties and methods are defined in the target class. They forward any interaction to the original properties and methods
in the concern class instance.

## Example

```js
import { use, AbstractConcern } from "@aedart/support/concerns";

// A concern class...
class ConsolePrinter extends AbstractConcern {
    print(message) {
        console.log(message);
    }
}

// Taget class that uses a concern...
@use(ConsolePrinter)
class Person {
    
    sayHi(name) {
        // Call method in concern
        this.print(`Hi ${name}`);
    }
}

// Later in your application...
const person = new Person();
person.sayHi('Atrid'); // Hi Astrid

person.print('Ho ho ho...'); // Ho ho ho...
```

See also ["Real" mixins](../mixins/README.md) as an alternative.