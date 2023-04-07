import {
    isset
} from '@aedart/support/misc';

describe('@aedart/support/misc', () => {
    describe('isset', () => {

        it('can determine if value differs from undefined and null', function () {
            const valid = [
                'str',
                '',
                true,
                false,
                1234,
                1.234,
                [],
                {},
                () => true,
            ];
            
            valid.forEach((value, index) => {
                expect(isset(value))
                    .withContext(`Value at index ${index} is not set`)
                    .toBeTrue();
            });
            
            const invalid = [
                undefined,
                null
            ];

            invalid.forEach((value, index) => {
                expect(isset(value))
                    .withContext(`Invalid value at index ${index} SHOULD NOT be set`)
                    .toBeFalse();
            });
        });

        it('can determine if multiple values differ from undefined and null', function () {

            const valid = [
                'str',
                '',
                true,
                false,
                1234,
                1.234,
                [],
                {},
                () => true,
            ];

            expect(isset(...valid))
                .withContext(`Valid values should be set`)
                .toBeTrue();
            
            const invalid = [
                'abc', // valid
                undefined, // invalid
                null // invalid
            ];
            
            expect(isset(...invalid))
                .withContext(`Invalid values SHOULD NOT be set`)
                .toBeFalse();
        });
    });
});