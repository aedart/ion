---
title: Is WeakKind
description: Determine if object is of a "weak" kind.
sidebarDepth: 0
---

# `isWeakKind` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Determine if object of a "weak" kind, e.g. [`WeakRef`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef),
[`WeakMap`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap),
or [`WeakSet`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet).

```js
import { isWeakKind } from '@aedart/support/reflections';

const a = {};

isWeakKind(null); // false
isWeakKind(a); // false
isWeakKind(new Map()); // false
isWeakKind(new Set()); // false

isWeakKind(new WeakRef(a)); // true
isWeakKind(new WeakMap()); // true
isWeakKind(new WeakSet()); // true
```