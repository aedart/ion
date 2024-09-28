import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('environment', () => {

        it('defaults to "production" when no environment detected', () => {
            const app = new Application();
            
            expect(app.isLocal())
                .withContext('application environment should NOT be "local"')
                .toBeFalse();

            expect(app.isTesting())
                .withContext('application environment should NOT be "testing"')
                .toBeFalse();

            expect(app.isProduction())
                .withContext('application environment SHOULD be "production"')
                .toBeTrue();
        });

        it('can specify custom application detection callback', () => {
            const app = new Application();
            
            const env = 'alpha';
            const result = app.detectEnvironment(() => env);

            // ------------------------------------------------------------------------------- //
            
            expect(result)
                .withContext('Custom detect callback failed')
                .toBe(env);

            expect(app.environment)
                .withContext('app.environment should match custom detected environment')
                .toBe(env);
            
            expect(app.isEnvironment(env))
                .withContext('isEnvironment() should match custom detected environment')
                .toBeTrue();
        });
    });
});