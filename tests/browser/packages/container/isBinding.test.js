import { isBinding, BindingEntry } from "@aedart/container";

describe('@aedart/container', () => {
    describe('isBinding', () => {

        it('can determine if target is a binding entry', () => {

            class A {
                get identifier() { return true; }
                get value() { return true; }
                get shared() { return true; }
                get isFactoryCallback() { return true; }
                get isConstructor() { return true; }
            }

            const obj = {
                'identifier': true,
                'value': true,
                //'shared': true, // this should cause negative result...
                'isFactoryCallback': true,
                'isConstructor': true
            };
            
            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: {}, expected: false, name: 'object (empty)' },
                { value: [], expected: false, name: 'array (empty)' },

                { value: obj, expected: false, name: 'object that "almost" looks like a binding entry' },
                
                { value: new BindingEntry('a', () => true), expected: true, name: 'Binding Entry class (object)' },
                { value: new A(), expected: true, name: 'Custom Binding Entry class (object)' },
            ];

            data.forEach((entry, index) => {

                let result = isBinding(entry.value);
                expect(result)
                    .withContext(`${entry.name} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });

    });
});