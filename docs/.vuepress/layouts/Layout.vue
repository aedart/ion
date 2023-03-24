<script setup lang="ts">
import { computed } from 'vue';
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
import VersionDisclaimer from "@aedart/vuepress-utils/components/VersionDisclaimer.vue";
import Archive from "../archive";
import {usePageData} from "@vuepress/client";

const page = usePageData();

/**
 * Determine if warning must be shown for upcoming version docs...
 *
 * @type {ComputedRef<*>}
 */
const showWarningForNext = computed(
    () => {
      let next = Archive.nextFullPath;
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
      let next = Archive.nextFullPath;
      let current = Archive.currentFullPath;
      let path = page.value.path;

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
      <VersionDisclaimer v-if="showWarningForNext" type="info">
        You are viewing documentation for an upcoming version. <strong>It has not yet been released!</strong>!
      </VersionDisclaimer>

      <!-- When viewing docs. for outdated version -->
      <VersionDisclaimer v-if="showWarningForOutdated">
        You are viewing documentation for an outdated version. <strong>It is no longer supported!</strong>
      </VersionDisclaimer>

    </template>
  </ParentLayout>
</template>
