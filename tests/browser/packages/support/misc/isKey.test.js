import {
    isKey
} from '@aedart/support/misc';

describe('@aedart/support/misc', () => {
    describe('isKey', () => {

        it('can determine if value is a valid key', function () {
            const valid = [
                0,
                1,
                -1,
                NaN,
                'foo',
                Symbol('my-symbol'),
                [ 'a', 'b.c' ],
                [ 'a', 'b.c', 12, Symbol('my-other-symbol') ],
            ];

            valid.forEach((value, index) => {
                expect(isKey(value))
                    .withContext(`Value at index ${index} is not a valid key`)
                    .toBeTrue();
            });

            const invalid = [
                [],
                () => false,
                { name: 'John' },
                true,
                false,
                null,
                undefined
            ];

            invalid.forEach((value, index) => {
                expect(isKey(value))
                    .withContext(`Invalid value at index ${index} SHOULD NOT be a valid key`)
                    .toBeFalse();
            });
        });
    });
});