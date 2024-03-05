import { getAllParentsOfClass } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('getAllParentsOfClass()', () => {

        it('fails when no arguments given', () => {
            const callback = () => {
                return getAllParentsOfClass();
            }

            expect(callback)
                .toThrowError(TypeError);
        });

        it('returns all parent classes', () => {

            class A {}
            class B extends A {}
            class C extends B {}
            
            const parents = getAllParentsOfClass(C);
            
            // Debug
            // console.log('parents of C', parents);
            
            expect(parents.length)
                .withContext('Incorrect amount of parents returned')
                .toEqual(2);

            expect(parents[0])
                .withContext('Incorrect parent of C')
                .toEqual(B);

            expect(parents[1])
                .withContext('Incorrect parent of B')
                .toEqual(A);
        });

        it('includes target in output', () => {

            class A {}
            class B extends A {}
            class C extends B {}

            const parents = getAllParentsOfClass(C, true);

            // Debug
            // console.log('parents', parents);

            expect(parents.length)
                .withContext('Incorrect amount of parents returned')
                .toEqual(3);

            expect(parents[0])
                .withContext('First element should be C')
                .toEqual(C);
            
            expect(parents[1])
                .withContext('Incorrect parent of C')
                .toEqual(B);

            expect(parents[2])
                .withContext('Incorrect parent of B')
                .toEqual(A);
        });

        it('returns empty array when target has no parents', () => {

            class A {}

            const parents = getAllParentsOfClass(A);

            expect(parents.length)
                .withContext('A should not have any parents')
                .toEqual(0);
        });
    });
});