import { CallbackWrapper } from "@aedart/support";
import { ServiceProvider } from "@aedart/support/services";
import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('run', () => {

        it('can run application', async () => {
            class A extends ServiceProvider {}
            
            const app = new Application();

            // ------------------------------------------------------------------------------- //
            
            await app.registerMultiple([ A ]);
            
            const result = await app
                .run();
            
            expect(result)
                .withContext('Application is not running')
                .toBeTrue();
            
            expect(app.hasBootstrapped())
                .withContext('Application has NOT been bootstrapped')
                .toBeTrue();
            
            expect(app.hasBooted())
                .withContext('Application has NOT booted')
                .toBeTrue()
            
            expect(app.isRunning())
                .withContext('Application has not changed "running" state')
                .toBeTrue();
        });

        it('can invoke callback', async () => {

            const app = new Application();

            let hasInvokedCallback = false;
            const callback = () => {
                hasInvokedCallback = true;
            }

            // ------------------------------------------------------------------------------- //
            
            await app.run(callback);
            
            expect(hasInvokedCallback)
                .withContext('Callback not invoked')
                .toBeTrue();
        });

        it('can invoke callback wrapper', async () => {
            const app = new Application();

            let hasInvokedCallback = false;
            const callback = () => {
                hasInvokedCallback = true;
            }
            const wrapper = CallbackWrapper.make(callback);

            // ------------------------------------------------------------------------------- //

            await app.run(wrapper);

            expect(hasInvokedCallback)
                .withContext('Callback wrapper not invoked')
                .toBeTrue();
        });

        it('can invoke class method', async () => {
            const app = new Application();

            let hasInvoked = false;
            class A {
                foo() {
                    hasInvoked = true;
                }
            }

            // ------------------------------------------------------------------------------- //

            await app.run([ A, 'foo' ]);

            expect(hasInvoked)
                .withContext('Class method not invoked')
                .toBeTrue();
        });

        it('returns promise if callback returns a thenable object', async () => {
            const app = new Application();
            
            const value = 'My async run';
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(value)
                }, 1);
            });
            
            // ------------------------------------------------------------------------------- //

            const result = await app.run(() => promise);
            
            expect(result)
                .withContext('Run failed to return callback\'s promise')
                .toEqual(value)
        });

        it('does not trigger run if already running', async () => {
            const app = new Application();

            let amount = 0;
            const callback = () => {
                amount++;
            }
            
            // ------------------------------------------------------------------------------- //
            
            await app.run(callback);
            
            const result = await app.run(callback);
            
            expect(result)
                .withContext('Application re-triggered run, but should NOT do so')
                .toBeFalse();
            
            expect(amount)
                .withContext('Run logic triggered multiple times')
                .toEqual(1);
        });
    });
});