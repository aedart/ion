---
title: Get Name Or Desc. Tag
description: Get name of target class' constructor, or description tag
sidebarDepth: 0
---

# `getNameOrDesc` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Returns target class' [constructor name](./getConstructorName.md), or [description tag](../misc/descTag.md) if name is not available. 

```js
import { getNameOrDesc } from '@aedart/support/reflections';

class ApiService {}

getNameOrDesc(ApiService); // ApiService
getNameOrDesc(class {});   // [object Function]
```