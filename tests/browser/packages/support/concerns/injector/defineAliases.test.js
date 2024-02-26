import makeConcernsInjector from "../helpers/makeConcernsInjector";
import { ALIASES } from "@aedart/contracts/support/concerns";
import { AbstractConcern, AliasConflictError } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('ConcernsInjector', () => {
        describe('defineAliases()', () => {

            it('defines default aliases in target', () => {

                class ConcernA extends AbstractConcern {
                    get foo() {
                        return 'bar';
                    }
                    
                    greetings(name) {
                        return `Hi ${name}`;
                    }
                }

                /**
                 * @property {(name: string) => string} greetings
                 * @property {string} foo
                 */
                class A {}

                const concerns = [ ConcernA ];
                
                const injector = makeConcernsInjector(A);
                const target = injector.defineContainer(
                    injector.defineConcerns(A, concerns)
                );

                const configurations = injector.normalise(concerns);
                injector.defineAliases(target, configurations);
                
                // --------------------------------------------------------------------------- //
                
                expect(Reflect.has(A, ALIASES))
                    .withContext('ALIASES static property not defined')
                    .toBeTrue();
                
                expect(A[ALIASES])
                    .withContext('Incorrect aliases defined in static ALIASES property')
                    .toEqual([ 'foo', 'greetings' ]);
                
                // --------------------------------------------------------------------------- //
                
                const instance = new A();
                expect(instance.foo)
                    .withContext('Interaction with alias "foo" failed')
                    .toBe('bar');

                expect(instance.greetings('John'))
                    .withContext('Interaction with alias "greetings" failed')
                    .toBe('Hi John');
            });

            it('can define custom aliases in target', () => {

                class ConcernA extends AbstractConcern {
                    get foo() {
                        return 'bar';
                    }

                    greetings(name) {
                        return `Hi ${name}`;
                    }
                }

                /**
                 * @property {(name: string) => string} sayHi
                 * @property {string} ping
                 */
                class A {}

                const concerns = [ ConcernA ];

                const injector = makeConcernsInjector(A);
                const target = injector.defineContainer(
                    injector.defineConcerns(A, concerns)
                );

                const configurations = injector.normalise([
                    {
                        concern: ConcernA,
                        aliases: {
                            'foo': 'ping',
                            'greetings': 'sayHi'
                        }
                    }
                ]);
                injector.defineAliases(target, configurations);

                // --------------------------------------------------------------------------- //

                expect(A[ALIASES])
                    .withContext('Incorrect aliases defined in static ALIASES property')
                    .toEqual([ 'ping', 'sayHi' ]);

                // --------------------------------------------------------------------------- //

                const instance = new A();
                expect(instance.ping)
                    .withContext('Interaction with alias "ping" failed')
                    .toBe('bar');

                expect(instance.sayHi('Siw'))
                    .withContext('Interaction with alias "sayHi" failed')
                    .toBe('Hi Siw');
            });

            it('does not define aliases if "allowAliases" setting set to false', () => {

                class ConcernA extends AbstractConcern {
                    get foo() {}
                    greetings() {}
                }

                class A {}

                const concerns = [ ConcernA ];

                const injector = makeConcernsInjector(A);
                const target = injector.defineContainer(
                    injector.defineConcerns(A, concerns)
                );

                const configurations = injector.normalise([
                    {
                        concern: ConcernA,
                        allowAliases: false
                    }
                ]);
                injector.defineAliases(target, configurations);

                // --------------------------------------------------------------------------- //

                expect(A[ALIASES].length)
                    .withContext('static ALIASES property should be empty')
                    .toBe(0);
            });

            it('conflicts when same alias is used multiple times', () => {

                class ConcernA extends AbstractConcern {
                    get foo() {}
                    greetings() {}
                }

                class A {}

                const concerns = [ ConcernA ];

                const injector = makeConcernsInjector(A);
                const target = injector.defineContainer(
                    injector.defineConcerns(A, concerns)
                );

                const configurations = injector.normalise([
                    {
                        concern: ConcernA,
                        aliases: {
                            'foo': 'bar',
                            'greetings': 'bar', // This should result in alias conflict
                        }
                    }
                ]);

                // --------------------------------------------------------------------------- //

                const callback = () => {
                    injector.defineAliases(target, configurations);    
                }

                // Debug
                // console.log('A aliases', A[ALIASES]);
                // console.log('A keys', Reflect.ownKeys(A.prototype));
                
                expect(callback)
                    .toThrowError(AliasConflictError);
            });

            it('conflicts when default applied alias is already applied by another concern', () => {

                class ConcernA extends AbstractConcern {
                    get foo() {}
                    greetings() {}
                }

                class ConcernB extends AbstractConcern {
                    greetings() {} // This will result in a conflict
                }
                
                class A {}

                const concerns = [ ConcernA, ConcernB ];

                const injector = makeConcernsInjector(A);
                const target = injector.defineContainer(
                    injector.defineConcerns(A, concerns)
                );

                const configurations = injector.normalise([
                    ConcernA,
                    ConcernB
                ]);

                // --------------------------------------------------------------------------- //

                const callback = () => {
                    injector.defineAliases(target, configurations);
                }

                expect(callback)
                    .toThrowError(AliasConflictError);
            });

            it('inherits previous applied aliases from parent class', () => {

                class ConcernA extends AbstractConcern {
                    get ping() {
                        return 'ping';
                    }
                }

                class ConcernB extends AbstractConcern {
                    get pong() {
                        return 'pong';
                    }
                }
                
                /**
                 * @property {string} ping
                 */
                class A {}

                /**
                 * @property {string} pong
                 */
                class B extends A {}
                
                const concernsA = [ ConcernA ];
                const concernsB = [ ConcernB ];

                const injectorA = makeConcernsInjector(A);
                const targetA = injectorA.defineContainer(
                    injectorA.defineConcerns(A, concernsA)
                );

                const injectorB = makeConcernsInjector(B);
                const targetB = injectorB.defineContainer(
                    injectorB.defineConcerns(B, concernsB)
                );

                injectorA.defineAliases(targetA, injectorA.normalise(concernsA));
                injectorB.defineAliases(targetB, injectorB.normalise(concernsB));

                // --------------------------------------------------------------------------- //

                // Debug
                // console.log('A', A[ALIASES]);
                // console.log('B', B[ALIASES]);
                
                expect(A[ALIASES])
                    .withContext('Incorrect aliases defined A')
                    .toEqual([ 'ping' ]);

                expect(B[ALIASES])
                    .withContext('Incorrect aliases defined A')
                    .toEqual([ 'pong' ]);
                
                // --------------------------------------------------------------------------- //

                const instance = new B();
                expect(instance.ping)
                    .withContext('Interaction with alias "ping" failed')
                    .toBe('ping');

                expect(instance.pong)
                    .withContext('Interaction with alias "pong" failed')
                    .toBe('pong');
            });

            it('conflicts when alias already defined in parent class', () => {

                class ConcernA extends AbstractConcern {
                    get ping() {}
                }

                class ConcernB extends AbstractConcern {
                    get ping() {} // Will result in conflict
                }


                class A {}
                class B extends A {}

                const concernsA = [ ConcernA ];
                const concernsB = [ ConcernB ];

                const injectorA = makeConcernsInjector(A);
                const targetA = injectorA.defineContainer(
                    injectorA.defineConcerns(A, concernsA)
                );

                const injectorB = makeConcernsInjector(B);
                const targetB = injectorB.defineContainer(
                    injectorB.defineConcerns(B, concernsB)
                );

                // --------------------------------------------------------------------------- //

                injectorA.defineAliases(targetA, injectorA.normalise(concernsA));

                const callback = () => {
                    injectorB.defineAliases(targetB, injectorB.normalise(concernsB));    
                }
                
                expect(callback)
                    .toThrowError(AliasConflictError);
            });

            it('can prevent conflict via a custom alias in subclass', () => {

                class ConcernA extends AbstractConcern {
                    get ping() {
                        return 'ping'
                    }
                }

                class ConcernB extends AbstractConcern {
                    get ping() {
                        return 'pong'
                    }
                }

                /**
                 * @property {string} ping
                 */
                class A {}

                /**
                 * @property {string} pong
                 */
                class B extends A {}

                const concernsA = [ ConcernA ];
                const concernsB = [ ConcernB ];

                const injectorA = makeConcernsInjector(A);
                const targetA = injectorA.defineContainer(
                    injectorA.defineConcerns(A, concernsA)
                );

                const injectorB = makeConcernsInjector(B);
                const targetB = injectorB.defineContainer(
                    injectorB.defineConcerns(B, concernsB)
                );

                // --------------------------------------------------------------------------- //

                injectorA.defineAliases(targetA, injectorA.normalise(concernsA));
                injectorB.defineAliases(targetB, injectorB.normalise([
                    {
                        concern: ConcernB,
                        aliases: {
                            'ping': 'pong' // This should prevent alias conflict
                        }
                    }
                ]));

                // --------------------------------------------------------------------------- //
                
                const instance = new B();
                expect(instance.ping)
                    .withContext('Interaction with alias "ping" failed')
                    .toBe('ping');

                expect(instance.pong)
                    .withContext('Interaction with alias "pong" failed')
                    .toBe('pong');
            });
        });
    });
});