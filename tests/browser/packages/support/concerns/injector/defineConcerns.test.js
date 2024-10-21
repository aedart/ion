import { AbstractConcern, AlreadyRegisteredError, InjectionError } from "@aedart/support/concerns";
import { CONCERN_CLASSES } from "@aedart/contracts/support/concerns";
import makeConcernsInjector from "../helpers/makeConcernsInjector.js";

describe('@aedart/support/concerns', () => {
    describe('ConcernsInjector', () => {
        describe('defineConcerns()', () => {

            it('can define concerns classes in target', () => {
                class ConcernA extends AbstractConcern {}
                class ConcernB extends AbstractConcern {}
                class ConcernC extends AbstractConcern {}

                class A {}

                const injector = makeConcernsInjector(A);

                injector.defineConcerns(A, [
                    ConcernA,
                    ConcernB,
                    ConcernC,
                ]);

                // ------------------------------------------------------------------- //

                expect(Reflect.has(A, CONCERN_CLASSES))
                    .withContext('Target does not have static concern classes property defined')
                    .toBeTrue();

                const registered = A[CONCERN_CLASSES];
                expect(Array.isArray(registered))
                    .withContext('static concern classes property is not an array')
                    .toBeTrue();

                expect(registered)
                    .withContext('incorrect concern classes registered')
                    .toEqual([ ConcernA, ConcernB, ConcernC ]);
            });

            it('inherits already registered concerns from parent', () => {
                class ConcernA extends AbstractConcern {}
                class ConcernB extends AbstractConcern {}
                class ConcernC extends AbstractConcern {}

                class A {}

                class B extends A {}

                const injector = makeConcernsInjector(A);

                // Define for A
                injector.defineConcerns(A, [
                    ConcernA,
                    ConcernB
                ]);

                // Define for B
                injector.defineConcerns(B, [
                    ConcernC
                ]);

                // ------------------------------------------------------------------- //

                expect(Reflect.has(B, CONCERN_CLASSES))
                    .withContext('Target B does not have static concern classes property defined')
                    .toBeTrue();

                const registryB = B[CONCERN_CLASSES];

                // Debug
                // console.log('registry b', registryB);
                
                expect(registryB)
                    .withContext('Target B did not inherit concern classes from parent class')
                    .toEqual([ ConcernA, ConcernB, ConcernC ]);

                // ------------------------------------------------------------------- //
                
                // Ensure that A's concern classes have not been altered
                const registryA = A[CONCERN_CLASSES];
                
                // Debug
                // console.log('registry a', registryA);
                
                expect(registryA)
                    .withContext('Target A concern classes has been modified - BUT SHOULD NOT BE!')
                    .toEqual([ ConcernA, ConcernB ]);
            });

            it('fails when attempting to register same concern twice in target', () => {
                class ConcernA extends AbstractConcern {}

                class A {}

                const injector = makeConcernsInjector(A);

                const callback = () => {
                    injector.defineConcerns(A, [
                        ConcernA,
                        ConcernA, // Should cause error
                    ]);                    
                }

                // ------------------------------------------------------------------- //

                expect(callback)
                    .toThrowError(AlreadyRegisteredError);
            });

            it('fails to register concern class when already registered in parent', () => {
                class ConcernA extends AbstractConcern {}

                class A {}

                class B extends A {}

                const injector = makeConcernsInjector(A);

                // Define for A
                injector.defineConcerns(A, [
                    ConcernA
                ]);

                // Define for B
                const callback = () => {
                    injector.defineConcerns(B, [
                        ConcernA // Should cause error
                    ]);   
                }

                // ------------------------------------------------------------------- //

                expect(callback)
                    .toThrowError(AlreadyRegisteredError);
            });

            it('fails if unable to define static concern classes property', () => {
                class ConcernA extends AbstractConcern {}

                class A {}
                Object.freeze(A); // This can prevent static property from being added

                const injector = makeConcernsInjector(A);

                const callback = () => {
                    injector.defineConcerns(A, [
                        ConcernA
                    ]);
                }

                // ------------------------------------------------------------------- //

                expect(callback)
                    .toThrowError(InjectionError);
            });
        });
    });
});