import { get, has, set } from '@aedart/support/objects';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('set and get', () => {
        test('can set property', function()
        {
            const target = {};

            const foo = Symbol('foo-symbol');
            const values = [
                { key: 'a', value: 1234 },
                { key: 'b.name', value: 'Ole' },
                { key: 'b.c', value: { age: 48 } },
                { key: 'd[0]', value: { name: 'Tim' } },
                { key: 'd[1].name', value: 'Erica' },
                { key: foo, value: true },
                { key: ['e', 'nested', foo], value: 'bar' },
                { key: ['e', foo, 3], value: 'zim' },
            ];

            values.forEach(({ key, value }, index) => {
                set(target, key, value);

                expect(has(target, key), `Target does not contain key for values index ${index}`)
                    .toBeTruthy();

                expect(get(target, key), `Incorrect value in target for values index ${index}`)
                    .toBe(value);
            });

            // Debug
            // console.log(target);
            // console.log(target.d);
            // console.log(target.e);
        });

        test('can set and get through existing falsy values', () => {
            const target = { a: { b: 0 } };

            // Test getting an existing falsy value
            expect(get(target, 'a.b')).toBe(0);

            // Test setting a value through a path that contains a falsy value (should overwrite)
            set(target, 'a.b.c', 'overwritten');

            // @ts-expect-error ignore "c" for testing purpose
            expect(target.a.b.c).toBe('overwritten');
        });

        test('overwrites primitive values with objects when setting deep paths', () => {
            const target = { a: 123 };

            // 'a' is a number, but we want to set 'a.b.c'
            set(target, 'a.b.c', 'value');

            expect(target.a).toBeTypeOf('object');
            expect(get(target, 'a.b.c')).toBe('value');
        });

        test('supports numeric keys in arrays without look-ahead if already an array', () => {
            const target = {
                arr: ['initial'],
            };

            // Setting at index 1
            set(target, 'arr.1', 'second');

            expect(target.arr.length).toBe(2);
            expect(target.arr[1]).toBe('second');
        });

        test('returns default value for get() on non-existent or empty paths', () => {
            const target = { a: 1 };

            expect(get(target, 'b', 'default')).toBe('default');
            expect(get(target, '', 'default')).toBe('default');
        });

        test('prevents access/modification of unsafe properties via get/set', () => {
            const target = {};

            set(target, '__proto__.polluted', true);
            expect(get(target, '__proto__.polluted')).toBeUndefined();

            // @ts-expect-error Attempting to access "polluted" property is on purpose - and it should be undefined!
            expect(target.polluted).toBeUndefined();
        });
    });
});
