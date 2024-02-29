import { isArrayLike, isSafeArrayLike } from "@aedart/support/arrays";

describe('@aedart/support/arrays', () => {
    describe('isArrayLike()', () => {

        it('can determine if is array-like', () => {
            
            const dataSet = [
                { value: [], expected: true, name: 'Array' },
                { value: 'abc', expected: true, name: 'string' },
                { value: { length: 0 }, expected: true, name: 'Object (with length property)' },
                
                // Well, String() object does have a `length` property
                { value: new String('abc'), expected: true, name: 'String (object)' },  

                // TypeArrays have a length property too!
                { value: new Int8Array(), expected: true, name: 'TypedArray' },
                
                // -------------------------------------------------------------------------------- //
                // These should never be considered array-like...
                
                { value: new Boolean(true), expected: false, name: 'Boolean' },
                { value: new Number(123), expected: false, name: 'Number' },
                { value: {}, expected: false, name: 'Object (without length property)' },
                { value: new Map(), expected: false, name: 'Map' },
                { value: new Set(), expected: false, name: 'Set' },
                { value: function() {}, expected: false, name: 'Function' },
                { value: new Date(), expected: false, name: 'Date' },
                { value: new ArrayBuffer(2), expected: false, name: 'ArrayBuffer' },
                { value: new DataView(new ArrayBuffer(2)), expected: false, name: 'DataView' },
                { value: new RegExp(/ab/g), expected: false, name: 'RegExp' },
            ];

            for (const data of dataSet) {
                expect(isArrayLike(data.value))
                    .withContext(`${data.name} was expected to ${data.expected.toString()}`)
                    .toBe(data.expected);
            }
        });

        it('can determine if is "safe" array-like', () => {

            const dataSet = [
                { value: [], expected: true, name: 'Array' },
                { value: { length: 0 }, expected: true, name: 'Object (with length property)' },

                // -------------------------------------------------------------------------------- //
                { value: 'abc', expected: false, name: 'string' },
                { value: new String('abc'), expected: false, name: 'String (object)' },
                { value: new Int8Array(), expected: false, name: 'TypedArray' },
                
                // -------------------------------------------------------------------------------- //
                // These should never be considered array-like...

                { value: new Boolean(true), expected: false, name: 'Boolean' },
                { value: new Number(123), expected: false, name: 'Number' },
                { value: {}, expected: false, name: 'Object (without length property)' },
                { value: new Map(), expected: false, name: 'Map' },
                { value: new Set(), expected: false, name: 'Set' },
                { value: function() {}, expected: false, name: 'Function' },
                { value: new Date(), expected: false, name: 'Date' },
                { value: new ArrayBuffer(2), expected: false, name: 'ArrayBuffer' },
                { value: new DataView(new ArrayBuffer(2)), expected: false, name: 'DataView' },
                { value: new RegExp(/ab/g), expected: false, name: 'RegExp' },
            ];

            for (const data of dataSet) {
                expect(isSafeArrayLike(data.value))
                    .withContext(`${data.name} was expected to ${data.expected.toString()}`)
                    .toBe(data.expected);
            }
        });
    });
});