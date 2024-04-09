import {
    isConstructor
} from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {

    describe('isConstructor()', () => {

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
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: /./, expected: false, name: 'RegExp (as string)' },
                { value: {}, expected: false, name: 'object' },
                { value: [], expected: false, name: 'array' },
                { value: () => {}, expected: false, name: 'function (arrow)' },

                { value: function() {}, expected: true, name: 'function' },
                { value: Array, expected: true, name: 'Array (object)' },
                { value: String, expected: true, name: 'String (object)' },
                { value: Number, expected: true, name: 'Number (object)' },
                { value: Date, expected: true, name: 'Date (object)' },
                { value: RegExp, expected: true, name: 'RegExp (object)' },
                { value: Map, expected: true, name: 'Map (object)' },
                { value: Set, expected: true, name: 'Set (object)' },
                { value: WeakMap, expected: true, name: 'WeakMap (object)' },
                { value: WeakSet, expected: true, name: 'WeakSet (object)' },
                { value: WeakRef, expected: true, name: 'WeakRef (object)' },

                { value: classWithConstructor, expected: true, name: 'class' },
                { value: class {}, expected: true, name: 'class (anonymous)' },
                { value: classWithStaticMethod.foo, expected: false, name: 'static class method' },
            ];

            data.forEach((entry, index) => {

                let result = isConstructor(entry.value);
                expect(result)
                    .withContext(`${entry.name} was expected to be ${entry.expected}`)
                    .toBe(entry.expected);
            });
        });

    });
});