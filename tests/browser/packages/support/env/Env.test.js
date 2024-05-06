import { Env, WriteError } from "@aedart/support/env";

describe('@aedart/support/env', () => {
    
    afterEach(() => {
        Env.clear();
    });
    
    describe('Env', () => {

        it('can define environment variables', () => {

            const key = 'APP_ENV';
            const value = 'development';

            // -------------------------------------------------------------------- //
            
            Env.define({
                [key]: value
            }, false);
            
            // -------------------------------------------------------------------- //
            
            expect(Env.has(key))
                .withContext('Key does not appear to exist')
                .toBeTrue();

            expect(Env.get(key))
                .withContext('Incorrect value for key')
                .toBe(value);
        });

        it('can change environment variables when not defined as safe', () => {

            const key = 'APP_ENV';
            const valueA = 'development';
            const valueB = 'production';

            Env.define({
                [key]: valueA
            }, false);
            
            // -------------------------------------------------------------------- //

            Env.repository.set(key, valueB)
            
            // -------------------------------------------------------------------- //
            
            expect(Env.get(key))
                .withContext('Incorrect value for key')
                .toBe(valueB);
        });

        it('fails changing variable when defined as safe', () => {

            const key = 'APP_ENV';
            const valueA = 'development';
            const valueB = 'production';

            Env.defineSafe({
                [key]: valueA
            });

            // -------------------------------------------------------------------- //

            const callback = () => {
                Env.repository.set(key, valueB);    
            }
            
            expect(callback)
                .toThrowError(WriteError);
        });

        it('outside changes to variables are not reflected, when defined as safe', () => {

            const key = 'APP_ENV';
            const valueA = 'development';
            const valueB = 'production';

            const variables = {
                [key]: valueA
            };
            
            Env.defineSafe(variables);

            // -------------------------------------------------------------------- //

            variables[key] = valueB;
            
            // -------------------------------------------------------------------- //

            expect(Env.get(key))
                .withContext('Incorrect value for key')
                .toBe(valueA);
        });

        it('can use variables from .env file', () => {
            // NOTE: This requires using the "dotenv" component in the webpack
            // configuration.
            // @see shared/tests/webpack.config.js
            // @see .env.example

            /** @typedef {Record<PropertyKey, any>} __ENV__ */

            Env.defineSafe(__ENV__);

            // Debug
            // console.log('__ENV__', __ENV__);
            
            // -------------------------------------------------------------------- //
            
            // Foo / Bar
            expect(Env.get('FOO'))
                .withContext('Incorrect FOO value')
                .toBe('BAR');

            // Null
            expect(Env.get('NULL_VAL_TRUE'))
                .withContext('Incorrect NULL_VAL_TRUE value')
                .toBeNull();
            
            // Boolean
            expect(Env.get('BOOL_VAL_TRUE'))
                .withContext('Incorrect BOOL_VAL_TRUE value')
                .toBeTrue();
            expect(Env.get('BOOL_VAL_FALSE'))
                .withContext('Incorrect BOOL_VAL_FALSE value')
                .toBeFalse();

            // String
            expect(Env.get('STR_VAL_EMPTY'))
                .withContext('Incorrect STR_VAL_EMPTY value')
                .toBe('');
            expect(Env.get('STR_VAL_NO_QUOTE'))
                .withContext('Incorrect STR_VAL_NO_QUOTE value')
                .toBe('Okay');
            expect(Env.get('STR_VAL_SINGLE_QUOTE'))
                .withContext('Incorrect STR_VAL_SINGLE_QUOTE value')
                .toBe('Beauty is a rainy whale.');
            expect(Env.get('STR_VAL_DOUBLE_QUOTE'))
                .withContext('Incorrect STR_VAL_DOUBLE_QUOTE value')
                .toBe('Arrr, endurance!');
            expect(Env.get('STR_VAL_MULTI_LINE'))
                .withContext('Incorrect STR_VAL_MULTI_LINE value')
                .toBe("Ares de fin.\nMu verci.");
        });
    });
});