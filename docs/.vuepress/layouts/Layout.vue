<script setup>
import { computed } from 'vue';
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
import VersionWarning from "./components/VersionWarning.vue";
import Navigation from "../navigation";
import {usePageData} from "@vuepress/client";

const page = usePageData();

/**
 * Determine if warning must be shown for upcoming version docs...
 *
 * @type {ComputedRef<*>}
 */
const showWarningForNext = computed(
    () => {
      let next = Navigation.nextLink;
      let path = page.value.path;

      return path.includes(next);
    }
)

/**
 * Determine if warning must be shown for outdated version docs...
 *
 * @type {ComputedRef<*>}
 */
const showWarningForOutdated = computed(
    () => {
      let home = '/';
      let next = Navigation.nextLink;
      let current = Navigation.currentLink;
      let path = page.value.path;

      console.log('PATH', path);

      return path !== home
          && !path.includes(next)
          && !path.includes(current);
    }
)
</script>

<template>
  <ParentLayout>
    <template #page-top>

      <!-- When viewing docs. for next version -->
      <VersionWarning v-if="showWarningForNext" type="info">
        You are viewing documentation for an upcoming version. <strong>It has not yet been released!</strong>!
      </VersionWarning>

      <!-- When viewing docs. for outdated version -->
      <VersionWarning v-if="showWarningForOutdated">
        You are viewing documentation for an outdated version. <strong>It is no longer supported!</strong>
      </VersionWarning>

    </template>
  </ParentLayout>
</template>
