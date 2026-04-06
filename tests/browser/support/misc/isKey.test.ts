import { isKey } from '@aedart/support/misc';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/misc', () => {
    describe('isKey', () => {
        test('can determine if value is a valid key', () => {
            const valid = [
                0,
                1,
                -1,
                NaN,
                'foo',
                Symbol('my-symbol'),
                ['a', 'b.c'],
                ['a', 'b.c', 12, Symbol('my-other-symbol')],
            ];

            valid.forEach((value, index) => {
                expect(isKey(value), `Value at index ${index} is not a valid key`)
                    .toBeTruthy();
            });

            const invalid = [
                [],
                () => false,
                { name: 'John' },
                true,
                false,
                null,
                undefined,
            ];

            invalid.forEach((value, index) => {
                expect(isKey(value), `Invalid value at index ${index} SHOULD NOT be a valid key`)
                    .toBeFalsy();
            });
        });
    });
});
