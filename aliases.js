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
            // container
            '@aedart/container': path.resolve(__dirname, './packages/container/src'),

            // contracts
            '@aedart/contracts/container': path.resolve(__dirname, './packages/contracts/container'),
            '@aedart/contracts/support/arrays': path.resolve(__dirname, './packages/contracts/support/arrays'),
            '@aedart/contracts/support/concerns': path.resolve(__dirname, './packages/contracts/support/concerns'),
            '@aedart/contracts/support/exceptions': path.resolve(__dirname, './packages/contracts/support/exceptions'),
            '@aedart/contracts/support/facades': path.resolve(__dirname, './packages/contracts/support/facades'),
            '@aedart/contracts/support/meta': path.resolve(__dirname, './packages/contracts/support/meta'),
            '@aedart/contracts/support/mixins': path.resolve(__dirname, './packages/contracts/support/mixins'),
            '@aedart/contracts/support/objects': path.resolve(__dirname, './packages/contracts/support/objects'),
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