import {Archive} from "@aedart/vuepress-utils/contracts";
import type { PageDataRef } from '@vuepress/client';
import {computed, ComputedRef} from "vue";

/**
 * Determine if "next" pages collection is being viewed
 * 
 * @param {import('@vuepress/client').PageDataRef} page
 * @param {Archive} archive
 * 
 * @returns {boolean}
 */
export function isViewingNext(page: PageDataRef, archive: Archive): boolean
{
    const next = archive.nextFullPath;
    const path = page.value.path;

    return path.startsWith(next);
}

/**
 * Returns a computed property that determines if "next" pages collection is being viewed
 * 
 * @param {import('@vuepress/client').PageDataRef} page
 * @param {Archive} archive
 * 
 * @returns {import('vue').ComputedRef<boolean>}
 */
export function isViewingNextRef(page: PageDataRef, archive: Archive): ComputedRef<boolean>
{
    return computed(() => {
        return isViewingNext(page, archive);
    });
}