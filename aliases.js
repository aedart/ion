/*****************************************************************
 * Webpack Configuration (to trick IDE understanding imports)
 *
 * For PHP Storm:
 * File > Settings > Languages & Frameworks > JavaScript > Webpack
 ****************************************************************/
const path = require('path');

module.exports = {
    resolve: {
        // NOTE: Not sure how this is intended to work... if at all!?
        // @see https://webpack.js.org/configuration/resolve/#resolvedescriptionfiles
        // descriptionFiles: [
        //     path.resolve(__dirname, './packages/vuepress-utils/package.json'),
        //     path.resolve(__dirname, './packages/xyz/package.json'),
        //     path.resolve(__dirname, './package.json')
        // ],
        // conditionNames: ['require', 'import'],

        alias: {
            // contracts
            '@aedart/contracts/support/meta': path.resolve(__dirname, './packages/contracts/support/meta'),
            '@aedart/contracts/support/mixins': path.resolve(__dirname, './packages/contracts/support/mixins'),
            '@aedart/contracts/support/reflections': path.resolve(__dirname, './packages/contracts/support/reflections'),
            '@aedart/contracts/support': path.resolve(__dirname, './packages/contracts/support'),
            '@aedart/contracts': path.resolve(__dirname, './packages/contracts/src'),
            
            // support
            '@aedart/support': path.resolve(__dirname, './packages/support/src'),
            
            // vuepress-utils
            '@aedart/vuepress-utils/components': path.resolve(__dirname, './packages/vuepress-utils/src/components'),
            '@aedart/vuepress-utils/contracts': path.resolve(__dirname, './packages/vuepress-utils/src/contracts'),
            '@aedart/vuepress-utils/navigation': path.resolve(__dirname, './packages/vuepress-utils/src/navigation'),
            '@aedart/vuepress-utils/plugins': path.resolve(__dirname, './packages/vuepress-utils/src/plugins'),
            '@aedart/vuepress-utils': path.resolve(__dirname, './packages/vuepress-utils/src'),

            // xyz
            '@aedart/xyz': path.resolve(__dirname, './packages/xyz/src'),
        },
    },
}