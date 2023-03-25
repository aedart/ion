<script setup lang="ts">
// @ts-ignore
import ParentPageMeta from '@vuepress/theme-default/components/PageMeta.vue';
import {onMounted, nextTick} from "vue";
import {usePageData} from "@vuepress/client";
import { DateTime } from 'luxon';

onMounted(() =>
{
    const page = usePageData();

    // Obtain timestamp from git (unix timestamp), or abort...
    const timestamp = page.value.git?.updatedTime ?? null;
    if (!timestamp) {
        return;
    }

    // Resolve format and options from page's data...
    // @ts-ignore
    let format = page.value.lastUpdatedDateFormat ?? 'yyyy-LL-dd HH:mm:ss';
    // @ts-ignore
    let options = page.value.lastUpdatedDateOptions ?? {};
    
    // Convert into a date and format as UTC
    let date = DateTime
        .fromMillis(timestamp, options)
        .toFormat(format);
    
    // Find DOM element and replace "last updated" value.
    // This is NOT pretty... but it works!
    nextTick(() =>
    {
        const el = document.querySelector('.last-updated > span.meta-item-info');
        el.innerHTML = date;
        el.setAttribute('title', DateTime.fromMillis(timestamp).toRelative());
    });
});

</script>

<template>
    <ParentPageMeta/>
</template>
