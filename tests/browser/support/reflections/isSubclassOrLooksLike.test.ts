import { isSubclassOrLooksLike } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('isSubclassOrLooksLike()', () => {
        test('can determine if target is subclass or looks like blueprint', () => {
            class A
            {
                foo()
                {/* empty */}
            }
            class B extends A
            {}

            class C
            {
                foo()
                {/* empty */}
            }

            // --------------------------------------------------------------------------------------- //

            const data = [
                {
                    target: B,
                    superclass: A,
                    blueprint: {
                        staticMembers: [],
                        members: [],
                    },
                    expected: true,
                    name: 'B (should be superclass of A)',
                },
                {
                    target: C,
                    superclass: A,
                    blueprint: {
                        staticMembers: [],
                        members: ['foo'],
                    },
                    expected: true,
                    name: 'C (should "look like" class A)',
                },
                {
                    target: C,
                    superclass: B,
                    blueprint: {
                        staticMembers: [],
                        members: ['bar'],
                    },
                    expected: false,
                    name: 'C (should "look like" class B or contain member)',
                },
            ];

            for (const entry of data) {
                const result = isSubclassOrLooksLike(
                    entry.target,
                    entry.superclass,
                    entry.blueprint,
                );
                expect(result, `${entry.name} was expected to ${String(entry.expected)}`)
                    .toBe(entry.expected);
            }
        });

        test('fails if target is invalid', () => {
            const callback = function()
            {
                // @ts-expect-error Null target for testing purposes
                isSubclassOrLooksLike(null, {}, {});
            };

            expect(callback)
                .toThrow(TypeError);
        });
    });
});
