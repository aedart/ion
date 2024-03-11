import {
    isClassConstructor,
} from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('isClassConstructor', () => {

        it('can determine if is class constructor', () => {

            class A {}
            
            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: {}, expected: false, name: 'object' },
                { value: [], expected: false, name: 'array' },
                { value: Array, expected: false, name: 'array (object)' },
                { value: function() {}, expected: false, name: 'function' },
                { value: () => {}, expected: false, name: 'arrow function' },

                { value: A, expected: true, name: 'class' },
                { value: class {}, expected: true, name: 'class (anonymous)' },
            ];

            data.forEach((entry, index) => {

                let result = isClassConstructor(entry.value);
                expect(result)
                    .withContext(`${entry.name} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });
    });
});