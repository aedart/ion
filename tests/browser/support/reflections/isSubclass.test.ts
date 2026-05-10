import { type ConstructorLike } from '@aedart/contracts';
import { isSubclass } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('isSubclass()', () => {
        test('returns false if target has no prototype property', () => {
            const target = Object.create(null) as object;
            class A
            {}

            expect(isSubclass(target, A))
                .toBeFalsy();
        });

        test('returns false if superclass has no prototype property', () => {
            const target = Object.create(null) as object;
            class A
            {}

            expect(isSubclass(A, target as ConstructorLike))
                .toBeFalsy();
        });

        test('returns false when target and subclass params are the same', () => {
            class A
            {}

            expect(isSubclass(A, A))
                .toBeFalsy();
        });

        test('can determine if target is a subclass', () => {
            class A
            {}
            class B extends A
            {}
            class C extends B
            {}
            class D extends A
            {}

            expect(isSubclass(C, A))
                .toBeTruthy();

            expect(isSubclass(D, B), 'D should not be a subclass of B')
                .toBeFalsy();
        });
    });
});
