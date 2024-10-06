import { CORE } from "@aedart/contracts/core";
import { CONTAINER } from "@aedart/contracts/container";
import { Config } from "@aedart/support/facades";
import {
    Application,
    BaseConfigurator,
    ConfigurationError
} from "@aedart/core";
import { Env } from "@aedart/support/env";

describe('@aedart/core', () => {
    describe('configure', () => {

        beforeEach(() => {
            Env.clear();
        });

        afterEach(() => {
            Env.clear();
        });
        
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
            
            app.destroy();
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
            
            app.destroy();
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
            
            app.destroy();
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
            
            app.destroy();
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
            
            app.destroy();
        });

        it('sets configuration items (after boot)', async () => {
            
            const items = {
                app: {
                    name: 'Core Application'
                }
            }
            
            const app = new Application();

            // ---------------------------------------------------------------------------- //
            
            await app
                .prepare(items)
                .run();

            // ---------------------------------------------------------------------------- //
            
            const result = Config
                .obtain()
                .get('app.name');
            
            expect(result)
                .withContext('Configuration items do not appear to have been set')
                .toBe(items.app.name);
            
            app.destroy();
        });

        it('resolves external (async) configuration source and applies environment variables', async () => {
            
            const app = new Application();

            // ---------------------------------------------------------------------------- //

            await app
                .prepare(
                    async () => (await import('./fixtures/example-config')).default
                )
                .run();

            // ---------------------------------------------------------------------------- //

            const result = Config
                .obtain()
                .get('app.environment');

            expect(result)
                .withContext('External configuration was not resolved correctly')
                .toBe('testing');

            app.destroy();
        });
    });
});