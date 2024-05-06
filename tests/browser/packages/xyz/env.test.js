describe('@aedart/xyz', () => {
    describe('.env experiment', () => {

        // This test is only able to pass if the "@import-meta-env/babel" babel plugin
        // has been installed, and .env.example and .env files exists in the root of
        // the project. DO NOT ENABLE THIS TEST IN CI!
        xit('can read import.meta.env', () => {
            // Debug
            // console.log('ENV', import.meta.env.FOO);
            
            const foo = import.meta.env.FOO;
            
            expect(foo)
                .toBe('BAR');
        });

        // @see https://import-meta-env.org/guide/getting-started/introduction.html#special-expression
        xit('can iterate through properties in import.meta.env', () => {
            
            console.log('import_meta_env', globalThis.import_meta_env);
            console.log('FOO', import.meta.env.FOO);
            console.log('Entries', Object.entries(import.meta.env));
            
            const env = import.meta.env;

            for (const property in env) {
                console.log(`${property}: ${env[property]}`);
            }
        });

        xit('can read and parse .env file', () => {

            // globalThis.import_meta_env = JSON.parse('"import_meta_env_placeholder"');
            
            console.log('FOO', import.meta.env.FOO);
            console.log('import_meta_env', globalThis.import_meta_env);
        });

        // WINNER: This seems to be the most practical solution - or at least when using Webpack.
        // Similar solutions SHOULD be available for babel, rollup, and plain typescript.
        it('can read injected environment variables (via Webpack)', () => {
            // Using the dotenv module and webpack, the contents if .env is injected into the _ENV
            // variable.
            // @see webpack.config.js
            //console.log('ENV', __ENV__);

            /** @typedef {object} __ENV__ */

            const ENV = __ENV__;
            
            expect(ENV)
                .withContext('_ENV has not been injected')
                .not
                .toBeUndefined();
            
            expect(Reflect.has(ENV, 'FOO'))
                .withContext('FOO does not exists in .env')
                .toBeTrue();
            
            expect(ENV.FOO)
                .toBe('BAR');
        });
    });
});