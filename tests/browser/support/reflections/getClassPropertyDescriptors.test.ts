import {
    getClassPropertyDescriptor,
    getClassPropertyDescriptors,
} from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('getClassPropertyDescriptors()', () => {
        test('fails when target has no prototype', () => {
            const callback = () => {
                const obj = Object.create(null) as object;

                // @ts-expect-error object type is intentional to provoke error
                getClassPropertyDescriptors(obj);
            };

            expect(callback, 'Should not be able to obtain anything from object without prototype')
                .toThrow(TypeError);
        });

        test('can get property descriptors for class\'s prototype', () => {
            const MY_SYMBOL = Symbol('my_symbol');

            class A
            {
                set name(v) {
                    /* empty */
                }
                get name() {
                    return null;
                }
                bar()
                {
                    /* empty */
                }
                [MY_SYMBOL]()
                {
                    /* empty */
                }
            }

            // -------------------------------------------------------------------------------- //

            const expected = [
                'constructor',
                'name',
                'bar',
                MY_SYMBOL,
            ];

            const descriptors = getClassPropertyDescriptors(A);

            // Debug
            // console.log(descriptors);

            for (const key of expected) {
                const k = (typeof key == 'symbol')
                    ? key.toString()
                    : key;

                expect(Reflect.has(descriptors, key), 'Key ' + k + ' not in descriptors record')
                    .toBeTruthy();

                const descriptor = descriptors[key];

                // Debug
                // console.log(key, descriptor);

                expect(descriptor, 'No descriptor returned for ' + k)
                    .not
                    .toBeUndefined();
            }
        });

        test('can get static property descriptors for class', () => {
            const MY_SYMBOL = Symbol('my_symbol');

            class A
            {
                static set name(v) {
                    /* empty */
                }
                static get name() {
                    return null;
                }
                static bar()
                {
                    /* empty */
                }
                static [MY_SYMBOL]()
                {
                    /* empty */
                }
            }

            // -------------------------------------------------------------------------------- //

            const expected = [
                'prototype',
                'length',
                'name',
                'bar',
                MY_SYMBOL,
            ];

            const descriptors = getClassPropertyDescriptors(A, false, false);

            // Debug
            // console.log(descriptors);

            for (const key of expected) {
                const k = (typeof key == 'symbol')
                    ? key.toString()
                    : key;

                expect(Reflect.has(descriptors, key), 'Key ' + k + ' not in descriptors record')
                    .toBeTruthy();

                const descriptor = descriptors[key];

                // Debug
                // console.log(key, descriptor);

                expect(descriptor, 'No descriptor returned for ' + k)
                    .not
                    .toBeUndefined();
            }
        });
        
        test('can get property descriptors for class\'s prototype recursively', () => {
            const MY_SYMBOL = Symbol('my_symbol');

            class A
            {
                set name(v) {
                    /* empty */
                }
                get name() {
                    return null;
                }
                foo()
                {
                    /* empty */
                }
                [MY_SYMBOL]()
                {
                    /* empty */
                }
            }

            class B extends A
            {
                set bar(v) {
                    /* empty */
                }
                get bar() {
                    return null;
                }
            }

            // -------------------------------------------------------------------------------- //

            const expected = [
                'constructor',
                'name',
                'foo',
                'bar',
                MY_SYMBOL,
            ];

            const descriptors = getClassPropertyDescriptors(B, true);
            for (const key of expected) {
                const k = (typeof key == 'symbol')
                    ? key.toString()
                    : key;

                expect(Reflect.has(descriptors, key), 'Key ' + k + ' not in descriptors record')
                    .toBeTruthy();

                const descriptor = descriptors[key];
                expect(descriptor, 'No descriptor returned for ' + k)
                    .not
                    .toBeUndefined();
            }
        });

        test('can get static property descriptors for class recursively', () => {
            const MY_SYMBOL = Symbol('my_symbol');

            class A
            {
                static set name(v) {
                    /* empty */
                }
                static get name() {
                    return null;
                }
                static foo()
                {
                    /* empty */
                }
                static [MY_SYMBOL]()
                {
                    /* empty */
                }
            }

            class B extends A
            {
                static set bar(v) {
                    /* empty */
                }
                static get bar() {
                    return null;
                }
            }

            // -------------------------------------------------------------------------------- //

            const expected = [
                'prototype',
                'length',
                'name',
                'foo',
                'bar',
                MY_SYMBOL,
            ];

            const descriptors = getClassPropertyDescriptors(B, true, false);
            // Debug
            // console.log(descriptors);
            
            for (const key of expected) {
                const k = (typeof key == 'symbol')
                    ? key.toString()
                    : key;

                expect(Reflect.has(descriptors, key), 'Key ' + k + ' not in descriptors record')
                    .toBeTruthy();

                const descriptor = descriptors[key];
                expect(descriptor, 'No descriptor returned for ' + k)
                    .not
                    .toBeUndefined();
            }
        });
        
        test('returns top-most property descriptors', () => {
            const MY_SYMBOL = Symbol('my_symbol');

            class A
            {
                set name(v) {
                    /* empty */
                }
                get name() {
                    return null;
                }
                foo()
                {
                    /* empty */
                }
                [MY_SYMBOL]()
                {
                    /* empty */
                }
            }

            class B extends A
            {
                set name(v) {
                    /* empty */
                }
                get name() {
                    return null;
                }
                foo()
                {
                    /* empty */
                }
                [MY_SYMBOL]()
                {
                    return false;
                }
            }

            // -------------------------------------------------------------------------------- //

            const expected: PropertyKey[] = [
                'constructor',
                'name',
                'foo',
                MY_SYMBOL,
            ];

            const descriptors = getClassPropertyDescriptors(B, true);
            for (const key of expected) {
                const k = (typeof key == 'symbol')
                    ? key.toString()
                    : key;

                const parentDescriptor = getClassPropertyDescriptor(A, key);
                const targetDescriptor = getClassPropertyDescriptor(B, key);
                const descriptor = descriptors[key];

                // Debug
                // console.log('parent', key, parentDescriptor);
                // console.log('target', key, descriptor);

                // Value, get, set... check of descriptor
                const props: PropertyKey[] = Reflect.ownKeys(descriptor);
                for (const p of props) {
                    // Debug
                    // console.log('   - parent', p, parentDescriptor[p]);
                    // console.log('   - target', p, descriptor[p]);

                    // Skip assert if not "value", "get" or "set
                    if (!['value', 'get', 'set'].includes(p as string)) {
                        continue;
                    }

                    // Ensure does not match parent's descriptor...
                    expect(
                        // @ts-expect-error Ignore descriptor property comparison here for testing purposes.
                        descriptor[p] !== parentDescriptor[p],
                        `${k}[${
                            String(p)
                        }] matches parent descriptor property, but SHOULD NOT do so`,
                    )
                        .toBeTruthy();

                    // Double check...
                    expect(
                        // @ts-expect-error Ignore descriptor property comparison here for testing purposes.
                        descriptor[p] === targetDescriptor[p],
                        `${k}[${String(p)}] does NOT match target property descriptor property!`,
                    )
                        .toBeTruthy();
                }

                // Debug
                // console.log('- - - '.repeat(15));
            }
        });

        test('merges property descriptors', () => {
            class A
            {
                get age(): number {
                    return 1 + Math.random();
                }
            }

            class B extends A
            {
                set age(value: number) {
                    /* empty */
                }
            }

            // -------------------------------------------------------------------------------- //

            const descriptors = getClassPropertyDescriptors(B, true);

            expect(Reflect.has(descriptors, 'age'), 'age property descriptor not in output')
                .toBeTruthy();

            const ageDesc = descriptors.age;

            // Debug
            // console.log('Age property descriptor', ageDesc);

            expect(typeof ageDesc.set !== 'undefined', 'set() function not specified in descriptor')
                .toBeTruthy();

            expect(typeof ageDesc.get !== 'undefined', 'get() function not specified in descriptor')
                .toBeTruthy();
        });
    });
});
