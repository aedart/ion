import { getClassPropertyDescriptor } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('getClassPropertyDescriptor', () => {

        test('fails when target has no prototype', () => {
            const callback = () => {
                const obj = Object.create(null);

                getClassPropertyDescriptor(obj, 'name');
            }

            expect(callback, 'Should not be able to obtain anything from object without prototype')
                .toThrow(TypeError);
        });

        test('returns undefined if property does not exist', () => {
            class A {}

            const descriptor = getClassPropertyDescriptor(A, 'unknown_property');
            expect(descriptor)
                .toBeUndefined();
        });

        test('can get property descriptor from target prototype', () => {

            const MY_SYMBOL = Symbol('my_symbol');

            class A {
                set name(v) {}
                get name() { return null }
                foo() {}
                [MY_SYMBOL]() {}
            }

            const properties = [
                'name',
                'foo',
                MY_SYMBOL
            ];

            for (const key of properties) {
                const descriptor = getClassPropertyDescriptor(A, key);

                // Debug
                // console.log(descriptor);

                let k = (typeof key == "symbol")
                    ? key.toString()
                    : key

                expect(descriptor, 'No descriptor returned for ' + k)
                    .not
                    .toBeUndefined()
            }
        });

        test('returns undefined if property is private', () => {
            class A {
                #foo() {}
            }

            const a = getClassPropertyDescriptor(A, 'foo');
            expect(a, 'Returned descriptor for "foo"')
                .toBeUndefined();

            const b = getClassPropertyDescriptor(A, '#foo');
            expect(b, 'Returned descriptor for "#foo"')
                .toBeUndefined();
        });
        
    });
});
