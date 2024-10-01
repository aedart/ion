import { ServiceProvider, BootError } from "@aedart/support/services";
import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('booting', () => {

        it('fails booting if Application not yet bootstrapped', async () => {
            const app = new Application();

            // ------------------------------------------------------------------------------- //
            
            const result = app.boot();
            
            await expectAsync(result)
                .withContext('Application SHOULD NOT be able to boot without first being bootstrapped')
                .toBeRejectedWithError(BootError);
        });

        it('can boot the application', async () => {
            class A extends ServiceProvider {}
            
            const app = new Application();

            // ------------------------------------------------------------------------------- //
            
            await app
                .bootstrap([])
                .registerMultiple([ A ]);
            
            const result = await app.boot();
            
            expect(result)
                .withContext('Application did not boot')
                .toBeTrue();
            
            expect(app.hasBooted())
                .withContext('Application\'s boot state has not changed')
                .toBeTrue();
        });

        it('invokes before and after boot callbacks', async () => {
            class A extends ServiceProvider {}

            const app = new Application();

            let beforeInvoked = false;
            let afterInvoked = false;
            
            const beforeCallback = () => {
                beforeInvoked = true;
            }
            const afterCallback = () => {
                afterInvoked = true;
            }
            
            // ------------------------------------------------------------------------------- //

            await app
                .bootstrap([])
                .registerMultiple([ A ]);

            await app
                .before(beforeCallback)
                .after(afterCallback)
                .boot();
            
            expect(beforeInvoked)
                .withContext('Before callback not invoked')
                .toBeTrue();

            expect(afterInvoked)
                .withContext('After callback not invoked')
                .toBeTrue();
        });
    });
});