import { DateTime } from 'luxon';
import type { Page, PageData, PluginObject } from 'vuepress';

/**
 * Options for the Last Updated formatter
 */
export interface LastUpdatedOptions {
    /**
     * Luxon format string
     */
    format?: string;
}

/**
 * Refactored Last Updated Plugin for VuePress 2 (Pure TypeScript)
 *
 * This version updates page.date to encourage the theme to use the custom format.
 *
 * @param {LastUpdatedOptions} options
 *
 * @returns {PluginObject}
 */
export function lastUpdatedPlugin(options: LastUpdatedOptions = {}): PluginObject
{
    const { format = 'yyyy-MM-dd HH:mm:ss' } = options;

    return {
        name: '@aedart/vuepress-utils/last-updated',

        /**
         * Server-side hook to extend page data during the build/dev process.
         *
         * @param {Page} page
         *
         * @returns {void}
         */
        extendsPage(page: Page): void
        {
            // Extract the Git timestamp (requires @vuepress/plugin-git)
            // @ts-expect-error updatedTime "should" be in the git object.
            const updatedTime = ((page.data as PageData).git as object)?.updatedTime as number;

            if (updatedTime) {
                const formatted = DateTime.fromMillis(updatedTime)
                    .toFormat(format);

                /**
                 * We set page.date in addition to lastUpdated.
                 * Themes often use page.date as the primary source for post/page timing.
                 */
                page.date = formatted;

                // Fallback for themes specifically looking at the data object
                page.data.lastUpdated = formatted;

                // Also overwrite frontmatter to be safe
                page.frontmatter.lastUpdated = formatted;
            }
        },
    };
}
