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
            // vuepress-utils
            '@aedart/vuepress-utils/contracts': path.resolve(__dirname, './packages/vuepress-utils/src/contracts'),
            '@aedart/vuepress-utils/navigation': path.resolve(__dirname, './packages/vuepress-utils/src/navigation'),
            '@aedart/vuepress-utils/utils': path.resolve(__dirname, './packages/vuepress-utils/src/utils'),
            '@aedart/vuepress-utils': path.resolve(__dirname, './packages/vuepress-utils/src'),
            
            // xyz
            '@aedart/xyz': path.resolve(__dirname, './packages/xyz/src'),
        },
    },
}
