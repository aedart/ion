const baseConfiguration = require('./karma-base.conf');

module.exports = function(config) {

    console.group('Test Environment');
    console.info('Development');
    console.groupEnd();

    config.set(Object.assign(
        baseConfiguration(config),
        {
            browsers: [
                'ChromeHeadlessNoSandbox',
                'FirefoxHeadless'
            ],
            customLaunchers: {
                ChromeHeadlessNoSandbox: {
                    base: 'ChromeHeadless',
                    flags: ['--no-sandbox', '--disable-gpu'],
                }
            }
        }
    ));
}

