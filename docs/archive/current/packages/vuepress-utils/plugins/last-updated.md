---
title: Last Updated
description: Last Updated Date Vuepress plugins
sidebarDepth: 0
---

# Last Updated

`lastUpdatedPlugin()` allows you to specify a custom datetime format for the ["last updated" date](https://v2.vuepress.vuejs.org/reference/default-theme/config.html#lastupdated), for the default theme.
It uses [Luxon](https://moment.github.io/luxon/#/) to perform the formatting.

## How to use

In your [Config File](https://v2.vuepress.vuejs.org/guide/configuration.html#config-file), add the `lastUpdatedPlugin()`:

```ts
import {defineUserConfig} from 'vuepress';
import {lastUpdatedPlugin} from "@aedart/vuepress-utils/plugins";

export default defineUserConfig({
    
    // ...other settings not shown...
    
    plugins: [
        
        lastUpdatedPlugin()
    ]
});
```

## Format

Use the `format` argument to specify your desired datetime format. 
See [Luxon documentation](https://moment.github.io/luxon/#/formatting?id=table-of-tokens) for available format tokens.

```ts
lastUpdatedPlugin({ format: 'dd-MM-yyyy HH:mm:ss' })
```

::: tip Note
The plugin uses `yyyy-MM-dd HH:mm:ss ZZZZ` as default format, when none is given.

Example output: **_2023-03-19 16:09:20 GMT+1_**
:::