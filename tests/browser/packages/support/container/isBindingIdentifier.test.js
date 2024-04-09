import { isBindingIdentifier } from "@aedart/support/container";

describe('@aedart/support/container', () => {
    describe('isBindingIdentifier', () => {

        it('can determine if value is a binding identifier', () => {

            class A {}

            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },

                { value: 'lorum lipsum', expected: true, name: 'string' },
                { value: Symbol('my_identifier'), expected: true, name: 'symbol' },
                { value: 123, expected: true, name: 'number' },
                { value: {}, expected: true, name: 'object (empty)' },
                { value: [], expected: true, name: 'array (empty)' },
                { value: A, expected: true, name: 'class' },
                { value: class {}, expected: true, name: 'class (anonymous)' },
                { value: function() {}, expected: true, name: 'function' },
                { value: () => {}, expected: true, name: 'function (arrow)' },
            ];

            data.forEach((entry, index) => {

                let result = isBindingIdentifier(entry.value);
                expect(result)
                    .withContext(`${entry.name} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });

    });
});