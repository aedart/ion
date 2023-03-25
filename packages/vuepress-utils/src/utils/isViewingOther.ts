import {Archive} from "@aedart/vuepress-utils/contracts";
import type { PageDataRef } from '@vuepress/client';
import {computed, ComputedRef} from "vue";
import { isViewingNext } from "./isViewingNext";
import { isViewingCurrent } from "./isViewingCurrent";

/**
 * Determine if neither "current" nor "next" pages collection are being viewed
 *
 * @param {import('@vuepress/client').PageDataRef} page
 * @param {Archive} archive
 * @param {string[]} [exclude=[ '/' ]] Paths to exclude from result
 *
 * @returns {boolean}
 */
export function isViewingOther(page: PageDataRef, archive: Archive, exclude: string[] = [ '/' ]): boolean
{
    let path = page.value.path;

    return !exclude.includes(path)
        && !isViewingNext(page, archive)
        && !isViewingCurrent(page, archive);
}

/**
 * Returns a computed property that determines if neither "current" nor "next" pages
 * collection are being viewed
 *
 * @param {import('@vuepress/client').PageDataRef} page
 * @param {Archive} archive
 * @param {string[]} [exclude=[ '/' ]] Paths to exclude from result
 *
 * @returns {import('vue').ComputedRef<boolean>}
 */
export function isViewingOtherRef(page: PageDataRef, archive: Archive, exclude: string[] = [ '/' ]): ComputedRef<boolean>
{
    return computed(() => {
        return isViewingOther(page, archive, exclude);
    });
}