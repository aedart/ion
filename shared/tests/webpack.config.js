const fs = require('node:fs');
const dotEnv = require('dotenv');
const webpack = require('webpack');

/*****************************************************************
 * Load babel presents...
 ****************************************************************/

const babel = JSON.parse(
    fs.readFileSync('babel.config.json', 'utf8')
);
console.debug('Babel presets', babel.presets);

/*****************************************************************
 * Load .env content
 ****************************************************************/

const ENV = dotEnv.parse(
    fs.readFileSync('.env', 'utf8')
);
// console.debug('.env', ENV);

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
                    presets : babel.presets,
                    plugins: babel.plugins
                }
            }
        ],
    },
    plugins: [
        
        // Inject environment variables into token 
        new webpack.DefinePlugin({
            _ENV: JSON.stringify(ENV)
        })
    ]
};
