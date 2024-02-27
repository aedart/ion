import makeConcernsInjector from "../helpers/makeConcernsInjector";
import { AbstractConcern } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('ConcernsInjector', () => {
        describe('inject()', () => {

            it('can inject concerns into target class', () => {

                class ConcernA extends AbstractConcern {
                    foo() {
                        return 'foo';
                    }
                }
                class ConcernB extends AbstractConcern {
                    bar() {
                        return 'bar'
                    }
                }
                class ConcernC extends AbstractConcern {
                    get message() {
                        return 'Hi...'
                    }
                }

                /**
                 * @property {() => string} foo
                 * @property {() => string} bar
                 * @property {string} greeting
                 */
                class A {}

                const injector = makeConcernsInjector(A);
                
                // --------------------------------------------------------------------------- //
                
                const target = injector.inject(
                    ConcernA,
                    ConcernB,
                    { concern: ConcernC, aliases: { 'message': 'greeting' } }
                );

                // --------------------------------------------------------------------------- //
                
                const instance = new A();
                
                expect(instance.foo())
                    .toBe('foo');
                expect(instance.bar())
                    .toBe('bar');
                expect(instance.greeting)
                    .toBe('Hi...');
            });

        });
    });
});