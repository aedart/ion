import { isPrimitive } from '@aedart/support/misc';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/misc', () => {
    describe('isPrimitive', () => {
        test('can determine if value is a primitive', () => {
            const valid = [
                null,
                undefined,
                true,
                false,
                0,
                1,
                -1,
                1n,
                0n,
                NaN,
                'foo',
                Symbol('my-symbol'),
            ];

            valid.forEach((value, index) => {
                expect(isPrimitive(value), `Value at index ${index} is not a primitive`)
                    .toBeTruthy();
            });

            const invalid = [
                [1, 2, 3],
                () => false,
                { name: 'John' },
            ];

            invalid.forEach((value, index) => {
                expect(
                    isPrimitive(value),
                    `Invalid value at index ${index} SHOULD NOT be a primitive`,
                )
                    .toBeFalsy();
            });
        });
    });
});
