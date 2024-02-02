---
title: Meta
description: Add arbitrary metadata on classes, methods and properties.
sidebarDepth: 0
---

# Meta <Badge type="tip" text="Available since v0.6" vertical="middle" />

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
To use the meta decorator, you must either use [@babel/plugin-proposal-decorators](https://babeljs.io/docs/babel-plugin-proposal-decorators), or use [TypeScript 5 decorators](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html#decorators).

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
When using a callback you gain access to the `target` that is being decorated, as well as the decorator `context`.
The callback **MUST** return an object that contains a `key` and a `value` property.

```js
import {meta} from '@aedart/support/meta';

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
import {meta} from '@aedart/support/meta';

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

## Inheritance

Metadata is automatically inherited by subclasses.

```js
import {meta, getMeta} from '@aedart/support/meta';

@meta('service_alias', 'locationSearcher')
class Service {}

class CitySearcher extends Service {}

getMeta(CitySearcher, 'service_alias'); // locationSearcher
```

### Overwrites

You can also overwrite the inherited metadata. The subclass that defines the metadata creates its own copy of the inherited metadata.
The parent class' metadata remains untouched.

```js
import {meta, getMeta} from '@aedart/support/meta';

class Service {
    
    @meta('search.desc', 'Searches for countries')
    search() {
        // ...not shown...
    }
}

class CitySearcher extends Service {

    @meta('search.desc', 'Searches for cities')
    search() {
        // ...not shown...
    }
}

const service = new CitySearcher();

getMeta(CitySearcher, 'search.desc'); // Searches for cities
getMeta(Service, 'search.desc'); // Searches for countries
```

## Changes outside the decorator

Whenever you read metadata, **_a copy_** is returned by the `getMeta()` method.
This means that you can change the data, in your given context, but the original metadata remains the same.

```js
import {meta, getMeta} from '@aedart/support/meta';

@meta('description', { name: 'Search Service', alias: 'Location Sercher' })
class Service {}

// Obtain "copy" and change it...
let desc = getMeta(Service, 'description');
desc.name = 'Country Searcher';

// Original remains unchanged
getMeta(Service, 'description').name; // Search Service
```

::: warning Caution
Only the `meta` decorator is intended to alter existing metadata - _even if the value is an object_.
Please be mindful of this behaviour, whenever you change retrieved metadata using the `getMeta()` and `getAllMeta()` methods.  
:::

## TC39 Decorator Metadata

In relation to the [Decorator Metadata proposal](https://github.com/tc39/proposal-decorator-metadata), this decorator _"mimics"_ a similar behaviour as the one defined by the proposal.
Defining and retrieving metadata relies on a decorator's `context.metadata` object, and the `Symbol.metadata` property of a class.

**Example:**

```js
import {meta, getMeta} from '@aedart/support/meta';

@meta('service_alias', 'locationSearcher')
class Service {}

getMeta(Service, 'service_alias'); // locationSearcher
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

Service[Symbol.metadata].service_alias; // locationSearcher
```
(_Above shown example is very simplified. Actual implementation is a bit more complex..._)

At present, the internal mechanisms of the `meta` decorator must rely on a [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) to associate metadata with the intended class.
When the [Decorator Metadata proposal](https://github.com/tc39/proposal-decorator-metadata) becomes more mature and transpilers offer the `context.metadata` object (_or when browsers support it_),
then this decorator will be updated respectfully to use the available metadata object.

## Target Meta <Badge type="tip" text="Available since v0.7" vertical="middle" />

The `targetMeta()` decorator offers the ability to associate metadata directly with a class instance or class method reference.
This can be useful in situations when you do not know the class that owns the metadata. 

Behind the scene, `targetMeta()` uses the `meta()` decorator and stores a reference to the target that is decorated inside a [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

::: tip Supported Elements

Unlike the [`meta()` decorator](#supported-elements), `targetMeta()` only supports the following elements:

* `class`
* `method`

:::

**Example: class instance**

```js
import {targetMeta, getTargetMeta} from '@aedart/support/meta';

@targetMeta('description', { type: 'Search Service', alias: 'Location Sercher' })
class LocationSearcherService {}

const instance = new LocationSearcherService();

// ...later in your application...
getTargetMeta(instance, 'description')?.type; // Search Service
```

**Example: method reference**

```js
import {targetMeta, getTargetMeta} from '@aedart/support/meta';

class LocationSearcherService {

    @targetMeta('dependencies', [ 'httpClient' ])    
    search(apiClient) {}
}

const instance = new LocationSearcherService();

// ...later in your application...
getTargetMeta(instance.search, 'dependencies'); // [ 'httpClient' ]
```

### Inheritance

Target meta is automatically inherited by subclasses and can also be overwritten, similar to that of the [`meta()` decorator](#inheritance).

**Example: classes**

```js
import {targetMeta, getTargetMeta} from '@aedart/support/meta';

@meta('service_alias', 'locationSearcher')
class Service {}

class CitySearcher extends Service {}

const instance = new CitySearcher();

// ...later in your application...
getTargetMeta(instance, 'service_alias'); // locationSearcher
```

**Example: methods**

```js
import {targetMeta, getTargetMeta} from '@aedart/support/meta';

class Service {

    @targetMeta('dependencies', [ 'countrySearchApiClient' ])
    search(apiClient) {
        // ...not shown...
    }
}

class CountrySearcher extends Service {
    // ... not method overwrite here...
}

class CitySearcher extends Service {

    @targetMeta('dependencies', [ 'citySearchApiClient' ])
    search(apiClient) {
        // ...not shown...
    }
}

const instanceA = new Service();
const instanceB = new CountrySearcher();
const instanceC = new CitySearcher();

// ...later in your application...
getTargetMeta(instanceA.search, 'dependencies'); // [ 'countrySearchApiClient' ]
getTargetMeta(instanceB.search, 'dependencies'); // [ 'countrySearchApiClient' ]
getTargetMeta(instanceC.search, 'dependencies'); // [ 'citySearchApiClient' ]
```

#### Static Methods

Inheritance for static methods works a bit differently. By default, any subclass will automatically inherit target metadata, even for static methods.
However, if you overwrite the given static method, the metadata is lost.

::: tip Limitation

_When a static method is overwritten, the parent's "target" metadata cannot be obtained due to a general limitation of the `meta()` decorator.
The decorator has no late `this` binding available to the overwritten static method.
This makes it impossible to associate the overwritten static method with metadata from the parent._

:::

**Example: inheritance for static methods**

```js
import {targetMeta, getTargetMeta} from '@aedart/support/meta';

class Service {

    @targetMeta('dependencies', [ 'xmlClient' ])
    static search(client) {
        // ...not shown...
    }
}

class CountrySearcher extends Service {
    // ... not method overwrite here...
}

class CitySearcher extends Service {
    
    // Overwite of static method - target meta is lost
    static search(client) {}
}

// ...later in your application...
getTargetMeta(CountrySearcher.search, 'dependencies'); // [ 'xmlClient' ]
getTargetMeta(CitySearcher.search, 'dependencies'); // undefined
```

To overcome the above shown issue, you can use the `inheritTargetMeta()` decorator. It forces the static method to "copy" metadata from its parent, if available.

**Example: force inheritance for static methods**

```js
import {
    targetMeta,
    getTargetMeta,
    inheritTargetMeta
} from '@aedart/support/meta';

class Service {

    @targetMeta('dependencies', [ 'xmlClient' ])
    static search(client) {
        // ...not shown...
    }
}

class CountrySearcher extends Service {
    // ... not method overwrite here...
}

class CitySearcher extends Service {
    
    @inheritTargetMeta()
    static search(client) {}
}

// ...later in your application...
getTargetMeta(CountrySearcher.search, 'dependencies'); // [ 'xmlClient' ]
getTargetMeta(CitySearcher.search, 'dependencies'); // [ 'xmlClient' ]
```