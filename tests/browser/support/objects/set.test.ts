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
                { key: '0', value: 'zero' },
                { key: 'b.name', value: 'Ole' },
                { key: 'b.c', value: { age: 48 } },
                { key: 'd[0]', value: { name: 'Tim' } },
                { key: 'd[1].name', value: 'Erica' },
                { key: foo, value: true },
                { key: ['e', 'nested', foo], value: 'bar' },
                { key: ['e', foo, 3], value: 'zim' },
                { key: 'f.g.h', value: 'deep' },
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

        test('preserves sibling keys when setting a nested value', () => {
            const obj = { a: { x: 1, y: 2 } };
            set(obj, 'a.z', 3);
            expect(obj.a).toEqual({ x: 1, y: 2, z: 3 });
        });

        test('replaces a non-object intermediate with an object', () => {
            const obj: Record<string, unknown> = { a: 'string' };
            set(obj, 'a.b', 7);
            expect((obj.a as Record<string, unknown>).b).toBe(7);
        });

        test('replaces a null intermediate with an object', () => {
            const obj: Record<string, unknown> = { a: null };
            set(obj, 'a.b', 'hello');
            expect((obj.a as Record<string, unknown>).b).toBe('hello');
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

        test('creates nested arrays for sequential numeric segments', () => {
            const obj: Record<string, unknown> = {};
            set(obj, 'matrix[0][1]', 99);
            const matrix = obj.matrix as unknown[][];
            expect(Array.isArray(matrix)).toBe(true);
            expect(Array.isArray(matrix[0])).toBe(true);
            expect(matrix[0][1]).toBe(99);
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

        test('does not set a value when the only segment is __proto__', () => {
            const obj: Record<string, unknown> = {};
            set(obj, '__proto__', { polluted: true });
            // The global Object prototype must remain unpolluted
            expect(({} as Record<string, unknown>).polluted).toBeUndefined();
        });

        test('stops traversal when __proto__ appears mid-path', () => {
            const obj: Record<string, unknown> = { a: {} };
            set(obj, ['a', '__proto__', 'evil'], 'no');
            expect((obj.a as Record<string, unknown>).evil).toBeUndefined();
        });

        test('does not set a value when the only segment is constructor', () => {
            const obj: Record<string, unknown> = {};
            set(obj, 'constructor', 'bad');
            // constructor should remain the native Function constructor
            expect(typeof obj.constructor).toBe('function');
        });

        test('does not set a value when the only segment is prototype', () => {
            function Ctor()
            {/* empty */}
            set(Ctor, 'prototype', 'bad');
            // prototype must remain an object
            expect(typeof (Ctor as unknown as Record<string, unknown>).prototype).toBe('object');
        });

        test('shadows an inherited object rather than mutating the prototype', () => {
            const proto = { nested: { fromProto: true } };
            const child = Object.create(proto) as Record<string, unknown>;

            set(child, 'nested.added', 'own');

            // The child gets its own copy of "nested"
            expect(Object.prototype.hasOwnProperty.call(child, 'nested')).toBe(true);
            // The newly set key is present on the child's own nested object
            expect((child.nested as Record<string, unknown>).added).toBe('own');
            // The prototype's nested object is untouched
            expect((proto.nested as Record<string, unknown>).added).toBeUndefined();
        });

        test('shadows an inherited array rather than mutating the prototype', () => {
            const proto = { list: [1, 2, 3] };
            const child = Object.create(proto) as Record<string, unknown>;

            set(child, 'list[0]', 99);

            // The child gets its own copy of "list"
            expect(Object.prototype.hasOwnProperty.call(child, 'list')).toBe(true);
            // The prototype's array remains unchanged
            expect(proto.list[0]).toBe(1);
            // The child's copy has the new value
            expect((child.list as number[])[0]).toBe(99);
        });

        test('does nothing when target is null', () => {
            // null passes the typeof check but fails the !== null check
            const original = {};
            set(null as unknown as object, 'a', 1);
            expect(original).toEqual({}); // nothing blew up
        });

        test('does nothing when target is a primitive (number)', () => {
            expect(() => set(42 as unknown as object, 'a', 1)).not.toThrow();
        });

        test('does nothing when target is a primitive (string)', () => {
            expect(() => set('str' as unknown as object, 'a', 1)).not.toThrow();
        });

        test('does nothing when path resolves to zero segments (empty string)', () => {
            const obj: Record<string, unknown> = {};
            set(obj, '', 42);
            expect(obj).toEqual({});
        });

        test('does nothing when path is an empty array', () => {
            const obj: Record<string, unknown> = {};
            set(obj, [], 42);
            expect(obj).toEqual({});
        });

        test('handles a plain array of string segments', () => {
            const obj: Record<string, unknown> = {};
            set(obj, ['a', 'b', 'c'], 'array-path');
            expect(
                ((obj.a as Record<string, unknown>).b as Record<string, unknown>).c,
            ).toBe('array-path');
        });

        test('handles a mixed array of string and number segments', () => {
            const obj: Record<string, unknown> = {};
            set(obj, ['items', 2], 'third');
            expect((obj.items as unknown[])[2]).toBe('third');
        });

        test('handles an array with a single symbol segment', () => {
            const sym = Symbol('key');
            const obj: Record<PropertyKey, unknown> = {};
            set(obj, [sym], 'sym-array');
            expect(obj[sym]).toBe('sym-array');
        });
    });
});
