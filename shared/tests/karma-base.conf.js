const webpackConfiguration = require('./webpack.config');

/*****************************************************************
 * High level setup...
 ****************************************************************/

// Set the CHROME_BIN env
process.env.CHROME_BIN = require('puppeteer').executablePath();

// Path to tests
const TESTS_PATH_PATTERN = 'tests/browser/packages/**/*.test.js';

/*****************************************************************
 * Karma (Base) Configuration
 ****************************************************************/

module.exports = function (config) {
    return {

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '../..',


        // frameworks to use
        // available frameworks: https://www.npmjs.com/search?q=keywords:karma-adapter
        frameworks: [
            'jasmine',
            'webpack'
        ],


        // list of files / patterns to load in the browser
        files: [
          {
            pattern: TESTS_PATH_PATTERN,

            // !!! use watched: false as we use webpacks watch
            watched: false
          },
        ],


        // list of files / patterns to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://www.npmjs.com/search?q=keywords:karma-preprocessor
        preprocessors: {
          [TESTS_PATH_PATTERN]: ['webpack'],
        },

        // Apply Webpack config...
        webpack: webpackConfiguration,
        webpackMiddleware: {
          // webpack-dev-middleware configuration
          stats: 'errors-only'
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://www.npmjs.com/search?q=keywords:karma-reporter
        reporters: ['spec'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://www.npmjs.com/search?q=keywords:karma-launcher
        browsers: [
            'Chrome'
            // 'Firefox'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser instances should be started simultaneously
        concurrency: Infinity
    };
}
