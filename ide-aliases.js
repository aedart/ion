/*****************************************************************
 * Webpack Configuration (to trick IDE understanding imports)
 *
 * For PHP Storm:
 * File > Settings > Languages & Frameworks > JavaScript > Webpack
 ****************************************************************/
const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@aedart/xyz': path.resolve(__dirname, './packages/xyz/src'),
        },
    },
}
