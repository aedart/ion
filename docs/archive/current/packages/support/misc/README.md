---
title: Misc.
description: Misc. utilities
sidebarDepth: 0
---

# Misc. <Badge type="tip" text="Available since v0.4" vertical="middle" />

`@aedart/support/misc` offers miscellaneous utility methods. 

[[TOC]]

## `isset`

Determine if value is different from `undefined` and `null`.

```js
import {isset} from '@aedart/support/misc';

isset('foo'); // true
isset(''); // true
isset(true); // true
isset(false); // true
isset(1234); // true
isset(1.234); // true
isset([]); // true
isset({}); // true
isset(() => true); // true

isset(undefined); // false
isset(null); // false
```

You can also determine if multiple values differ from `undefined` and `null`.

**Note**: _All given values must differ from `undefined` and `null`, before method returns `true`._

```js
isset('foo', { name: 'Jane' }, [ 1, 2, 3 ]); // true

isset('foo', null, [ 1, 2, 3 ]); // false
isset('foo', { name: 'Jane' }, undefined); // false
```