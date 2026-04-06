import { isPropertyKey } from "@aedart/support/misc";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/misc', () => {

    describe('isPropertyKey', () => {

        test('can determine if value is a property key',  () => {
            const valid = [
                0,
                1,
                -1,
                NaN,
                'foo',
                Symbol('my-symbol')
            ];

            valid.forEach((value, index) => {
                expect(isPropertyKey(value), `Value at index ${index} is not a property key`)
                    .toBeTruthy();
            });

            const invalid = [
                [1, 2, 3],
                () => false,
                { name: 'John' },
                true,
                false,
                null,
                undefined
            ];

            invalid.forEach((value, index) => {
                expect(isPropertyKey(value), `Invalid value at index ${index} SHOULD NOT be a property key`)
                    .toBeFalsy();
            });
        });

    });

});