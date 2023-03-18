import {defaultTheme, defineUserConfig} from 'vuepress';

export default defineUserConfig({
    //dest: '.build',
    lang: 'en-GB',
    title: 'Ion',
    description: 'Ion Official Documentation',

    theme: defaultTheme({
        editLink: true,
        editLinkText: 'Edit page on GitHub',
        //editLinkPattern: ':repo/-/edit/:branch/:path',
        docsRepo: 'https://github.com/aedart/ion',
        docsBranch: 'main',
        docsDir: 'docs',

        lastUpdated: true,
        lastUpdatedText: 'Last Updated'
    })
});
