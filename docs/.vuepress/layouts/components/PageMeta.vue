<script setup lang="ts">
// @ts-ignore
import ParentPageMeta from '@vuepress/theme-default/components/PageMeta.vue';
import {onMounted, nextTick} from "vue";
import {usePageData} from "@vuepress/client";
import { DateTime } from 'luxon';

/**
 * Global format from plugin...
 *
 * @see lastUpdatedPlugin.define
 */
const lastUpdatedFormat = __LAST_UPDATED_DATE_FORMAT__;

/**
 * Global options from plugin
 *
 * @see lastUpdatedPlugin.define
 */
const lastUpdatedOptions = __LAST_UPDATED_OPTIONS__;

onMounted(() =>
{
    const page = usePageData();

    // Obtain timestamp from git (unix timestamp), or abort...
    const timestamp = page.value.git?.updatedTime ?? null;
    if (!timestamp) {
        return;
    }

    // Debug
    //console.log('Timestamp', timestamp);
    
    // Resolve options...
    let options = lastUpdatedOptions ?? {};
    
    // Convert into a date and format as UTC
    let date = DateTime
        .fromMillis(timestamp, options)
        .toFormat(lastUpdatedFormat);
    
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
