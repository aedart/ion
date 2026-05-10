import { mergeKeys } from '@aedart/support/misc';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/misc', () => {
    describe('mergeKeys', () => {
        test('returns empty array when no arguments are provided', () => {
            expect(mergeKeys()).toEqual([]);
        });

        test('can merge single property keys into an array', () => {
            const sym = Symbol('test');
            expect(mergeKeys('a', 123, sym)).toEqual(['a', 123, sym]);
        });

        test('can flatten and merge arrays of property keys', () => {
            const input = ['a', 'b'];
            const result = mergeKeys(input, ['c', 1]);

            expect(result).toEqual(['a', 'b', 'c', 1]);
            expect(result).not.toBe(input); // Confirms a new instance is created
        });

        test('can merge a mix of single keys and arrays', () => {
            expect(mergeKeys('a', [1, 2], 'b')).toEqual(['a', 1, 2, 'b']);
        });

        test('throws TypeError if a single argument is not a valid property key', () => {
            const callback = () => {
                // @ts-expect-error testing if mergeKeys() throws TypeError on invalid key.
                return mergeKeys(true);
            };

            expect(callback).toThrow(/must be a valid "key", boolean given/);
        });

        test('throws TypeError if an array argument contains an invalid property key', () => {
            const callback = () => {
                // @ts-expect-error testing if mergeKeys() throws TypeError on invalid key.
                return mergeKeys(['valid', { name: 'invalid' }]);
            };

            expect(callback).toThrow(/contains an invalid property key at index 1/);
        });
    });
});
