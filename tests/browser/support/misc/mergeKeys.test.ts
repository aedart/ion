import type { Key } from "@aedart/contracts/support";
import { mergeKeys, isKey } from "@aedart/support/misc";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/misc', () => {

    describe('mergeKeys', () => {
        
        test('can merge keys', () => {
            const a = Symbol('my-symbol');
            const b = [ 'b', 'c.d' ];
            const c = 23;

            const result = mergeKeys(a, b, c);
            const expected = [ a, ...b, c];

            expect(result, 'Incorrect merge of keys')
                .toEqual(expected);

            expect(isKey(result), 'Invalid key output')
                .toBeTruthy();
        });

        test('returns empty key when no arguments given', () => {
            const result = mergeKeys();
            const expected = [] as Key;

            expect(result, 'Should return empty key')
                .toEqual(expected);
        });

        test('throws TypeError when invalid arguments are given', () => {
            const a = Symbol('my-symbol');
            const b = [ 'b', 'c.d' ];
            const c = false; // Invalid key

            const callback = () => {
                // @ts-ignore
                return mergeKeys(a, b, c);
            }

            expect(callback, 'Should throw TypeError when arguments are invalid')
                .toThrow(TypeError);
        });
    });

});