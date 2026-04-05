---
title: Unique ID
description: Set value in object path.
sidebarDepth: 0
---

# `uniqueId` <Badge type="tip" text="Available since v0.6" vertical="middle" />

The `uniqueId()` is able to return a _"unique¹"_ reference identifier for any given object.

```js
import { uniqueId, hasUniqueId } from "@aedart/support/objects";

const target = {
    name: 'Ursula'
};

console.log(uniqueId(target)); // 27

// ...later in your application
console.log(hasUniqueId(target)); // true
console.log(uniqueId(target)); // 27
```

The source code is heavily inspired by [Nicolas Gehlert's](https://github.com/ngehlert) blog post: ["_Get object reference IDs in JavaScript/TypeScript_" (September 28, 2022)](https://developapa.com/object-ids/)

¹: _In this context, the returned number is unique in the current session. The number will NOT be unique across multiple sessions, nor guarantee that an object will receive the exact same identifier as in a previous session!_