---
title: Outside Changes
description: About changes to metadata outside decorator scope.
sidebarDepth: 0
---

# Changes outside the decorator

Whenever you read metadata, **_a copy_** is returned by the `getMeta()` method.
This means that you can change the data, in your given context, but the original metadata remains the same.

```js
import { meta, getMeta } from '@aedart/support/meta';

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