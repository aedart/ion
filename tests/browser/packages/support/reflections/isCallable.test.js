import {
    isCallable,
} from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('isCallable', () => {
        
        it('can determine if is callable', () => {

            class A {}
            
            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: {}, expected: false, name: 'object' },
                { value: [], expected: false, name: 'array' },
                { value: A, expected: false, name: 'class' },
                { value: class {}, expected: false, name: 'class (anonymous)' },

                { value: Array, expected: true, name: 'array (object)' },
                { value: function() {}, expected: true, name: 'function' },
                { value: () => {}, expected: true, name: 'function (arrow)' },
            ];

            data.forEach((entry, index) => {

                let result = isCallable(entry.value);
                expect(result)
                    .withContext(`${entry.name} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });

    });
});