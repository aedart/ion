import { isClassMethodReference } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('isClassMethodReference()', () => {

        it('can determine if value is a class method reference', () => {

            const MY_PROP = Symbol('@my_prop')
            const MY_METHOD = Symbol('@my_method')
            class A {
                name = 'Olaf';
                [MY_PROP] = 23;
                #title = '';

                get age() { return 45 } // Checks the actual return type...
                set title(v) { this.#title = v }

                foo() {}
                [MY_METHOD]() {}
            }

            const instance = new A();

            const data = [
                { value: undefined, expected: false, name: 'Undefined' },
                { value: null, expected: false, name: 'Null' },
                { value: [], expected: false, name: 'Array (empty)' },
                { value: [ A ], expected: false, name: 'Array (with target only)' },
                
                { value: [ A, 'does_not_exist' ], expected: false, name: 'Reference to method that does not exist' },
                { value: [ A, 'name' ], expected: false, name: 'Reference to field' },
                { value: [ A, MY_PROP ], expected: false, name: 'Reference to symbol field' },
                { value: [ A, 'age' ], expected: false, name: 'Reference to getter' },
                { value: [ A, 'title' ], expected: false, name: 'Reference to setter' },

                { value: [ instance, 'does_not_exist' ], expected: false, name: 'Reference via instance to method that does not exist' },
                { value: [ instance, 'name' ], expected: false, name: 'Reference via instance to field' },
                { value: [ instance, MY_PROP ], expected: false, name: 'Reference via instance to symbol field' },
                { value: [ instance, 'age' ], expected: false, name: 'Reference via instance to getter' },
                { value: [ instance, 'title' ], expected: false, name: 'Reference via instance to setter' },
                
                { value: [ A, 'foo' ], expected: true, name: 'Reference to method' },
                { value: [ A, MY_METHOD ], expected: true, name: 'Reference to method (symbol)' },
                { value: [ instance, 'foo' ], expected: true, name: 'Reference via instance to method' },
                { value: [ instance, MY_METHOD ], expected: true, name: 'Reference via instance to method (symbol)' },
            ];

            for (const entry of data) {
                expect(isClassMethodReference(entry.value))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });
    });
});