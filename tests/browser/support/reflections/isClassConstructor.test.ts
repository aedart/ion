import { isClassConstructor } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('isClassConstructor', () => {
        test('can determine if is class constructor', () => {
            class A
            {}

            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: {}, expected: false, name: 'object' },
                { value: [], expected: false, name: 'array' },
                { value: Array, expected: false, name: 'array (object)' },
                {
                    value: function()
                    {/* empty */},
                    expected: false,
                    name: 'function',
                },
                { value: () => {/* empty */}, expected: false, name: 'arrow function' },

                { value: A, expected: true, name: 'class' },
                { value: class {}, expected: true, name: 'class (anonymous)' },
            ];

            data.forEach((entry) => {
                const result = isClassConstructor(entry.value);
                expect(result, `${entry.name} was expected to be ${String(entry.expected)}`)
                    .toBe(entry.expected);
            });
        });
    });
});
