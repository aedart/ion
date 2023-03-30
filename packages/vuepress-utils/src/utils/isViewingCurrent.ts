import {Archive} from "@aedart/vuepress-utils/contracts";
import type { PageDataRef } from '@vuepress/client';
import {computed, ComputedRef} from "vue";

/**
 * Determine if "current" pages collection is being viewed
 *
 * @param {import('@vuepress/client').PageDataRef} page
 * @param {Archive} archive
 *
 * @returns {boolean}
 */
export function isViewingCurrent(page: PageDataRef, archive: Archive): boolean
{
    const current = archive.currentFullPath;
    const path = page.value.path;

    return path.startsWith(current);
}

/**
 * Returns a computed property that determines if "current" pages collection is being viewed
 *
 * @param {import('@vuepress/client').PageDataRef} page
 * @param {Archive} archive
 *
 * @returns {import('vue').ComputedRef<boolean>}
 */
export function isViewingCurrentRef(page: PageDataRef, archive: Archive): ComputedRef<boolean>
{
    return computed(() => {
        return isViewingCurrent(page, archive);
    });
}