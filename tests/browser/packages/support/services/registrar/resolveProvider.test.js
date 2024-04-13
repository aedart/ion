import { ServiceProvider, ServiceRegistrar, RegistrationError } from "@aedart/support/services";
import { Application } from "@aedart/core";

describe('@aedart/support/services', () => {
    describe('Registrar', () => {
        describe('resolveProvider()', () => {

            it('fails when invalid service provider attempted resolved', () => {
                class A {}
                
                const registrar = new ServiceRegistrar(new Application());
                
                const callback = () => {
                    return registrar.resolveProvider(A);    
                }
                
                expect(callback)
                    .toThrowError(RegistrationError);
            });

            it('returns given provider instance when valid', () => {
                class A extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);
                
                // -------------------------------------------------------------------------- //
                
                const instance = new A(app);
                const result = registrar.resolveProvider(instance);

                expect(result)
                    .toBe(instance);
                
                expect(result)
                    .toBeInstanceOf(A);
            });

            it('returns new provider instance when class constructor given', () => {
                class A extends ServiceProvider {}

                const app = new Application();
                const registrar = new ServiceRegistrar(app);

                // -------------------------------------------------------------------------- //
                
                const result = registrar.resolveProvider(A);

                expect(result)
                    .toBeInstanceOf(A);
            });

        });
    });
});