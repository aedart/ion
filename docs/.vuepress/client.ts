import type { ClientConfig } from '@vuepress/client';
// @ts-ignore
import Layout from "./layouts/Layout.vue";

export default {
    enhance({ app, router, siteData }) {},
    setup() {},
    rootComponents: [],
    layouts: {
        Layout
    }
} as ClientConfig;
