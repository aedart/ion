import { ServiceProvider, ServiceRegistrar } from "@aedart/support/services";
import { Application } from "@aedart/core";
import { getNameOrDesc } from "@aedart/support/reflections";

describe('@aedart/core', () => {
    describe('service registration', () => {

        it('has a default service registrar', () => {
            const app = new Application();
            
            // ----------------------------------------------------------------------- //
            
            const result = app.registrar;
            
            expect(result)
                .withContext('Application has no default service registrar')
                .toBeInstanceOf(ServiceRegistrar);
        });

        it('can register a single service provider via application', async () => {
            class A extends ServiceProvider {}
            
            const app = new Application();
            
            // ----------------------------------------------------------------------- //
            
            const result = await app.register(A);

            expect(result)
                .toBeTrue();

            expect(app.registrar.isRegistered(A))
                .withContext('Service provider is not marked as registered')
                .toBeTrue();
        });

        it('can register multiple service providers via application', async () => {

            class A extends ServiceProvider {}
            class B extends ServiceProvider {}
            class C extends ServiceProvider {}

            const list = [ A, B, C ];

            const app = new Application();

            // ----------------------------------------------------------------------- //

            const result = await app.registerMultiple(list);

            expect(result)
                .toBeTrue();

            for (const provider of list) {
                expect(app.registrar.isRegistered(provider))
                    .withContext(`Service provider ${getNameOrDesc(provider)} is not marked as registered`)
                    .toBeTrue();
            }
        });

    });
});