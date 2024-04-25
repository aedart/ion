import { ServiceProvider, ServiceRegistrar } from "@aedart/support/services";
import { Application } from "@aedart/core";
import { getNameOrDesc } from "@aedart/support/reflections";

describe('@aedart/support/services', () => {
    describe('Registrar', () => {
        describe('bootMultiple()', () => {

            it('can boot multiple service provider', async () => {
                class A extends ServiceProvider {}
                class B extends ServiceProvider {}
                class C extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                const providerA = new A(app);
                const providerB = new B(app);
                const providerC = new C(app);

                const list = [ providerA, providerB, providerC ];
                
                // ------------------------------------------------------------------------- //

                await registrar.registerMultiple(list, false);

                const result = await registrar.bootMultiple(list);

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

            it('can register and boot multiple service provider', async () => {
                class A extends ServiceProvider {}
                class B extends ServiceProvider {}
                class C extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                const providerA = new A(app);
                const providerB = new B(app);
                const providerC = new C(app);

                const list = [ providerA, providerB, providerC ];

                // ------------------------------------------------------------------------- //

                const result = await registrar.registerMultiple(list, true);

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
                    .toBe(list.length);
            });

            it('can register and boot service providers immediately', async () => {
                
                const recordAmountRegistered = (label, app) => {
                    const registrationMap = app.get('registrationMap');
                    registrationMap.set(label, app.get('registrar').registered.length);
                    
                    return Promise.resolve(true);
                };
                
                class A extends ServiceProvider {
                    async boot() {
                        return recordAmountRegistered('A', this.app);
                    }
                }
                class B extends ServiceProvider {
                    async boot() {
                        return recordAmountRegistered('B', this.app);
                    }
                }
                class C extends ServiceProvider {
                    async boot() {
                        return recordAmountRegistered('C', this.app);
                    }
                }
                
                // ------------------------------------------------------------------------- //
                
                const app = new Application();
                
                const registrar = new ServiceRegistrar(app);
                app.instance('registrar', registrar);
                
                const registrationMap = new Map();
                app.instance('registrationMap', registrationMap);

                // ------------------------------------------------------------------------- //
                
                const providerA = new A(app);
                const providerB = new B(app);
                const providerC = new C(app);

                const list = [ providerA, providerB, providerC ];

                // ------------------------------------------------------------------------- //

                const result = await registrar.registerMultiple(list, true, false);

                expect(result)
                    .toBeTrue();

                // console.log('REGISTRATION MAP', Array.from(registrationMap));
                
                expect(registrationMap.get('A'))
                    .withContext('A has incorrect registered amount of providers')
                    .toBe(1);

                expect(registrationMap.get('B'))
                    .withContext('B has incorrect registered amount of providers')
                    .toBe(2);

                expect(registrationMap.get('C'))
                    .withContext('C has incorrect registered amount of providers')
                    .toBe(3);
            });
        });
    });
});