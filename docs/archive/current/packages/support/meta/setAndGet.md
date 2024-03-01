---
title: Set & Get 
description: Defining and retrieving metadata.
sidebarDepth: 0
---

# Set and Get Metadata

[[TOC]]

## Set Metadata

To define metadata on a class or its elements, use `meta()`.
It accepts the following arguments:

* `key`: _name of metadata identifier. Can also be a path (_see [`set`](../objects/set.md)_)._
* `value`: _arbitrary data. Can be a [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive), an [object](https://developer.mozilla.org/en-US/docs/Glossary/Object), or a [function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)._

To obtain metadata, use the `getMeta()` method.
You can also use `getAllMeta()`, if you wish to obtain all available metadata for a target class.

```js
import { meta } from '@aedart/support/meta';

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
```

## Get Metadata

Use `getMeta()` or `getAllMeta()` to retrieve metadata.

```js
import { getMeta, getAllMeta } from '@aedart/support/meta';

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
const description = getMeta(Service, 'fetch.desc', 'N/A');
```

## Callback

If you need to create more advanced metadata, you can specify a callback as the first argument for the `meta()` decorator method.
When using a callback you gain access to the `target` that is being decorated, as well as the decorator `context`.
The callback **MUST** return an object that contains a `key` and a `value` property.

```js
import { meta } from '@aedart/support/meta';

class Service {

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
import { meta } from '@aedart/support/meta';

function delegateMeta() {
    return meta((target, context) => {
        return {
            key: context.name,
            value: '...'
        }
    });
}

class Service {

    @delegateMeta()
    delegateTo(gateway) {
        // ...not shown...
    }
}
```