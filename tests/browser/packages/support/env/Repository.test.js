import { Repository } from "@aedart/support/env";

describe('@aedart/support/env', () => {
    describe('Repository', () => {

        it('can read value for environment variable', () => {

            const key = 'APP_ENV';
            const value = 'development';
            
            const repo = new Repository({
                [key]: value
            });
            
            // -------------------------------------------------------------------- //
            
            expect(repo.has(key))
                .withContext('Key does not appear to exist')
                .toBeTrue();

            expect(repo.get(key))
                .withContext('Incorrect value for key')
                .toBe(value);
        });

        it('returns default value when environment variable does not exist', () => {
            
            const repo = new Repository({
                // N/A
            });

            // -------------------------------------------------------------------- //

            const key = 'APP_ENV';
            
            expect(repo.has(key))
                .withContext('Key should not exist')
                .toBeFalse();

            const defaultValue = 'testing';
            expect(repo.get(key, defaultValue))
                .withContext('Incorrect default value for key')
                .toBe(defaultValue);
        });

        it('can set value for environment variable', () => {

            const repo = new Repository({
                // N/A
            });

            // -------------------------------------------------------------------- //

            const key = 'APP_ENV';
            const value = 'local';
            
            repo.set(key, value);
            
            // -------------------------------------------------------------------- //

            expect(repo.has(key))
                .withContext('Key does not appear to exist')
                .toBeTrue();

            expect(repo.get(key))
                .withContext('Incorrect value for key')
                .toBe(value);
        });

        it('can forget environment variable', () => {
            const key = 'APP_ENV';
            const value = 'development';

            const repo = new Repository({
                [key]: value
            });

            // -------------------------------------------------------------------- //
            
            const result = repo.forget(key);
            
            // -------------------------------------------------------------------- //

            expect(result)
                .withContext('Repository failed to delete variable')
                .toBeTrue();

            expect(repo.has(key))
                .withContext('Key should not exist')
                .toBeFalse();
        });
    });
});