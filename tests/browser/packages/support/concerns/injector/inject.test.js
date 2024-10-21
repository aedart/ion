import makeConcernsInjector from "../helpers/makeConcernsInjector.js";
import { AbstractConcern } from "@aedart/support/concerns";
import { BEFORE, AFTER } from "@aedart/contracts/support/concerns";

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

            it('invokes before and after registration hooks', () => {
                const called = [];
                
                class ConcernA extends AbstractConcern
                {
                    static [BEFORE](target) {
                        // console.log('before (a)', target);
                        called.push('before a');
                    }
                    
                    static [AFTER](target) {
                        // console.log('after (a)', target);
                        called.push('after a');
                    }
                }
                class ConcernB extends AbstractConcern
                {
                    static [BEFORE](target) {
                        // console.log('before (b)', target);
                        called.push('before b');
                    }

                    static [AFTER](target) {
                        // console.log('after (b)', target);
                        called.push('after b');
                    }
                }
                
                
                class A {}
                class B extends A {}
                
                // --------------------------------------------------------------------------- //

                makeConcernsInjector(A)
                    .inject(ConcernA);
                makeConcernsInjector(B)
                    .inject(ConcernB);
                
                expect(called)
                    .withContext('Incorrect order of registration hooks execution')
                    .toEqual([
                        // class A concerns
                        'before a',
                        'after a',

                        // class B concerns (inherited from A)
                        'before a',
                        'before b',
                        'after a',
                        'after b',
                    ]);
            });

        });
    });
});