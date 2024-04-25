import { ServiceProvider, ServiceRegistrar } from "@aedart/support/services";
import { Application } from "@aedart/core";

fdescribe('@aedart/support/services', () => {
    describe('Registrar', () => {
        describe('boot()', () => {

            it('can boot service provider', async () => {
                class A extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                const serviceProvider = new A(app);
                
                // ------------------------------------------------------------------------- //

                await registrar.register(serviceProvider, false);
                
                const result = await registrar.boot(serviceProvider);

                expect(result)
                    .toBeTrue();

                expect(registrar.hasBooted(serviceProvider))
                    .withContext('Service provider is not marked as booted')
                    .toBeTrue();
            });

            it('prevents boot of service provider, if already booted', async () => {
                class A extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                const serviceProvider = new A(app);

                // ------------------------------------------------------------------------- //

                await registrar.register(serviceProvider, false);

                const resultA = await registrar.boot(serviceProvider);
                const resultB = await registrar.boot(serviceProvider);

                expect(resultA)
                    .toBeTrue();

                expect(resultB)
                    .withContext('Already booted service provider has been booted again!')
                    .toBeFalse();
                
                expect(registrar.hasBooted(serviceProvider))
                    .withContext('Service provider is not marked as booted')
                    .toBeTrue();
            });

            it('can register and boot service provider', async () => {
                class A extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                const serviceProvider = new A(app);

                // ------------------------------------------------------------------------- //

                const result = await registrar.register(serviceProvider);

                expect(result)
                    .toBeTrue();

                expect(registrar.isRegistered(serviceProvider))
                    .withContext('Service provider is not marked as registered')
                    .toBeTrue();
                
                expect(registrar.hasBooted(serviceProvider))
                    .withContext('Service provider is not marked as booted')
                    .toBeTrue();
            });
            
            // TODO: Test of Boot failure error...
        });
    });
});