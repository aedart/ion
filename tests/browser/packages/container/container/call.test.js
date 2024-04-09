import {Container, ContainerError } from "@aedart/container";
import { DEPENDENCIES } from "@aedart/contracts/container";
import { dependencies } from "@aedart/support/container";
import { CallbackWrapper } from "@aedart/support";

describe('@aedart/support/container', () => {
    describe('call', () => {

        it('fails when unsupported type given as "method" argument', () => {
            const container = new Container();

            const callback = () => {
                container.call('uknown');
            };

            expect(callback)
                .toThrowError(ContainerError);
        });

        it('can call callback', () => {
            const container = new Container();
            
            const callback = (a) => a;
            
            // --------------------------------------------------------------------------- //
            
            const arg = 'lipsum';
            const result = container.call(callback, [ arg ]);
            
            expect(result)
                .toBe(arg);
        });

        it('can call callback-wrapper', () => {
            const container = new Container();

            const wrapper = CallbackWrapper.make((a) => a);

            // --------------------------------------------------------------------------- //

            const arg = 'esto buno';
            const result = container.call(wrapper, [ arg ]);

            expect(result)
                .toBe(arg);
        });

        it('resolves callback-wrapper dependencies', () => {
            const container = new Container();

            class A {}
            
            const wrapper = CallbackWrapper
                .make((a) => a)
                .set(DEPENDENCIES, [ A ]);

            // --------------------------------------------------------------------------- //
            
            const result = container.call(wrapper);

            expect(result)
                .toBeInstanceOf(A);
        });

        it('applies callback-wrapper\'s own arguments', () => {
            const container = new Container();

            class A {}

            const wrapper = CallbackWrapper
                .make((a) => a, [ new A() ]);

            // --------------------------------------------------------------------------- //

            const result = container.call(wrapper);

            expect(result)
                .toBeInstanceOf(A);
        });

        it('can call class method', () => {
            const container = new Container();

            class A {
                hi(name) {
                    return name;
                }
            }

            // --------------------------------------------------------------------------- //

            const name = 'Ofelia';
            const result = container.call([ A, 'hi' ], [ name ]);
            
            expect(result)
                .toBe(name);
        });

        it('resolves class method dependencies', () => {
            const container = new Container();

            class Api {}
            class Message {}
            
            
            @dependencies(Api)
            class Service {
                api;
                
                constructor(api) {
                    this.api = api;
                }

                @dependencies(Message)
                send(message) {
                    return [ this.api, message ];
                }
            }

            // --------------------------------------------------------------------------- //

            const result = container.call([ Service, 'send' ]);

            expect(result.length)
                .withContext('Incorrect output')
                .toBe(2);
            
            expect(result[0])
                .withContext('Dependency (api) not resolved')
                .toBeInstanceOf(Api);

            expect(result[1])
                .withContext('Dependency (message) not resolved')
                .toBeInstanceOf(Message);
        });
    });
});