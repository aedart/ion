import {defaultTheme, defineUserConfig, Page} from 'vuepress';
import {backToTopPlugin} from "@vuepress/plugin-back-to-top";
import {searchPlugin} from "@vuepress/plugin-search";
import Navigation from "./navigation";

/**
 * Vuepress configuration for docs...
 */
export default defineUserConfig({
    base: resolveBasePath(),
    dest: './.build',
    lang: 'en-GB',
    title: 'Ion',
    description: 'Ion Official Documentation',

    head: [
        // Icon
        ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/icon/apple-touch-icon.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/images/icon/favicon-32x32.png' }],
        ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/images/icon/favicon-16x16.png' }],
        ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ],

    theme: defaultTheme({
        repo: 'aedart/ion',

        // Due to strange date format, and comparison, when situated in a different
        // timezone, e.g. Denmark (UTC + 01:00), then dark/light mode switches
        // incorrectly, when set to 'auto'!
        colorMode: 'light',
        logo: '/images/icon/apple-touch-icon.png',

        editLink: true,
        editLinkText: 'Edit page',
        //editLinkPattern: ':repo/-/edit/:branch/:path',

        docsRepo: 'https://github.com/aedart/ion',
        docsBranch: 'main',
        docsDir: 'docs',

        lastUpdated: true,
        lastUpdatedText: 'Last Updated',

        navbar: [
            { text: 'Packages', link: '/archive/current/packages/' },
            {
                text: 'Archive',
                link: '/archive/',
                children: Navigation.archiveItems(),
            },
            { text: 'Changelog', link: 'https://github.com/aedart/ion/blob/main/CHANGELOG.md' },
        ],

        sidebar: Navigation.sidebarItems()
    }),

    plugins: [

        backToTopPlugin(),

        searchPlugin({
            maxSuggestions: 10,

            isSearchable: (page: Page) => {
                return page.path.includes('/archive/current/');
            },

            getExtraFields: (page: Page) => {
                return [page.frontmatter.description] ?? [];
            },
        }),
    ]
});

/**
 * Resolves "base" path
 *
 * @returns {string}
 */
function resolveBasePath() {
    console.info('ENVIRONMENT', process.env.NODE_ENV);
    if(process.env.NODE_ENV === 'development'){
        return '/';
    }

    return '/ion/';
}
