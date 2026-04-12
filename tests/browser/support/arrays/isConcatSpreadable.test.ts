import { isConcatSpreadable } from '@aedart/support/arrays';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/ararys', () => {
    describe('isConcatSpreadable()', () => {
        test('can determine if object contains Symbol.isConcatSpreadable', () => {
            const concatSpreadableArr: any[] = [1, 2, 3];

            // @ts-expect-error Setting Symbol.isConcatSpreadable for testing purposes
            concatSpreadableArr[Symbol.isConcatSpreadable] = true;

            class A
            {}

            class B
            {
                [Symbol.isConcatSpreadable] = false;
            }

            class C
            {
                [Symbol.isConcatSpreadable] = true;
            }
            
            const dataSet = [
                { value: null, expected: false, name: 'Null' },

                // Now this is funny... an array does Symbol.isConcatSpreadable !
                { value: [1, 2, 3], expected: false, name: 'Array' },

                {
                    value: concatSpreadableArr,
                    expected: true,
                    name: 'Array with Symbol.isConcatSpreadable',
                },
                {
                    value: {
                        0: 'a',
                        1: 'b',
                        2: 'c',
                    },
                    expected: false,
                    name: 'Object without Symbol.isConcatSpreadable',
                },
                {
                    value: {
                        [Symbol.isConcatSpreadable]: true,
                        // length: 3, // NOTE: length should be implemented when Symbol.isConcatSpreadable set to true!
                        0: 'a',
                        1: 'b',
                        2: 'c',
                    },
                    expected: true,
                    name: 'Object with Symbol.isConcatSpreadable',
                },
                {
                    value: new A(),
                    expected: false,
                    name: 'Class instance without Symbol.isConcatSpreadable',
                },
                {
                    value: new B(),
                    expected: false,
                    name: 'Class instance with Symbol.isConcatSpreadable (set to false)',
                },
                {
                    value: new C(),
                    expected: true,
                    name: 'Class instance with Symbol.isConcatSpreadable (set to true)',
                },
            ];

            for (const data of dataSet) {
                const result = isConcatSpreadable(data.value);

                // Debug
                // console.log('result', data.name, result);

                expect(result, `${data.name} was expected to ${data.expected.toString()}`)
                    .toBe(data.expected);
            }
        });
    });
});
