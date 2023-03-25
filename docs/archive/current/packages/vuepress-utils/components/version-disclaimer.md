---
title: Version Disclaimer
description: A simple notice container
sidebarDepth: 0
---

# Version Disclaimer

The `<VersionDisclaimer />` component is a simply "notice" container, which can be used in your layout.
Most often, you would use this to display a custom message when outdated / unsupported documentation is being viewed.

```vue
<VersionDisclaimer type="warning" label="Note">
    You are viewing documentation for an unsupported version...
</VersionDisclaimer>
```

## Properties

### `type` (_optional_)

The `type` property accepts the following values:

* `info` (_default_)
* `warning`
* `danger`

### `label` (_optional_)

An optional label that is used as a prefix for the custom disclaim message.

## Extend Default Layout

The following example assumes that you are using an [`Archive` component](../navigation/archive.md) to structure documentation.
When doing so, you can display a custom message whenever "outdated" or "upcoming" documentation is being viewed. 

To achieve this, you will need to create a [custom layout](https://v2.vuepress.vuejs.org/advanced/theme.html#create-a-theme) (_e.g. extend the default theme_).
Create a new layout, e.g. in `.vuepress/layouts/Layout.vue`.

```vue
<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
import VersionDisclaimer from "@aedart/vuepress-utils/components/VersionDisclaimer.vue";
import {usePageData} from "@vuepress/client";
import {isViewingNextRef, isViewingOtherRef} from "@aedart/vuepress-utils";
import archive from "../my_archive";

const page = usePageData();
const showForNext = isViewingNextRef(page, archive);
const showForOther = isViewingOtherRef(page, archive);
</script>

<template>
  <ParentLayout>
    <template #page-top>
        
      <VersionDisclaimer v-if="showForNext">
        You are viewing documentation for next version...
      </VersionDisclaimer>
        
      <VersionDisclaimer v-if="showForOther" type="danger" label="Oh oh">
        You are viewing old stuff...
      </VersionDisclaimer>

    </template>
  </ParentLayout>
</template>
```

The `isViewingNextRef()` method returns a computed property that indicates if visitor is viewing the ["next" collection of pages](../navigation/archive.md#current--next).
The `isViewingOtherRef()` methods returns a computed property that determines if pages are viewed that do not belong to "next" nor "current" collections.

## Client Config

In your [Client Config File](https://v2.vuepress.vuejs.org/guide/configuration.html#client-config-file), use the custom `Layout`.

```ts
import { defineClientConfig } from '@vuepress/client';
import Layout from "./layouts/Layout.vue";

export default defineClientConfig({
    layouts: {
        Layout
    }
});
```
