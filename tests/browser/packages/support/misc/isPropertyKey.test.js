import {
    isPropertyKey
} from '@aedart/support/misc';

describe('@aedart/support/misc', () => {
    describe('isPropertyKey', () => {

        it('can determine if value is a property key', function () {
            const valid = [
                0,
                1,
                -1,
                NaN,
                'foo',
                Symbol('my-symbol')
            ];

            valid.forEach((value, index) => {
                expect(isPropertyKey(value))
                    .withContext(`Value at index ${index} is not a property key`)
                    .toBeTrue();
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
                expect(isPropertyKey(value))
                    .withContext(`Invalid value at index ${index} SHOULD NOT be a property key`)
                    .toBeFalse();
            });
        });
    });
});