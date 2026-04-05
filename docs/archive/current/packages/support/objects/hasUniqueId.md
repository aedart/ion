---
title: Has Unique ID
description: Determine if object has a unique id.
sidebarDepth: 0
---

# `hasUniqueId` <Badge type="tip" text="Available since v0.6" vertical="middle" />

Determine if an object has a unique id.

_See [`uniqueId`](./uniqueId.md) for additional details._

```js
import { hasUniqueId } from "@aedart/support/objects";

const target = {
    name: 'Ursula'
};

console.log(hasUniqueId(target)); // false
```