import { AbstractConcern, use } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('use()', () => {

        it('can inject concerns into target via @use() class decorator', () => {
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
                
                sayHi(name) {
                    const hi = this.hi;
                    return `${hi} ${name}`;
                }
            }

            /** @type {Configuration<ConcernC>} */
            const config = {
                concern: ConcernC,
                aliases: {
                    'hi': 'message',
                    'sayHi': 'write'
                }
            }; 
            
            /**
             * @property {() => string} ping
             * @property {() => string} bar
             * @property {string} message
             * @property {(name: string) => string} write
             */
            @use(
                ConcernA,
                [ConcernB, {
                    'foo': 'bar'
                }],
                config                
            )
            class MyService {
                sayHi(name) {
                   return this.write(name) + '!';
                }
            }

            // --------------------------------------------------------------------------- //

            const instance = new MyService();

            expect(instance.ping())
                .toBe('pong');
            expect(instance.bar())
                .toBe('bar');
            expect(instance.message)
                .toBe('Hi...');
            expect(instance.sayHi('Hans'))
                .toBe('Hi... Hans!');
        });

    });
});