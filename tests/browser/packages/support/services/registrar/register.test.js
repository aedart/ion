import { ServiceProvider, ServiceRegistrar } from "@aedart/support/services";
import { Application } from "@aedart/core";

describe('@aedart/support/services', () => {
    describe('Registrar', () => {
        describe('register()', () => {

            it('can register service provider (constructor)', async () => {
                class A extends ServiceProvider {}

                const registrar = new ServiceRegistrar(new Application());
                
                // ------------------------------------------------------------------------- //
                
                const result = await registrar.register(A, false);
                
                expect(result)
                    .toBeTrue();

                expect(registrar.isRegistered(A))
                    .withContext('Service provider is not marked as registered')
                    .toBeTrue();
            });

            it('can register service provider (instance)', async () => {
                class A extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                const serviceProvider = new A(app); 
                
                // ------------------------------------------------------------------------- //
                
                const result = await registrar.register(serviceProvider, false);

                expect(result)
                    .toBeTrue();

                expect(registrar.isRegistered(serviceProvider))
                    .withContext('Service provider is not marked as registered')
                    .toBeTrue();
            });

            it('does not register service provider if already registered', async () => {
                class A extends ServiceProvider {}

                const registrar = new ServiceRegistrar(new Application());

                // ------------------------------------------------------------------------- //

                const resultA = await registrar.register(A, false);
                const resultB = await registrar.register(A, false);

                expect(resultA)
                    .toBeTrue();

                expect(resultB)
                    .withContext('Already registered service provider was re-registered, but should not be!')
                    .toBeFalse();
            });
        });
    });
});