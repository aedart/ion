import type { Plugin, Page } from '@vuepress/core';
import { getDirname, path } from "@vuepress/utils"
import {DateTimeJSOptions} from "luxon/src/datetime";

// @ts-ignore
const __dirname = getDirname(import.meta.url);

/**
 * Formats the last updated datetime according to given format
 * 
 * @see https://moment.github.io/luxon/#/formatting?id=table-of-tokens
 * 
 * @param {string} format
 * @param {DateTimeJSOptions} [options]
 * 
 * @returns {Plugin}
 */
export const lastUpdatedPlugin = (format: string = 'yyyy-LL-dd HH:mm:ss ZZZZ', options: DateTimeJSOptions = {}): Plugin => ({
    name: 'last-updated-plugin',

    //clientConfigFile: path.resolve(__dirname, '../client/config.js'),

    // DON'T use the global injectors. Seems a bit too risky!
    // define: {
    //     __LAST_UPDATED_DATE_FORMAT__: format,
    //     __LAST_UPDATED_OPTIONS__: options,
    // },

    onInitialized: (app) => {
        // Debug
        //console.log('Last Updated Plugin...');
    },

    extendsPage: (page: Page) => {
        // @ts-ignore
        page.data.lastUpdatedDateFormat = format;
        // @ts-ignore
        page.data.lastUpdatedDateOptions = options;
    },
    
    // Replace default shown "last updated" format!
    alias: {
        '@theme/PageMeta.vue': path.resolve(__dirname, '../layouts/components/PageMeta.vue'),  
    }
})