import { getAllParentsOfClass } from "@aedart/support/reflections";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('getAllParentsOfClass', () => {

        test('fails when no arguments given', () => {
            const callback = () => {
                // @ts-expect-error No args provided for testing purposes
                return getAllParentsOfClass();
            }

            expect(callback)
                .toThrow(TypeError);
        });

        test('returns all parent classes', () => {

            class A {}
            class B extends A {}
            class C extends B {}

            const parents = getAllParentsOfClass(C);

            // Debug
            // console.log('parents of C', parents);

            expect(parents.length, 'Incorrect amount of parents returned')
                .toEqual(2);

            expect(parents[0], 'Incorrect parent of C')
                .toEqual(B);

            expect(parents[1], 'Incorrect parent of B')
                .toEqual(A);
        });

        test('includes target in output', () => {

            class A {}
            class B extends A {}
            class C extends B {}

            const parents = getAllParentsOfClass(C, true);

            // Debug
            // console.log('parents', parents);

            expect(parents.length, 'Incorrect amount of parents returned')
                .toEqual(3);

            expect(parents[0], 'First element should be C')
                .toEqual(C);

            expect(parents[1], 'Incorrect parent of C')
                .toEqual(B);

            expect(parents[2], 'Incorrect parent of B')
                .toEqual(A);
        });

        test('returns empty array when target has no parents', () => {

            class A {}

            const parents = getAllParentsOfClass(A);

            expect(parents.length, 'A should not have any parents')
                .toEqual(0);
        });

    });
});
