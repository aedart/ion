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

    theme: defaultTheme({
        repo: 'aedart/ion',
        editLink: true,
        editLinkText: 'Edit page',
        //editLinkPattern: ':repo/-/edit/:branch/:path',
        docsRepo: 'https://github.com/aedart/ion',
        docsBranch: 'main',
        docsDir: 'docs',

        lastUpdated: true,
        lastUpdatedText: 'Last Updated',

        navbar: [
            { text: 'Packages', link: '/archive/current/' },
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
