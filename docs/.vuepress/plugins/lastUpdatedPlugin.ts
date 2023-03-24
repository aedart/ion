import type { Plugin } from '@vuepress/core';
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

    // TODO: WARNING... These become global variables. Perhaps we should inject format into page data instead!
    define: {
        __LAST_UPDATED_DATE_FORMAT__: format,
        __LAST_UPDATED_OPTIONS__: options,
    },

    onInitialized: (app) => {
        // Debug
        //console.log('Last Updated Plugin...');
    },

    // Replace default shown "last updated" format!
    alias: {
        '@theme/PageMeta.vue': path.resolve(__dirname, '../layouts/components/PageMeta.vue'),  
    }
})