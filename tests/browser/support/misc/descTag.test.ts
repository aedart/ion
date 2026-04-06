import { descTag } from '@aedart/support/misc';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/misc', () => {
    describe('descTag', () => {
        test('can return default string description', () => {
            class Custom
            {
                get [Symbol.toStringTag]() {
                    return 'My Custom Tag';
                }
            }

            const values = [
                { value: 'foo', expected: 'String' },
                { value: 3, expected: 'Number' },
                { value: [1, 2, 3], expected: 'Array' },
                { value: true, expected: 'Boolean' },
                { value: undefined, expected: 'Undefined' },
                { value: null, expected: 'Null' },
                {
                    value: function()
                    {},
                    expected: 'Function',
                },
                { value: new Custom(), expected: 'My Custom Tag' },
            ];

            for (const entry of values) {
                let result = descTag(entry.value);
                // console.log(result);

                expect(result)
                    .toBe('[object ' + entry.expected + ']');
            }
        });

        test('returns object undefined when no arguments given', () => {
            expect(descTag(undefined))
                .toBe('[object Undefined]');
        });
    });
});
