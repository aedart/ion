import { isMethod } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('isMethod', () => {
        test('can determine if property is a class method', () => {
            const MY_PROP = Symbol('@my_prop');
            const MY_METHOD = Symbol('@my_method');
            class A
            {
                name = 'Olaf';
                [MY_PROP] = 23;
                #title = '';

                get age() {
                    return 45;
                } // Checks the actual return type...
                set title(v: string) {
                    this.#title = v;
                }

                foo()
                {}
                [MY_METHOD]()
                {}
            }

            const instance = new A();

            const data = [
                {
                    target: undefined,
                    property: undefined,
                    expected: false,
                    name: 'Undefined target',
                },
                { target: null, property: undefined, expected: false, name: 'null target' },

                {
                    target: instance,
                    property: undefined,
                    expected: false,
                    name: 'undefined property',
                },
                { target: instance, property: null, expected: false, name: 'null property' },

                { target: ['a', 'b', 'c'], property: 'c', expected: false, name: 'array target' },

                { target: instance, property: 'name', expected: false, name: 'field' },
                { target: instance, property: 'age', expected: false, name: 'getter' },
                { target: instance, property: 'title', expected: false, name: 'setter' },
                { target: instance, property: MY_PROP, expected: false, name: 'symbol field' },

                { target: instance, property: 'foo', expected: true, name: 'method' },
                { target: instance, property: MY_METHOD, expected: true, name: 'symbol method' },
            ];

            for (const entry of data) {
                expect(
                    // @ts-expect-error For testing purposes, isMethod's target can be anything here...
                    isMethod(entry.target, entry.property),
                    `${entry.name} was expected to ${entry.expected.toString()}`,
                )
                    .toBe(entry.expected);
            }
        });
    });
});
