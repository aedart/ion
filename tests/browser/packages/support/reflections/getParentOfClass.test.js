import { getParentOfClass } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('getParentOfClass()', () => {

        it('fails when no arguments given', () => {
            const callback = () => {
                return getParentOfClass();
            }
            
            expect(callback)
                .toThrowError(TypeError);
        });

        it('can return parent class', () => {
            
            class A {}
            class B extends A {}
            class C extends B {}
            
            const parentOfC = getParentOfClass(C);
            const parentOfB = getParentOfClass(B);
            const parentOfA = getParentOfClass(A);
            
            // Debug
            // console.log('Parent of C', parentOfC);
            // console.log('Parent of B', parentOfB);
            // console.log('Parent of A', parentOfA);
            
            expect(parentOfC)
                .withContext('Incorrect parent of C')
                .toEqual(B);

            expect(parentOfB)
                .withContext('Incorrect parent of B')
                .toEqual(A);

            expect(parentOfA)
                .withContext('A should not have a parent')
                .toBeNull()
        });
    }); 
});