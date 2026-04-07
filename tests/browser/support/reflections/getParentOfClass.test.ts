import { getParentOfClass } from "@aedart/support/reflections";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('getParentOfClass', () => {

        test('fails when no arguments given', () => {
            const callback = () => {
                // @ts-expect-error No argument provided for testing purpose...
                return getParentOfClass();
            }

            expect(callback)
                .toThrow(TypeError);
        });

        test('can return parent class', () => {

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

            expect(parentOfC, 'Incorrect parent of C')
                .toEqual(B);

            expect(parentOfB, 'Incorrect parent of B')

                .toEqual(A);

            expect(parentOfA, 'A should not have a parent')
                .toBeNull()
        });

    });
});
