import { Container, NotFoundError } from "@aedart/container";

describe('@aedart/support/container', () => {
    describe('make', () => {

        it('passes container instance to factory callback', () => {
            const container = new Container();
            
            container.bind('a', (c) => c);

            // -------------------------------------------------------------------- //
            
            const result = container.make('a');
            
            expect(result)
                .toBe(container);
        });

        it('resolves with provided arguments', () => {
            const container = new Container();

            class A {
                name;
                
                constructor(name) {
                    this.name = name;
                }
            }

            const identifier = Symbol('my_instance');
            
            container.bind(identifier, (container, ...args) => {
                return new A(...args);
            });
            
            // -------------------------------------------------------------------- //

            const name = 'Alfred';
            const result = container.make(identifier, [ name ]);
            
            expect(result)
                .toBeInstanceOf(A);
            expect(result.name)
                .toBe(name);
        });

        it('resolves buildable identifier (constructor), when binding not registered', () => {
            const container = new Container();
            
            class Foo {}
            
            // -------------------------------------------------------------------- //
            
            const result = container.make(Foo);
            
            expect(result)
                .toBeInstanceOf(Foo);
        });

        it('fails when binding does not exist, and not buildable', () => {
            const container = new Container();
            
            const callback = () => {
                container.make('my_service');    
            }
            
            expect(callback)
                .toThrowError(NotFoundError);
        });
    });
});