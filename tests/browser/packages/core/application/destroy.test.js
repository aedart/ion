import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('destroy', () => {

        it('can destroy application', async () => {

            const identifier = Symbol('my_instance');
            class A {}
            
            const app = new Application();

            // ------------------------------------------------------------------------------- //

            app.bind(identifier, A);
            
            await app.run();

            app.destroy();

            // ------------------------------------------------------------------------------- //
            
            expect(app.isRunning())
                .withContext('application should NOT be running')
                .toBeFalse();
            
            expect(app.hasBooted())
                .withContext('application should NOT be booted')
                .toBeFalse();

            expect(app.hasBeenBootstrapped())
                .withContext('application should NOT be bootstrapped')
                .toBeFalse();
            
            expect(app.bound(identifier))
                .withContext('application should NOT have any bindings')
                .toBeFalse();
        });

        it('invokes destroy callbacks', () => {
            const app = new Application();
            
            let invoked = false;
            const callback = () => {
                invoked = true;
            }

            // ------------------------------------------------------------------------------- //
            
            app
                .destroying(callback)
                .destroy();
            
            expect(invoked)
                .withContext('destroy callback not invoked')
                .toBeTrue();
        });
    });
});