import { isSubclass } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('isSubclass()', () => {

        it('returns false if target has no prototype property', () => {
            
            const target = Object.create(null);
            class A {}
            
            expect(isSubclass(target, A))
                .toBeFalse();
        });

        it('returns false if superclass has no prototype property', () => {

            const target = Object.create(null);
            class A {}

            expect(isSubclass(A, target))
                .toBeFalse();
        });
        
        it('returns false when target and subclass params are the same', () => {
            class A {}

            expect(isSubclass(A, A))
                .toBeFalse();
        });

        it('can determine if target is a subclass', () => {
            
            class A {}
            class B extends A {}
            class C extends B {}
            class D extends A {}

            expect(isSubclass(C, A))
                .toBeTrue();

            expect(isSubclass(D, B))
                .withContext('D should not be a subclass of B')
                .toBeFalse();
        });
    }); 
});