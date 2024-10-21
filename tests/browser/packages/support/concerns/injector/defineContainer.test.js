import { CONCERNS } from "@aedart/contracts/support/concerns";
import { AbstractConcern, ConcernsContainer, InjectionError } from "@aedart/support/concerns";
import makeConcernsInjector from "../helpers/makeConcernsInjector.js";

describe('@aedart/support/concerns', () => {
    describe('ConcernsInjector', () => {
        describe('defineContainer()', () => {

            it('can define concerns container in target prototype', () => {
                class ConcernA extends AbstractConcern {}

                class A {}

                const injector = makeConcernsInjector(A);
                
                const target = injector.defineContainer(
                    injector.defineConcerns(A, [
                        ConcernA,
                    ])
                );
                
                // ------------------------------------------------------------------------------------------ //
                
                expect(Reflect.has(target.prototype, CONCERNS))
                    .withContext('Concerns container property not defined in target prototype')
                    .toBeTrue();
            });

            it('container instance is created when obtained from target instance', () => {
                class ConcernA extends AbstractConcern {}
                class ConcernB extends AbstractConcern {}
                class ConcernC extends AbstractConcern {}

                class A {}

                const injector = makeConcernsInjector(A);

                const target = injector.defineContainer(
                    injector.defineConcerns(A, [
                        ConcernA,
                        ConcernB,
                        ConcernC,
                    ])
                );

                // ------------------------------------------------------------------------------------------ //

                const instance = new target();
                const container = instance[CONCERNS];

                // Debug
                // console.log('container', container);

                expect(container)
                    .withContext('Invalid concerns container instance')
                    .toBeInstanceOf(ConcernsContainer);

                expect(container.isNotEmpty())
                    .withContext('Container has no concerns registered')
                    .toBeTrue();

                expect(container.has(ConcernA))
                    .withContext('Concern A not registered in container')
                    .toBeTrue();
                expect(container.has(ConcernB))
                    .withContext('Concern B not registered in container')
                    .toBeTrue();
                expect(container.has(ConcernC))
                    .withContext('Concern C not registered in container')
                    .toBeTrue();
            });

            it('does not inherit container from parent instance', () => {
                class ConcernA extends AbstractConcern {}
                class ConcernB extends AbstractConcern {}
                class ConcernC extends AbstractConcern {}

                class A {}
                class B extends A {}

                const injector = makeConcernsInjector(A);
                
                const targetA = injector.defineContainer(
                    injector.defineConcerns(A, [
                        ConcernA,
                        ConcernB,
                    ])
                );

                const targetB = injector.defineContainer(
                    injector.defineConcerns(B, [
                        ConcernC
                    ])
                );
                
                // ------------------------------------------------------------------------------------------ //

                const instanceA = new targetA();
                const instanceB = new targetB();
                
                const containerA = instanceA[CONCERNS];
                const containerB = instanceB[CONCERNS];

                expect(containerA === containerB)
                    .withContext('Same container instance returned for different target instances!')
                    .toBeFalse();
                
                expect(containerA.size)
                    .withContext('Incorrect amount of concerns in container a')
                    .toBe(2);

                expect(containerB.size)
                    .withContext('Incorrect amount of concerns in container b')
                    .toBe(3);
            });
            
            it('can interact with concerns in container', () => {
                class ConcernA extends AbstractConcern {
                    foo() {
                        return 'foo';
                    }
                }
                class ConcernB extends AbstractConcern {
                    get bar() {
                        return 'bar'
                    }
                }
                class ConcernC extends AbstractConcern {
                    #msg = null;

                    set message(value) {
                        this.#msg = value;
                    }

                    get message() {
                        return this.#msg;
                    }
                }

                class A {}

                const injector = makeConcernsInjector(A);

                const target = injector.defineContainer(
                    injector.defineConcerns(A, [
                        ConcernA,
                        ConcernB,
                        ConcernC,
                    ])
                );

                // ------------------------------------------------------------------------------------------ //

                const instance = new target();
                const container = instance[CONCERNS];

                // Debug
                // console.log('container', container);
                
                expect(container.call(ConcernA, 'foo'))
                    .withContext('Unable to call method in concern a')
                    .toBe('foo');

                expect(container.getProperty(ConcernB, 'bar'))
                    .withContext('Unable to get property from concern b')
                    .toBe('bar');
                
                const msg = 'Sweet...';
                container.setProperty(ConcernC, 'message', msg);
                expect(container.getProperty(ConcernC, 'message'))
                    .withContext('Unable to set and get property in concern c')
                    .toBe(msg);
            });

            it('fails if unable to define concerns container property in target prototype', () => {
                class ConcernA extends AbstractConcern {}

                class A {}

                const injector = makeConcernsInjector(A);

                const target = injector.defineConcerns(A, [
                    ConcernA,
                ])
                
                Object.freeze(target.prototype); // This should cause an error whe attempting to define container...
                
                const callback = () => {
                    injector.defineContainer(target);    
                }

                // ------------------------------------------------------------------------------------------ //
                
                expect(callback)
                    .toThrowError(InjectionError);
            });
        });
    });
});