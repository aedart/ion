---
title: Desc. Tag
description: Object description tag
sidebarDepth: 0
---

# `descTag`

Return the default string description of an object.

```js
import { descTag } from '@aedart/support/misc';

descTag('foo'); // [object String]
descTag(3); // [object Number]
descTag([1, 2, 3]); // [object Array]
descTag(true); // [object Boolean]
// ... etc
```

The method is a shorthand for the following:

```js
Object.prototype.toString.call(/* your value */);
```

See [Mozilla's documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag) for additional information.

