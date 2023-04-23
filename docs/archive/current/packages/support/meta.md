---
title: Meta
description: Add arbitrary metadata on classes, methods and properties.
sidebarDepth: 0
---

# Meta

Provides a decorator that is able to associate metadata with a class, its methods and properties.

```js
import {meta, getMeta} from '@aedart/support/meta';

@meta('service_alias', 'locationSearcher')
class Service {}

getMeta(Service, 'service_alias'); // locationSearcher
```

[[TOC]]

## Prerequisites

At the time of this writing, [decorators](https://github.com/tc39/proposal-decorators) are still in a proposal phase.
To use the meta decorator, you must either use [@babel/plugin-proposal-decorators](https://babeljs.io/docs/babel-plugin-proposal-decorators), or use [TypeScript 5 decorator](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators).

## Supported Elements

The `meta` decorator supports the following elements¹: 

* `class`
* `method`
* `getter`
* `setter`
* `field`
* `accessor`

¹: _An element is determined by the decorator's [`context.kind`](https://github.com/tc39/proposal-decorators#2-calling-decorators) property._

## Defining and Retrieving Metadata

To define metadata on a class or its elements, use `meta()`.
It accepts the following arguments:

* `key`: _name of metadata identifier. Can also be a path (_see [`set`](./objects.md#set)_)._
* `value`: _arbitrary data. Can be a [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), an [object](https://developer.mozilla.org/en-US/docs/Glossary/Object), or a [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)._

To obtain metadata, use the `getMeta()` method.
You can also use `getAllMeta()`, if you wish to obtain all available metadata for a target class.

```js
import {meta, getMeta, getAllMeta} from '@aedart/support/meta';

@meta('service_alias', 'locationSearcher')
class Service
{
    @meta('name', 'Name of service') name;
    
    @meta('fetch.desc', 'Fetches resource via a gateway')
    @meta('fetch.dependencies', [ 'my-gateway' ])
    async fetch(gateway)
    {
        // ...implementation not shown...
    }
}

// Later in your application...
const service = new Service();

const desc = getMeta(Service, 'fetch.desc');
const dependencies = getMeta(Service, 'fetch.dependencies');

// Or, obtain all metadata
const allMeta = getAllMeta(Service);
```

::: tip Metadata Availability
Depending on the kind of element that is decorated, metadata might only **_become available_** for reading, **_after_** a new class instance has been instantiated.
This is true for the following elements:
* `method`
* `getter`
* `setter`
* `field`
* `accessor`

**Static Elements**

If an element is declared as [`static`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static), then it's metadata becomes available as soon as the class has been defined.
:::

### Default Value

The `getMeta()` method also offers a `defaultValue` argument, which is returned, in case that a metadata value does not exist for a given identifier.

```js
const description = getMeta(Service, 'fetch.desc', 'N/A - method has no description');
```

### Callback

If you need to create more advanced metadata, you can specify a callback as the first argument for the `meta()` decorator method.
Using a callback, you gain access to the `target` that is being decorated, as well as the decorator `context`.
The callback **MUST** return an object that contains a `key` and a `value` property.

```js
import {meta} from '@aedart/support/meta';

class Service{

    @meta((target, context) => {
        return {
            key: context.name,
            value: '...'
        }
    })
    delegateTo(gateway) {
        // ...not shown...
    }
}
```

Although the above example is a bit cumbersome to read, it shows a simple way to defined metadata for a method, which utilises the decorator `context`.
If you wish, you can use this approach to create your own specialised meta decorators. Doing so can also improve the readability of your class.
Consider the following example:

```js
import {meta} from '@aedart/support/meta';

function delegateMeta() {
    return meta((target, context) => {
        return {
            key: context.name,
            value: '...'
        }
    });
}

class Service{

    @delegateMeta()
    delegateTo(gateway) {
        // ...not shown...
    }
}
```

## Inheritance

...TODO...

## TC39 Decorator Metadata

In relation to the [Decorator Metadata proposal](https://github.com/tc39/proposal-decorator-metadata), this decorator _"mimics"_ a similar behaviour as the one defined by the proposal.
Defining and retrieving metadata relies on a decorator's `context.metadata` object, and the `Symbol.metadata` property of a class.

**Example:**

```js
import {meta, getMeta} from '@aedart/support/meta';

@meta('service_alias', 'locationSearcher')
class Service {}

getMeta(Service, 'service_alias');
```

**Roughly "desugars" to the following:**
```js
function meta(key, value) {
    return (target, context) => {
        context.metadata[key] = value;
    }
}

@meta('service_alias', 'locationSearcher')
class Service {}

Service[Symbol.metadata].service_alias;
```
(_Above shown example is very simplified. Actual implementation is much more complex,..._)

At present, the internal mechanisms of the `meta` decorator must rely on a [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) to associate metadata with the intended class.
However, when the [Decorator Metadata proposal](https://github.com/tc39/proposal-decorator-metadata) becomes more mature and transpilers offer the `context.metadata` (_or when browsers implement class decorators natively with support for `context.metadata`_),
then this decorator will be updated respectfully to use the available metadata object. 