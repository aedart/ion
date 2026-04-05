---
title: Target Meta
description: Associate metadata with a class instance or class method reference.
sidebarDepth: 0
---

# Target Meta <Badge type="tip" text="Available since v0.7" vertical="middle" />

The `targetMeta()` decorator offers the ability to associate metadata directly with a class instance or class method reference.
This can be useful in situations when you do not know the class that owns the metadata.

Behind the scene, `targetMeta()` uses the `meta()` decorator and stores a reference to the target that is decorated inside a [`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap).

[[TOC]]

## Supported Elements

Unlike the [`meta()` decorator](./supported.md), `targetMeta()` only supports the following elements:

* `class`
* `method`

## Class Instance

The following shows how to define target meta for a class and retrieve it.

```js
import { targetMeta, getTargetMeta } from '@aedart/support/meta';

@targetMeta('description', { type: 'Search Service', alias: 'Location Sercher' })
class LocationSearcherService {}

const instance = new LocationSearcherService();

// ...later in your application...
getTargetMeta(instance, 'description')?.type; // Search Service
```

## Method Reference

The following shows how to define target meta for a class method and retrieve it.

```js
import { targetMeta, getTargetMeta } from '@aedart/support/meta';

class LocationSearcherService {

    @targetMeta('dependencies', [ 'httpClient' ])    
    search(apiClient) {}
}

const instance = new LocationSearcherService();

// ...later in your application...
getTargetMeta(instance.search, 'dependencies'); // [ 'httpClient' ]
```

## Inheritance

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

### Static Methods

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