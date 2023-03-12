const baseConfiguration = require('./karma-base.conf');

module.exports = function(config) {

    console.group('Test Environment');
    console.info('Production');
    console.groupEnd();

    config.set(Object.assign(
        baseConfiguration(config),
        {
            browsers: [
                'Chrome',
                'Firefox',
            ],
        }
    ));
}

