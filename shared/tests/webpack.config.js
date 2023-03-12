const fs = require('fs');

/*****************************************************************
 * Load babel presents...
 ****************************************************************/

const babel = JSON.parse(
    fs.readFileSync('babel.config.json', 'utf8')
);
console.debug('Babel presets', babel.presets);

/*****************************************************************
 * Webpack Configuration (for tests)
 * @see https://webpack.js.org/concepts/
 ****************************************************************/

module.exports = {
    // output: {
    //     filename: 'bundle.js'
    // },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/,
                ],
                loader: "babel-loader",
                options: {
                    presets : babel.presets
                }
            }
        ]
    }
};
