import { isset } from "@aedart/support/misc";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/misc', () => {
    
    describe('isset', () => {

        test('can determine if value differs from undefined and null',  ()  => {
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
                expect(isset(value), `Value at index ${index} is not set`)
                    .toBeTruthy();
            });

            const invalid = [
                undefined,
                null
            ];

            invalid.forEach((value, index) => {
                expect(isset(value), `Invalid value at index ${index} SHOULD NOT be set`)
                    .toBeFalsy();
            });
        });

        test('can determine if multiple values differ from undefined and null',  ()  => {

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

            expect(isset(...valid), `Valid values should be set`)
                .toBeTruthy();

            const invalid = [
                'abc', // valid
                undefined, // invalid
                null // invalid
            ];

            expect(isset(...invalid), `Invalid values SHOULD NOT be set`)
                .toBeFalsy();
        });
        
    });
    
});