import {
    isPrimitive
} from '@aedart/support/misc';

describe('@aedart/support/misc', () => {
    describe('isPrimitive', () => {

        it('can determine if value is a primitive', function () {
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
                Symbol('my-symbol')
            ];

            valid.forEach((value, index) => {
                expect(isPrimitive(value))
                    .withContext(`Value at index ${index} is not a primitive`)
                    .toBeTrue();
            });

            const invalid = [
                [1, 2, 3],
                () => false,
                { name: 'John' }
            ];

            invalid.forEach((value, index) => {
                expect(isPrimitive(value))
                    .withContext(`Invalid value at index ${index} SHOULD NOT be a primitive`)
                    .toBeFalse();
            });
        });
    });
});