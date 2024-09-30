import { isBindingTuple } from "@aedart/container";

describe('@aedart/container', () => {
    describe('isBindingTuple', () => {

        it('can determine if value is a binding tuple', () => {

            class A {}

            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: true, expected: false, name: 'boolean' },
                { value: {}, expected: false, name: 'object (empty)' },
                { value: A, expected: false, name: 'class (constructor)' },
                { value: [], expected: false, name: 'array (empty)' },
                { value: [ 'foo' ], expected: false, name: 'array (with a single element)' },
                
                { value: [ null, null ], expected: false, name: 'array (with invalid identifier and factory callback)' },
                { value: [ 'foo', null ], expected: false, name: 'array (with identifier and invalid factory callback)' },
                { value: [ 'foo', () => true, null ], expected: false, name: 'array (with identifier, factory callback and invalid shared state)' },

                { value: [ 'foo', () => true ], expected: true, name: 'array (with identifier and factory callback)' },
                { value: [ 'foo', () => true, false ], expected: true, name: 'array (with identifier, factory callback and shared state)' },
                { value: [ 'foo', A, false ], expected: true, name: 'array (with identifier, constructor and shared state)' },
            ];

            data.forEach((entry, index) => {

                let result = isBindingTuple(entry.value);
                expect(result)
                    .withContext(`${entry.name} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });

    });
});