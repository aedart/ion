<script setup lang="ts">
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue';
import VersionDisclaimer from "@aedart/vuepress-utils/components/VersionDisclaimer.vue";
import {usePageData} from "@vuepress/client";
import {isViewingNextRef, isViewingOtherRef} from "@aedart/vuepress-utils";
import archive from "../archive";

/**
 * Page data...
 * 
 * @type {PageDataRef<Record<never, never>>}
 */
const page = usePageData();

/**
 * Determine if warning must be shown for upcoming version docs...
 *
 * @type {ComputedRef<boolean>}
 */
const showWarningForNext = isViewingNextRef(page, archive);

/**
 * Determine if warning must be shown for outdated version docs...
 *
 * @type {ComputedRef<boolean>}
 */
const showWarningForOutdated = isViewingOtherRef(page, archive);

</script>

<template>
  <ParentLayout>
    <template #page-top>

      <!-- When viewing docs. for next version -->
      <VersionDisclaimer v-if="showWarningForNext">
        You are viewing documentation for an upcoming version. <strong>It has not yet been released!</strong>!
      </VersionDisclaimer>

      <!-- When viewing docs. for outdated version -->
      <VersionDisclaimer v-if="showWarningForOutdated" type="danger" label="Warning">
        You are viewing documentation for an outdated version. <strong>It is no longer supported!</strong>
      </VersionDisclaimer>

    </template>
  </ParentLayout>
</template>
