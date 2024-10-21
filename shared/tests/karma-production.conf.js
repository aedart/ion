module.exports = async (config) => {

    console.group('Test Environment');
    console.info('Production');
    console.groupEnd();

    const baseConfiguration = (await import('./karma-base.conf.cjs')).default;
    const resolved = await baseConfiguration(config);
    
    config.set(Object.assign(
        resolved,
        {
            browsers: [
                'Chrome',
                'Firefox',
            ],
        }
    ));
}

