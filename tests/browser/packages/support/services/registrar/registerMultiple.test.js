import { ServiceProvider, ServiceRegistrar } from "@aedart/support/services";
import { Application } from "@aedart/core";
import { getNameOrDesc } from "@aedart/support/reflections";

describe('@aedart/support/services', () => {
    describe('Registrar', () => {
        describe('registerMultiple()', () => {

            it('can register multiple service providers', async () => {
                class A extends ServiceProvider {}
                class B extends ServiceProvider {}
                class C extends ServiceProvider {}

                const registrar = new ServiceRegistrar(new Application());

                const list = [ A, B, C ];
                
                // ------------------------------------------------------------------------- //

                const result = await registrar.registerMultiple(list, false);

                expect(result)
                    .toBeTrue();

                for (const provider of list) {
                    expect(registrar.isRegistered(provider))
                        .withContext(`Service provider ${getNameOrDesc(provider)} is not marked as registered`)
                        .toBeTrue();                    
                }
                
                expect(registrar.registered.length)
                    .withContext('Incorrect amount of registered service providers')
                    .toBe(list.length);
            });
        });
    });
});