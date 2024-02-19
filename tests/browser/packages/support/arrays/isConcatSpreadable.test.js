import { isConcatSpreadable } from "@aedart/support/arrays";

describe('@aedart/support/arrays', () => {
    describe('isConcatSpreadable()', () => {

        it('can determine if object contains Symbol.isConcatSpreadable', () => {

            const concatSpreadableArr = [ 1, 2, 3 ];
            concatSpreadableArr[Symbol.isConcatSpreadable] = true;

            class A {}
            
            class B {
                [Symbol.isConcatSpreadable] = false;
            }
            
            const dataSet = [
                // Now this is funny... an array does Symbol.isConcatSpreadable !
                { value: [ 1, 2, 3 ], expected: false, name: 'Array' },

                { value: concatSpreadableArr, expected: true, name: 'Array with Symbol.isConcatSpreadable' },
                {
                    value: {
                        0: 'a',
                        1: 'b',
                        2: 'c'
                    },
                    expected: false,
                    name: 'Object without Symbol.isConcatSpreadable'
                },
                {
                    value: {
                        [Symbol.isConcatSpreadable]: true,
                        //length: 3, // NOTE: length should be implemented when Symbol.isConcatSpreadable set to true!
                        0: 'a',
                        1: 'b',
                        2: 'c'
                    },
                    expected: true,
                    name: 'Object with Symbol.isConcatSpreadable'
                },
                {
                    value: new A(),
                    expected: false,
                    name: 'Class instance without Symbol.isConcatSpreadable'
                },
                {
                    value: new B(),
                    expected: true,
                    name: 'Class instance with Symbol.isConcatSpreadable'
                },
            ];

            for (const data of dataSet) {
                const result = isConcatSpreadable(data.value);

                // Debug
                // console.log('result', data.name, result);
                
                expect(result)
                    .withContext(`${data.name} was expected to ${data.expected.toString()}`)
                    .toBe(data.expected);
            }
        });
    });
});