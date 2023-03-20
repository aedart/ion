<script setup lang="ts">
// @ts-ignore
import ParentPageMeta from '@vuepress/theme-default/components/PageMeta.vue';
import {onMounted, nextTick} from "vue";
import {usePageData} from "@vuepress/client";

onMounted(() => {
  const page = usePageData();

  // Obtain timestamp from git (unix timestamp), or abort...
  const timestamp = page.value.git?.updatedTime ?? null;
  if (!timestamp) {
    return;
  }

  // Convert into a date and format as UTC
  let date = (new Date(timestamp)).toUTCString();

  // Find DOM element and replace "last updated" value.
  nextTick(() => {
    const el = document.querySelector('.last-updated > span.meta-item-info');

    // Debug
    //console.log('Setting last updated at date', date, el);

    el.innerHTML = date;
  });
});

</script>

<template>
  <ParentPageMeta />
</template>
