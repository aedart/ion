---
title: To Weak Ref.
description: Wrap object into a Weak Reference.
sidebarDepth: 0
---

# `toWeakRef` <Badge type="tip" text="Available since v0.7" vertical="middle" />

Wraps a target object into a [`WeakRef`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef), if not already instance of a weak reference.

```js
import { toWeakRef } from "@aedart/support/misc";

const person = { name: 'Sine' };

const a = toWeakRef(person); // new WeakRef of "person"
const b = toWeakRef(a); // same WeakRef instance as "a"

toWeakRef(null); // undefined
toWeakRef(undefined); // undefined
```