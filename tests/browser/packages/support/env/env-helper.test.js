import { Env, env } from "@aedart/support/env";

describe('@aedart/support/env', () => {

    afterEach(() => {
        Env.clear();
    });

    describe('env (helper)', () => {

        it('can retrieve variable', () => {
            const key = 'APP_ENV';
            const valueA = 'development';

            // -------------------------------------------------------------------- //

            Env.define({
                [key]: valueA
            }, false);

            // -------------------------------------------------------------------- //

            const result = env(key);

            expect(result)
                .withContext('Incorrect value for key')
                .toBe(valueA);
        });

        it('returns default value', () => {
            Env.define({
                // N/A
            }, false);

            // -------------------------------------------------------------------- //

            const defaultValue = 'testing';
            const result = env('APP_ENV', defaultValue);

            expect(result)
                .withContext('Incorrect default value for key')
                .toBe(defaultValue);
        });

    });
});