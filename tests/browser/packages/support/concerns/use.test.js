import { AbstractConcern, use } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('use()', () => {

        it('can inject concerns into target via @use() class decorator new instance', () => {
            class ConcernA extends AbstractConcern {
                ping() {
                    return 'pong';
                }
            }
            class ConcernB extends AbstractConcern {
                foo() {
                    return 'bar';
                }
            }
            class ConcernC extends AbstractConcern {
                get hi() {
                    return 'Hi...'
                }
            }

            /** @type {Configuration<ConcernC>} */
            const config = { concern: ConcernC, aliases: { 'hi': 'message' } }; 
            
            /**
             * @property {() => string} ping
             * @property {() => string} foo
             * @property {string} message
             */
            @use(
                ConcernA,
                ConcernB,
                config                
            )
            class MyService {}

            // --------------------------------------------------------------------------- //

            const instance = new MyService();

            expect(instance.ping())
                .toBe('pong');
            expect(instance.foo())
                .toBe('bar');
            expect(instance.message)
                .toBe('Hi...');
        });

    });
});