---
description: How to obtain Service Container instance
sidebarDepth: 0
---

# Container Instance

The Service Container can be instantiated as a new instance, if you wish it. This allows you to use the container in
isolation, without application-wide side effects.

```js
import { Container } from "@aedart/container";

const container = new Container();
```

However, if you plan the use the same Service Container instance across your entire application, then you can obtain a [singleton](https://en.wikipedia.org/wiki/Singleton_pattern)
instance via the static method `getInstance()`.

The `getInstance()` method will automatically create a new Service Container instance and store a static reference to it, if no previous instance
was created.

```js
const container = Container.getInstance();
```

## Destroy Existing Instance

In situations when you need to destroy the existing singleton instance, call the static `setInstance()` method
with `null` as argument.

```js
Container.setInstance(null); // Existing singleton instance is now lost...
```