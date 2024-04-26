import { ServiceProvider, ServiceRegistrar } from "@aedart/support/services";
import { Application } from "@aedart/core";
import { getNameOrDesc } from "@aedart/support/reflections";

describe('@aedart/support/services', () => {
    describe('Registrar', () => {
        describe('bootAll()', () => {

            it('can boot all registered service providers', async () => {
                class A extends ServiceProvider {}
                class B extends ServiceProvider {}
                class C extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                const list = [
                    new A(app),
                    new B(app),
                    new C(app),
                ];

                // ------------------------------------------------------------------------- //

                await registrar.registerMultiple(list, false);

                const result = await registrar.bootAll();

                expect(result)
                    .toBeTrue();

                for (const provider of list) {
                    const ctor = provider.constructor;

                    expect(registrar.hasBooted(provider))
                        .withContext(`Service provider ${getNameOrDesc(ctor)} is not marked as booted`)
                        .toBeTrue();
                }

                expect(registrar.booted.length)
                    .withContext('Incorrect amount of booted service providers')
                    .toBe(list.length)
            });
        });
    });
});