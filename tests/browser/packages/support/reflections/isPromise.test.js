import { isPromise } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('isPromise', () => {

        it('can determine if value is a promise', () => {

            class A {}

            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: {}, expected: false, name: 'object' },
                { value: [], expected: false, name: 'array' },
                { value: Array, expected: false, name: 'array (object)' },
                { value: A, expected: false, name: 'class' },
                { value: class {}, expected: false, name: 'class (anonymous)' },
                { value: function() {}, expected: false, name: 'function' },
                { value: () => {}, expected: false, name: 'function (arrow)' },
                { value: async function() { return false; }, expected: false, name: 'function (async)' },
                { value: async () => { return true; }, expected: false, name: 'function (async arrow)' },

                { value: new Promise(() => {}), expected: true, name: 'Promise (native)' },
                { value: Promise.resolve(true), expected: true, name: 'Promise (resolve)' },
                //{ value: Promise.reject('unknown'), expected: true, name: 'Promise (reject)' }, // Throws exception here...
                { value: { then: () => false }, expected: true, name: 'Thenable' },
            ];

            data.forEach((entry, index) => {

                let result = isPromise(entry.value);
                expect(result)
                    .withContext(`${entry.name} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });
    });
});