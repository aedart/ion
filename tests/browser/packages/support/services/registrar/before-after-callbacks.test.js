import { ServiceProvider, ServiceRegistrar } from "@aedart/support/services";
import { Application } from "@aedart/core";

describe('@aedart/support/services', () => {
    describe('Registrar', () => {
        describe('before/after boot callbacks', () => {

            it('invokes before and after callbacks', async () => {
                class A extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                const serviceProvider = new A(app);

                // ------------------------------------------------------------------------- //
                
                let beforeInvoked = false;
                let afterInvoked = false;

                serviceProvider
                    .before(() => {
                        beforeInvoked = true;
                    })
                    .after(() => {
                        afterInvoked = true;
                    })
                
                // ------------------------------------------------------------------------- //

                const result = await registrar.register(serviceProvider);
                
                expect(beforeInvoked)
                    .withContext('Before callback not invoked')
                    .toBeTrue();

                expect(afterInvoked)
                    .withContext('After callback not invoked')
                    .toBeTrue();
            });
        });
    });
});