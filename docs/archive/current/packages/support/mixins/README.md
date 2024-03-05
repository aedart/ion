---
title: About Mixins
description: Abstract subclasses ("Mixins") utilities
sidebarDepth: 0
---

# Mixins <Badge type="tip" text="Available since v0.8" vertical="middle" />

`@aedart/support/mixins` offers an adaptation of [Justin Fagnani's](https://justinfagnani.com/author/justinfagnani/)
[`mixwith.js`](https://github.com/justinfagnani/mixwith.js) package (_originally licensed under [Apache License 2.0](https://github.com/justinfagnani/mixwith.js?tab=Apache-2.0-1-ov-file#readme)_).

```js
import { mix, Mixin } from "@aedart/support/mixins";

// Define mixin
const NameMixin = Mixin((superclass) => class extends superclass {

    #name;
    
    set name(value) {
        this.#name = value;
    }
    
    get name() {
        return this.#name;
    }
});

// Apply mixin...
class Item extends mix().with(
    NameMixin
) {
    // ...not shown...    
}

// ...Later in your application
const item = new Item();
item.name = 'My Item';

console.log(item.name); // My Item
```

See also [Concerns](../concerns/README.md) as an alternative.