import { isConcernClass, AbstractConcern } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('isConcernClass()', () => {

        it('can determine if is a concern class', () => {
            
            const arr = [];
            
            class A {}
            
            class B {
                get concernOwner() {
                    return false;
                }
            }
            
            class C extends AbstractConcern {}

            class D extends C {}

            // ------------------------------------------------------------------------------------ //
            
            expect(isConcernClass(null))
                .withContext('Null is not a concern class')
                .toBeFalse();
            
            expect(isConcernClass(arr))
                .withContext('Array is not a concern class')
                .toBeFalse();

            expect(isConcernClass(A))
                .withContext('Class A is not a concern class')
                .toBeFalse();

            expect(isConcernClass(B))
                .withContext('Class B should be considered concern class')
                .toBeTrue();

            expect(isConcernClass(C))
                .withContext('Class C is concern class')
                .toBeTrue();

            expect(isConcernClass(D))
                .withContext('Class D is concern class (inherits from Clas C)')
                .toBeTrue();
        });

    });
});