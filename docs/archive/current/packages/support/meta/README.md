---
title: About Meta
description: Add arbitrary metadata on classes, methods and properties.
---


# About Meta <Badge type="tip" text="Available since v0.6" vertical="middle" />

Provides a decorator that is able to associate metadata with a class, its methods and properties.

```js
import { meta, getMeta } from '@aedart/support/meta';

@meta('service_alias', 'locationSearcher')
class Service {}

getMeta(Service, 'service_alias'); // locationSearcher
```