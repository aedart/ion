import { Application, SetupFacades } from "@aedart/core";
import { Facade } from "@aedart/support/facades";

describe('@aedart/core', () => {
    describe('bootstrap', () => {

        describe('SetupFacades', () => {

            afterEach(() => {
                Facade.destroy();
            });
            
            it('sets the Application as the Facade\'s container', () => {
                const app = new Application();

                app.bootstrapWith([ SetupFacades ]);

                // --------------------------------------------------------------- //
                
                const result = Facade.getContainer();

                expect(Facade.hasContainer())
                    .withContext('Service Container not available in Facade')
                    .toBeTrue();

                expect(result)
                    .withContext('Expected Application instance as Facade\'s container')
                    .toBe(app);
            });

            it('removes Facade\'s container when application is destroyed', () => {
                const app = new Application();

                app.bootstrapWith([ SetupFacades ]);
                
                app.destroy();

                // --------------------------------------------------------------- //

                const result = Facade.getContainer();
                
                expect(result)
                    .withContext('Facade still has a container, but SHOULD not have so!')
                    .toBeUndefined()
            });

        });

    });
});