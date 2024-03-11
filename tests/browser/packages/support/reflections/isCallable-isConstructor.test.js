import {
    isCallable,
    isClassConstructor,
    isConstructor
} from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {

    describe('isConstructor', () => {

        it('can determine if is constructor', () => {

            const classWithConstructor = class {
                constructor() {
                    throw new TypeError('Actual constructor invoked in class!');
                }
            }

            const classWithStaticMethod = class {
                static foo() {
                    throw new TypeError('Static method is invoked in class!');
                }
            }
            
            const data = [
                { value: null, expected: false },
                { value: undefined, expected: false },
                { value: /./, expected: false },
                { value: {}, expected: false },
                { value: [], expected: false },
                { value: function() {}, expected: true },
                { value: () => {}, expected: false },
                { value: Array, expected: true },
                { value: class {}, expected: true },
                { value: classWithConstructor, expected: true },
                { value: classWithStaticMethod.foo, expected: false },
            ];

            data.forEach((entry, index) => {

                let result = isConstructor(entry.value);
                expect(result)
                    .withContext(`Value at index ${index} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });

    });
    
    describe('isCallable', () => {
        
        // TODO: Unsafe / Unstable...
        
        it('can determine if is callable', () => {

            const data = [
                { value: null, expected: false },
                { value: {}, expected: false },
                { value: [], expected: false },
                { value: function() {}, expected: true },
                { value: () => {}, expected: true },
                { value: Array, expected: true },
                { value: class {}, expected: false },
            ];

            data.forEach((entry, index) => {

                let result = isCallable(entry.value);
                expect(result)
                    .withContext(`Value at index ${index} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });
        
    });
});