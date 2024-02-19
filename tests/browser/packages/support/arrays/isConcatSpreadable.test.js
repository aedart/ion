import { isConcatSpreadable } from "@aedart/support/arrays";

describe('@aedart/support/arrays', () => {
    describe('isConcatSpreadable()', () => {

        it('can determine if object is concat spreadable', () => {
            
            const concatSpreadableArr = [ 1, 2, 3 ];
            concatSpreadableArr[Symbol.isConcatSpreadable] = true;
            
            class A {
                get [Symbol.isConcatSpreadable]() {
                    return true;
                }
                
                get length() {
                    return 2
                }
                
                0 = 'yes';
                1 = 'no';
            }
            
            const dataSet = [
                // Now this is funny... an array does not inherit Symbol.isConcatSpreadable !
                { value: [ 1, 2, 3 ], expected: false, name: 'Array' },
                
                { value: concatSpreadableArr, expected: true, name: 'Array with Symbol.isConcatSpreadable' },
                {
                    value: {
                        [Symbol.isConcatSpreadable]: true,
                        //length: 3, // NOTE: length is required.
                        0: 'a',
                        1: 'b',
                        2: 'c'
                    },
                    expected: false,
                    name: 'Object with Symbol.isConcatSpreadable'
                },
                {
                    value: {
                        [Symbol.isConcatSpreadable]: true,
                        length: 3,
                        0: 'a',
                        1: 'b',
                        2: 'c'
                    },
                    expected: true,
                    name: 'Object with Symbol.isConcatSpreadable and length property'
                },
                {
                    value: new A(),
                    expected: true,
                    name: 'Class instance with Symbol.isConcatSpreadable and length property'
                },
            ];

            for (const data of dataSet) {
                const result = isConcatSpreadable(data.value); 
                
                // Debug
                // console.log('result', data.name, result);
                
                expect(result)
                    .withContext(`${data.name} was expected to ${data.expected.toString()}`)
                    .toBe(data.expected);
                
                if (data.expected === true) {
                    const target = [ 'foo', 'bar' ];
                    const concat = [].concat(target, data.value);

                    // Debug
                    // console.log('concat', concat);

                    expect(concat.length)
                        .withContext('Unable to concat')
                        .toBe(target.length + data.value.length);
                }
            }
        });
    });
});