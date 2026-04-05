---
title: Inheritance
description: About metadata inheritance and overwrites.
sidebarDepth: 0
---

# Inheritance

Metadata is automatically inherited by subclasses.

```js
import { meta, getMeta } from '@aedart/support/meta';

@meta('service_alias', 'locationSearcher')
class Service {}

class CitySearcher extends Service {}

getMeta(CitySearcher, 'service_alias'); // locationSearcher
```


## Overwrites

You can also overwrite the inherited metadata. The subclass that defines the metadata creates its own copy of the inherited metadata.
The parent class' metadata remains untouched.

```js
import { meta, getMeta } from '@aedart/support/meta';

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