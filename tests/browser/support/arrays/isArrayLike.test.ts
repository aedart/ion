import { isArrayLike, isSafeArrayLike } from '@aedart/support/arrays';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/arrays', () => {
    describe('isArrayLike()', () => {
        test('can determine if is array-like', () => {
            const dataSet = [
                { value: [], expected: true, name: 'Array' },
                { value: 'abc', expected: true, name: 'string' },
                { value: { length: 0 }, expected: true, name: 'Object (with length property)' },
                { value: new String('abc'), expected: true, name: 'String (object)' },
                { value: new Int8Array(), expected: true, name: 'TypedArray' },
                {
                    value: function()
                    {
                        return arguments;
                    }(),
                    expected: true,
                    name: 'Arguments object',
                },

                // Boundary length checks
                {
                    value: { length: Number.MAX_SAFE_INTEGER },
                    expected: true,
                    name: 'Object with MAX_SAFE_INTEGER length',
                },
                {
                    value: { length: Infinity },
                    expected: false,
                    name: 'Object with Infinity length',
                },
                { value: { length: NaN }, expected: false, name: 'Object with NaN length' },
                {
                    value: { length: 1.5 },
                    expected: false,
                    name: 'Object with floating point length',
                },
                { value: { length: -1 }, expected: false, name: 'Object with negative length' },

                // These should never be considered array-like...
                { value: new Boolean(true), expected: false, name: 'Boolean' },
                { value: new Number(123), expected: false, name: 'Number' },
                { value: {}, expected: false, name: 'Object (without length property)' },
                { value: new Map(), expected: false, name: 'Map' },
                { value: new Set(), expected: false, name: 'Set' },
                {
                    value: function()
                    {},
                    expected: false,
                    name: 'Function',
                },
                { value: new Date(), expected: false, name: 'Date' },
                { value: new ArrayBuffer(2), expected: false, name: 'ArrayBuffer' },
                { value: new DataView(new ArrayBuffer(2)), expected: false, name: 'DataView' },
                { value: new RegExp(/ab/g), expected: false, name: 'RegExp' },
                { value: null, expected: false, name: 'null' },
                { value: undefined, expected: false, name: 'undefined' },
            ];

            for (const data of dataSet) {
                expect(
                    isArrayLike(data.value),
                    `${data.name} was expected to ${data.expected.toString()}`,
                ).toBe(data.expected);
            }
        });

        test('can determine if is "safe" array-like', () => {
            // Note: "Safe" usually excludes strings/objects that are technically array-like
            // but often handled differently in logic.
            const dataSet = [
                { value: [], expected: true, name: 'Array' },
                { value: { length: 0 }, expected: true, name: 'Object (with length property)' },
                {
                    value: function()
                    {
                        return arguments;
                    }(),
                    expected: true,
                    name: 'Arguments object',
                },

                // -------------------------------------------------------------------------------- //
                { value: 'abc', expected: false, name: 'string' },
                { value: new String('abc'), expected: false, name: 'String (object)' },
                { value: new Int8Array(), expected: false, name: 'TypedArray' },

                // -------------------------------------------------------------------------------- //
                { value: new Boolean(true), expected: false, name: 'Boolean' },
                { value: new Number(123), expected: false, name: 'Number' },
                { value: {}, expected: false, name: 'Object (without length property)' },
                {
                    value: function()
                    {},
                    expected: false,
                    name: 'Function',
                },
            ];

            for (const data of dataSet) {
                expect(
                    isSafeArrayLike(data.value),
                    `${data.name} was expected to ${data.expected.toString()}`,
                ).toBe(data.expected);
            }
        });
    });
});
