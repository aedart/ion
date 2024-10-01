import { CORE } from "@aedart/contracts/core";
import { CONTAINER } from "@aedart/contracts/container";
import {
    Application,
    BaseConfigurator,
    ConfigurationError
} from "@aedart/core";

describe('@aedart/core', () => {
    describe('configure', () => {

        it('fails when invalid configurator provided', () => {
            
            class A {}
            
            const app = new Application();
            
            // ---------------------------------------------------------------------------- //
            
            const callback = () => {
                app.configure(new A());
            }

            // ---------------------------------------------------------------------------- //
            
            expect(callback)
                .withContext('Should NOT accept invalid configurator instance')
                .toThrowError(ConfigurationError);
        });

        it('can be configured using configurator instance', () => {
            
            let invoked = false;
            class MyConfigurator extends BaseConfigurator
            {
                before(app)
                {
                    invoked = true;    
                }
            }
            
            const app = new Application();

            // ---------------------------------------------------------------------------- //

            app.configure(new MyConfigurator());
            
            // ---------------------------------------------------------------------------- //
            
            expect(invoked)
                .withContext('Configurator (instance) not applied')
                .toBeTrue();
        });

        it('can be configured using configurator class constructor', () => {

            let invoked = false;
            class MyConfigurator extends BaseConfigurator
            {
                before(app)
                {
                    invoked = true;
                }
            }

            const app = new Application();

            // ---------------------------------------------------------------------------- //

            app.configure(MyConfigurator);

            // ---------------------------------------------------------------------------- //

            expect(invoked)
                .withContext('Configurator (constructor) not applied')
                .toBeTrue();
        });

        it('can be configured using configurator callback', () => {
            
            const app = new Application();
            let invoked = false;
            
            // ---------------------------------------------------------------------------- //

            app.configure((configurator) => {
                invoked = true
                return configurator;
            });

            // ---------------------------------------------------------------------------- //

            expect(invoked)
                .withContext('Configurator (callback) not applied')
                .toBeTrue();
        });

        it('applies a default application configurator', () => {
            
            const app = new Application();

            // ---------------------------------------------------------------------------- //
            
            // Here, the "DefaultConfigurator" should be applied...
            app.configure();

            // ---------------------------------------------------------------------------- //

            const a = app.get(CORE);
            const b = app.get(CONTAINER);
            
            expect(a)
                .withContext('CORE binding not registered')
                .toBe(app);

            expect(b)
                .withContext('CONTAINER alias not registered')
                .toBe(app);

            // ---------------------------------------------------------------------------- //
            
            expect(app.coreBootstrappers.length)
                .withContext('No core bootstrappers have been registered')
                .toBeGreaterThan(0);
        });
    });
});