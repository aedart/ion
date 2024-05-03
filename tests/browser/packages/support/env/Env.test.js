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
    });
});