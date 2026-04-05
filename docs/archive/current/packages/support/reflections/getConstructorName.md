---
title: Get Constructor Name
description: Get name of target class' constructor
sidebarDepth: 0
---

# `getConstructorName` <Badge type="tip" text="Available since v0.9" vertical="middle" />

Returns target class' constructor name, if available.

It accepts the following arguments:

- `target: ConstructorOrAbstractConstructor` - The target class
- `defaultValue: string|null = null` - (_optional_) A default string value to return if target has no constructor name.

```js
import { getConstructorName } from '@aedart/support/reflections';

class Box {}

getConstructorName(Box); // Box
getConstructorName(class {}); // null
getConstructorName(class {}, 'MyBox'); // MyBox
```