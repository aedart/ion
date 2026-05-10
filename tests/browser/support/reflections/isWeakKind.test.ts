import { isWeakKind } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('isWeakKind()', () => {
        test('can determine if is of weak kind', () => {
            const classWithConstructor = class {
                constructor()
                {
                    throw new TypeError('Actual constructor invoked in class!');
                }
            };

            const classWithStaticMethod = class {
                static foo()
                {
                    throw new TypeError('Static method is invoked in class!');
                }
            };

            const data = [
                { value: undefined, expected: false, name: 'undefined' },
                { value: null, expected: false, name: 'null' },
                { value: /./, expected: false, name: 'RegExp (as string)' },
                { value: {}, expected: false, name: 'object' },
                { value: [], expected: false, name: 'array' },
                { value: () => {/* empty */}, expected: false, name: 'function (arrow)' },

                {
                    value: function()
                    {/* empty */},
                    expected: false,
                    name: 'function',
                },
                { value: Array, expected: false, name: 'Array (object)' },
                { value: String, expected: false, name: 'String (object)' },
                { value: Number, expected: false, name: 'Number (object)' },
                { value: Date, expected: false, name: 'Date (object)' },
                { value: RegExp, expected: false, name: 'RegExp (object)' },
                { value: Map, expected: false, name: 'Map (object)' },
                { value: Set, expected: false, name: 'Set (object)' },

                { value: classWithConstructor, expected: false, name: 'class' },
                { value: class {}, expected: false, name: 'class (anonymous)' },
                {
                    value: classWithStaticMethod.foo.bind(classWithStaticMethod),
                    expected: false,
                    name: 'static class method',
                },

                { value: new WeakMap(), expected: true, name: 'WeakMap (object)' },
                { value: new WeakSet(), expected: true, name: 'WeakSet (object)' },
                { value: new WeakRef({}), expected: true, name: 'WeakRef (object)' },
            ];

            data.forEach((entry) => {
                // @ts-expect-error Ignore value for testing purposes...
                const result = isWeakKind(entry.value);
                expect(result, `${entry.name} was expected to be ${String(entry.expected)}`)
                    .toBe(entry.expected);
            });
        });
    });
});
