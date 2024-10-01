import { Application, LoadEnvironmentVariables } from "@aedart/core";
import { Env } from "@aedart/support/env";

describe('@aedart/core', () => {
    describe('bootstrap', () => {
        
        describe('LoadEnvironmentVariables', () => {

            it('can detect application environment from __ENV__', () => {
                const app = new Application();

                app.bootstrap([ LoadEnvironmentVariables ]);

                expect(app.isLocal())
                    .withContext('application environment should NOT be "local"')
                    .toBeFalse();

                expect(app.isProduction())
                    .withContext('application environment should NOT be "production"')
                    .toBeFalse();

                expect(app.isTesting())
                    .withContext('application environment SHOULD be "testing"')
                    .toBeTrue();

                expect(Env.get('APP_ENV'))
                    .withContext('Environment variables not loaded')
                    .toBe('testing');
            });

        });
        
    });
});