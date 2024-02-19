import { isTypedArray } from "@aedart/support/arrays";

describe('@aedart/support/arrays', () => {
    describe('isTypedArray()', () => {

        it('can determine if object is Typed Array', () => {
            const dataSet = [
                { value: [], expected: false, name: 'Array' },
                { value: new Map(), expected: false, name: 'Map' },
                
                { value: new Int8Array(), expected: true, name: 'Int8Array' },
                { value: new Uint8Array(), expected: true, name: 'Uint8Array' },
                { value: new Uint8ClampedArray(), expected: true, name: 'Uint8ClampedArray' },
                { value: new Int16Array(), expected: true, name: 'Int16Array' },
                { value: new Uint16Array(), expected: true, name: 'Uint16Array' },
                { value: new Int32Array(), expected: true, name: 'Int32Array' },
                { value: new Uint32Array(), expected: true, name: 'Uint32Array' },
                { value: new Float32Array(), expected: true, name: 'Float32Array' },
                { value: new Float64Array(), expected: true, name: 'Float64Array' },
                { value: new BigInt64Array(), expected: true, name: 'BigInt64Array' },
                { value: new BigUint64Array(), expected: true, name: 'BigUint64Array' },
            ];
            
            for (const data of dataSet) {
                expect(isTypedArray(data.value))
                    .withContext(`${name} was expected to ${data.expected.toString()}`)
                    .toBe(data.expected);
            }
        });
    });    
});