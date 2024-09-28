import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('terminate', () => {

        it('skips termination if application is not running', async () => {
            const app = new Application();

            // ------------------------------------------------------------------------------- //
            
            const result = await app.terminate();
            
            expect(result)
                .withContext('should not have triggered termination logic - application is not running')
                .toBeFalse();
        });

        it('can terminate running application', async () => {

            const app = new Application();

            // ------------------------------------------------------------------------------- //
            
            await app.run();
            
            const result = await app.terminate();
            
            expect(result)
                .withContext('Application has not terminated')
                .toBeTrue();
            
            expect(app.isRunning())
                .withContext('Application has not changed "running" state')
                .toBeFalse();
        });

        it('invokes termination callbacks', async () => {
            const app = new Application();

            let invoked = false;
            let asyncInvoked = false;
            
            const callback = () => {
                invoked = true;
            }
            
            const asyncCallback = () => {
                return new Promise((resolve) => {
                    setTimeout(() => {
                        asyncInvoked = true;
                        resolve();
                    }, 1);
                });
            };
            
            // ------------------------------------------------------------------------------- //

            await app
                .terminating(callback)
                .terminating(asyncCallback)
                .run();
            
            await app.terminate();

            expect(invoked)
                .withContext('Termination callback not invoked')
                .toBeTrue();
            
            expect(asyncInvoked)
                .withContext('Termination callback (async) not invoked')
                .toBeTrue();
        });
    });
});