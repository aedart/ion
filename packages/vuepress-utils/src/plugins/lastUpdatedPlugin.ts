import type { Plugin, Page } from '@vuepress/core';
import type {DateTimeJSOptions} from "luxon/src/datetime";
import { getDirname, path } from "@vuepress/utils"

// @ts-ignore
const __dirname = getDirname(import.meta.url);

/**
 * Last Updated Plugin Options 
 */
export interface lastUpdatedPluginOptions
{
    /**
     * Datetime format
     * 
     * @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens
     */
    format?: string;

    /**
     * Datetime Options
     */
    options?: DateTimeJSOptions;
}

/**
 * Formats the last updated timestamp according to given format
 * 
 * @param {string | undefined} [format='yyyy-MM-dd HH:mm:ss ZZZZ']
 * @param {import('luxon/src/datetime').DateTimeJSOptions | undefined} [options={}]
 * 
 * @returns {import('@vuepress/core').Plugin}
 */
export const lastUpdatedPlugin = ({
    format = 'yyyy-MM-dd HH:mm:ss ZZZZ',
    options = {}
}: lastUpdatedPluginOptions = {} ): Plugin => {
    return {
        name: 'last-updated-plugin',
        
        extendsPage: (page: Page) => {
            // @ts-ignore
            page.data.lastUpdatedDateFormat = format;
            // @ts-ignore
            page.data.lastUpdatedDateOptions = options;
        },

        alias: {
            '@theme/PageMeta.vue': path.resolve(
                __dirname,
                '../components/plugins/LastUpdatedPlugin.vue' // In "dist" directory 
            ), 
        }
    };
}