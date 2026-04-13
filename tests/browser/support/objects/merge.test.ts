import { CLONE } from '@aedart/contracts/support/objects';
import { ArrayMergeError } from '@aedart/support/arrays';
import { merge, MergeError, Merger } from '@aedart/support/objects';
import { isKeyUnsafe } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('merge', () => {
        test('returns object merger instance when no arguments given', () => {
            const result = merge();

            expect(result)
                .toBeInstanceOf(Merger);
        });

        test('can merge primitive values', () => {
            const MY_SYMBOL_A = Symbol('a');
            const MY_SYMBOL_B = Symbol('b');

            const a = {
                'string': 'hi',
                'int': 1,
                'float': 1.5,
                'bigint': BigInt(9000000000000000),
                'boolean': true,
                'undefined': undefined, // Redundant...
                'symbol': MY_SYMBOL_A,
                'null': null, // Redundant...
            };
            const b = {
                'string': 'there',
                'int': 2,
                'float': 2.3,
                'bigint': BigInt(9000000000000001),
                'boolean': false,
                'undefined': undefined, // Redundant...
                'symbol': MY_SYMBOL_B,
                'null': null, // Redundant...
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            const keys = Reflect.ownKeys(result);
            expect(keys.length, 'Incorrect amount of keys merged')
                .toBe(Reflect.ownKeys(b).length);

            for (const key of keys) {
                // @ts-expect-error ignoring type for testing purposes
                const expected = b[key];

                // @ts-expect-error ignoring type for testing purposes
                expect(result[key], `Incorrect value for key ${key}`)
                    .toBe(expected);
            }
        });

        test('overwrites existing values with undefined be default', () => {
            const a = {
                'foo': 'bar',
            };
            const b = {
                'foo': undefined,
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            expect(result['foo'], 'Value should be undefined')
                .toBeUndefined();
        });

        test('can avoid overwriting existing values with undefined', () => {
            const a = {
                'foo': 'bar',
            };
            const b = {
                'foo': undefined,
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({ overwriteWithUndefined: false })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(result['foo'], 'Value should NOT be undefined')
                .toBe(a['foo']);
        });

        test('can apply custom merge callback', () => {
            const a = {
                'a': 1,
            };
            const b = {
                'b': 2,
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using((target, next, options) => {
                    const { key, value } = target;
                    if (key === 'b') {
                        return value + 1;
                    }

                    return value;
                })
                .of(a, b);

            // --------------------------------------------------------------------- //

            expect(Reflect.has(result, 'a'), 'a missing')
                .toBeTruthy();
            expect(result['a'], 'Merge callback not applied for a')
                .toBe(a['a']);

            expect(Reflect.has(result, 'b'), 'b missing')
                .toBeTruthy();
            expect(result['b'], 'Merge callback not applied for b')
                .toBe(b['b'] + 1);
        });

        test('skips dangerous keys', () => {
            const a = {
                'foo': 'bar',
            };
            const b = {
                prototype: { 'bar': true },
            };
            const c = {
                __proto__: { 'zar': false },
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b, c);

            // Debug
            // console.log('result', result);

            for (const property in result) {
                expect(isKeyUnsafe(property), `Dangerous key (${property}) is not skipped`)
                    .toBeFalsy();
            }
        });

        test('can skip custom provided keys', () => {
            const a = {
                'foo': 'bar',
            };
            const b = {
                'bar': 'foo',
                __proto__: { 'admin': true },
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({ skip: ['foo'] })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(Reflect.has(result, 'bar'), 'None skipped key missing')
                .toBeTruthy();

            expect(Reflect.has(result, 'foo'), 'Skipped key is in output')
                .toBeFalsy();

            for (const property in result) {
                expect(isKeyUnsafe(property), `Dangerous key (${property}) is not skipped`)
                    .toBeFalsy();
            }
        });

        test('can skip keys via callback', () => {
            const a = {
                'foo': 'bar',
            };
            const b = {
                'bar': 'foo',
                'ab': 'ba',
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    skip: (key, source) => {
                        return key === 'ab' && Reflect.has(source, key);
                    },
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(Reflect.has(result, 'foo'), 'Incorrect key (foo) skipped')
                .toBeTruthy();
            expect(Reflect.has(result, 'bar'), 'Incorrect key (bar) skipped')
                .toBeTruthy();

            expect(Reflect.has(result, 'ab'), 'Skipped key is in output')
                .toBeFalsy();
        });

        test('can merge values of symbol keys', () => {
            const MY_SYMBOL_KEY = Symbol('a');

            const a = {
                [MY_SYMBOL_KEY]: true,
            };
            const b = {
                [MY_SYMBOL_KEY]: 'Wee',
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            const keys = Reflect.ownKeys(result);
            expect(keys.length, 'Incorrect amount of keys merged')
                .toBe(Reflect.ownKeys(b).length);

            for (const key of keys) {
                // @ts-expect-error ignoring type for testing purposes
                const expected = b[key];

                expect(result[key], `Incorrect value for symbol key`)
                    .toBe(expected);
            }
        });

        test('overwrites array properties by default', () => {
            const a = {
                'arr': [1, 2, 3],
            };
            const b = {
                'arr': [4, 5, 6],
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            const expected = JSON.stringify(b);
            expect(JSON.stringify(result), 'Array value not overwritten by default')
                .toBe(expected);

            expect(
                result['arr'] === b['arr'],
                'Array property is not copied (structured copy was expected)',
            )
                .toBeFalsy();
        });

        test('can merge array values', () => {
            const a = {
                'arr': [1, 2, 3],
            };
            const b = {
                'arr': [4, 5, 6],
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true,
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            const expected = JSON.stringify({
                'arr': [...a['arr'], ...b['arr']],
            });
            expect(JSON.stringify(result), 'Array value not merged')
                .toBe(expected);
        });

        test('fails when array values contain none-cloneable values', () => {
            const callback = () => {
                const a = {
                    'arr': [1, 2, 3],
                };
                const b = {
                    'arr': [function()
                    {}],
                };

                return merge(a, b);
            };

            // --------------------------------------------------------------------- //

            expect(callback)
                .toThrow(ArrayMergeError);
        });

        // TODO: ...
        test('can merge concat spreadable object values', () => {
            const a = {
                'a': [1, 2, 3],
                'b': ['foo'],
                'c': {
                    [Symbol.isConcatSpreadable]: true,
                    length: 1,
                    0: 'bar',
                },
            };
            const b = {
                'a': {
                    [Symbol.isConcatSpreadable]: true,
                    length: 3,
                    0: 'a',
                    1: 'b',
                    2: 'c',
                },
                'b': {
                    [Symbol.isConcatSpreadable]: false,
                    length: 2,
                    0: 'bar',
                    1: 'zar',
                },
                'c': ['foo'],
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true,
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(result.a, 'a) Array was not merged correctly with concat spreadable set to true')
                .toEqual([1, 2, 3, 'a', 'b', 'c']);

            expect(
                result.b,
                'b) Array was not merged correctly with concat spreadable set to false',
            )
                .toEqual(['foo', 'bar', 'zar']);

            expect(result.c, 'c) Merged failed on top of object with concat spreadable set to true')
                .toEqual(['bar', 'foo']);
        });

        test('does not merge array-like objects by default', () => {
            const a = {
                'a': [1, 2, 3],
                'b': {
                    length: 2,
                    0: 'a',
                    1: 'b',
                },
                'c': {
                    length: 1,
                    0: 'foo',
                },
                'd': [3, 4, 5],
                'e': [6, 7, 8],
            };
            const b = {
                'a': {
                    length: 2,
                    0: 'a',
                    1: 'b',
                },
                'b': ['foo'],
                'c': {
                    length: 2,
                    1: 'bar',
                },
                'd': new String('foo'),
                'e': new Int8Array(2),
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            expect(
                JSON.stringify(result.a),
                'a) failed to overwrite existing value with array-like object',
            )
                .toBe(JSON.stringify({ 0: 'a', 1: 'b', length: 2 }));

            expect(
                JSON.stringify(result.b),
                'b) failed to overwrite existing array-like value with array',
            )
                .toBe(JSON.stringify(['foo']));

            expect(
                JSON.stringify(result.c),
                'c) failed to merge existing array-like value with array-like object',
            )
                .toBe(JSON.stringify({ 0: 'foo', 1: 'bar', length: 2 }));

            expect(
                result.d,
                'd) String object should not be considered array-like (in this context)',
            )
                .toBeInstanceOf(String);

            expect(
                result.e,
                'e) Typed Array object should not be considered array-like (in this context)',
            )
                .toBeInstanceOf(Int8Array);
        });

        test('can merge array-like objects', () => {
            const a = {
                'a': [1, 2, 3],
                'b': {
                    // NOTE: Object is not concat spreadable, so entire object should be expected!
                    length: 2,
                    0: 'a',
                    1: 'b',
                },
                'c': {
                    length: 1,
                    0: 'foo',
                },
                'd': [3, 4, 5],
                'e': [6, 7, 8],
            };
            const b = {
                'a': {
                    // NOTE: Object is not concat spreadable, so entire object should be expected!
                    length: 2,
                    0: 'a',
                    1: 'b',
                },
                'b': ['foo'],
                'c': {
                    length: 2,
                    1: 'bar',
                },
                'd': new String('foo'),
                'e': new Int8Array(2),
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true,
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(result.a, 'a) should have merged existing array with array-like object')
                .toEqual([1, 2, 3, 'a', 'b']);

            expect(result.b, 'b) should have merged array-like object with an array')
                .toEqual(['a', 'b', 'foo']);

            expect(result.c, 'c) failed to merge array-like value with array-like object')
                .toEqual({ 0: 'foo', 1: 'bar', length: 2 });

            expect(
                result.d,
                'd) String object should not be considered array-like (in this context)',
            )
                .toBeInstanceOf(String);

            expect(
                result.e,
                'e) Typed Array object should not be considered array-like (in this context)',
            )
                .toBeInstanceOf(Int8Array);
        });

        test('creates shallow copy of functions', () => {
            const a = {
                'foo': null,
            };
            const b = {
                'foo': function()
                {},
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true,
                })
                .of(a, b);

            expect(Reflect.has(result, 'foo'), 'Key with function value not merged')
                .toBeTruthy();

            expect(result['foo'], 'Function not referenced in result')
                .toBe(b['foo']);
        });

        test('can merge nested objects', () => {
            const a = {
                'foo': null,
                'bar': {
                    'name': 'Risk',
                },
            };
            const b = {
                'foo': {
                    'name': 'John',
                },
                'bar': {
                    'age': 31,
                    'address': {
                        'street': 'Somewhere Str. 654',
                    },
                },
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true,
                })
                .of(a, b);

            // Debug
            // console.log('result', result)

            const expected = JSON.stringify({
                'foo': {
                    'name': 'John',
                },
                'bar': {
                    'name': 'Risk',
                    'age': 31,
                    'address': {
                        'street': 'Somewhere Str. 654',
                    },
                },
            });

            expect(JSON.stringify(result), 'Incorrect merge of nested objects')
                .toBe(expected);
        });

        test('fails when invalid maximum depth option provided', () => {
            const a = {
                'foo': 'bar',
            };
            const b = {
                'foo': true,
            };

            // --------------------------------------------------------------------- //

            const callback = () => {
                return merge()
                    .using({
                        depth: -1,
                    })
                    .of(a, b);
            };

            // --------------------------------------------------------------------- //

            expect(callback)
                .toThrow(MergeError);
        });

        test('fails when maximum depth has been exceeded', () => {
            const a = {
                'person': {
                    'name': 'Risk',
                },
            };
            const b = {
                'person': {
                    'age': 31,
                    'address': {
                        'street': 'Somewhere Str. 654', // This depth level should cause failure...
                    },
                },
            };

            // --------------------------------------------------------------------- //

            const callback = () => {
                return merge()
                    .using({
                        depth: 1,
                    })
                    .of(a, b);
            };

            // --------------------------------------------------------------------- //

            expect(callback)
                .toThrow(MergeError);
        });

        test('fails when attempting to merge with depth set to zero', () => {
            const a = {
                'foo': false,
            };
            const b = {
                'foo': true,
            };

            // --------------------------------------------------------------------- //

            const callback = () => {
                return merge()
                    .using({
                        depth: 0,
                    })
                    .of(a, b);
            };

            // --------------------------------------------------------------------- //

            expect(callback)
                .toThrow(MergeError);
        });

        test('can clones objects of native kind', () => {
            const now = new Date();

            const dataSet = [
                {
                    name: 'ArrayBuffer',
                    source: { value: new ArrayBuffer(8) },
                    expectedInstanceOf: ArrayBuffer,
                    match: (cloned: ArrayBuffer) => {
                        return cloned.maxByteLength === 8;
                    },
                },
                {
                    name: 'Boolean',
                    source: { value: new Boolean(true) },
                    expectedInstanceOf: Boolean,
                    match: (cloned: object) => {
                        return cloned.valueOf() === true;
                    },
                },
                {
                    name: 'DataView',
                    source: { value: new DataView(new ArrayBuffer(16)) },
                    expectedInstanceOf: DataView,
                    match: (cloned: DataView) => {
                        return cloned.buffer.byteLength === 16;
                    },
                },
                {
                    name: 'Date',
                    source: { value: now },
                    expectedInstanceOf: Date,
                    match: (cloned: object) => {
                        return cloned.valueOf() === now.valueOf(); // milliseconds for since the epoch for date
                    },
                },
                {
                    name: 'Error',
                    source: { value: new TypeError('foo') },
                    expectedInstanceOf: Error,
                    match: (cloned: Error) => {
                        return cloned.message === 'foo';
                    },
                },
                {
                    name: 'Map',
                    source: {
                        value: new Map([
                            ['a', 1],
                            ['b', 2],
                            ['c', 3],
                        ]),
                    },
                    expectedInstanceOf: Map,
                    match: (cloned: Map<string, number>) => {
                        return cloned.has('a') && cloned.get('a') === 1
                            && cloned.has('b') && cloned.get('b') === 2
                            && cloned.has('c') && cloned.get('c') === 3;
                    },
                },
                {
                    name: 'Number',
                    source: { value: new Number(42) },
                    expectedInstanceOf: Number,
                    match: (cloned: Number) => {
                        return cloned.valueOf() === 42;
                    },
                },
                {
                    name: 'RegEx',
                    source: { value: new RegExp('bar', 'g') },
                    expectedInstanceOf: RegExp,
                    match: (cloned: RegExp) => {
                        return cloned.toString() === '/bar/g';
                    },
                },
                {
                    name: 'Set',
                    source: { value: new Set([1, 2, 3]) },
                    expectedInstanceOf: Set,
                    match: (cloned: Set<number>) => {
                        return cloned.has(1)
                            && cloned.has(2)
                            && cloned.has(3);
                    },
                },
                {
                    name: 'String',
                    source: { value: new String('John Doe') },
                    expectedInstanceOf: String,
                    match: (cloned: String) => {
                        return cloned.valueOf() === 'John Doe';
                    },
                },
                {
                    name: 'TypedArray',
                    source: { value: new Int16Array(new ArrayBuffer(16)) },
                    expectedInstanceOf: Int16Array,
                    match: (cloned: Int16Array) => {
                        return cloned.byteLength === 16;
                    },
                },
            ];

            // --------------------------------------------------------------------- //

            for (const entry of dataSet) {
                const target = {};

                const result = merge(target, entry.source);

                expect(
                    Reflect.has(result, 'value'),
                    `No value property in result for ${entry.name}`,
                )
                    .toBeTruthy();

                expect(
                    result.value instanceof entry.expectedInstanceOf,
                    `Invalid instanceof for ${entry.name}`,
                )
                    .toBeTruthy();

                expect(
                    result.value === entry.source.value,
                    `Shallow copy was made for ${entry.name}`,
                )
                    .toBeFalsy();

                // @ts-expect-error Ignore type of value for testing purposes
                expect(entry.match(result.value), `Custom value match failed for ${entry.name}`)
                    .toBeTruthy();
            }
        });

        test('does not clone objects of "Weak Reference" kind', () => {
            class A
            {}

            const a = {};
            const b = {
                'a': new WeakRef(new A()),
                'b': new WeakMap([
                    [new A(), 'foo'],
                ]),
                'c': new WeakSet([new A()]),
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            expect(result['a'] === b['a'], 'a) WeakRef not same instance')
                .toBeTruthy();

            expect(result['b'] === b['b'], 'b) WeakMap not same instance')
                .toBeTruthy();

            expect(result['c'] === b['c'], 'c) WeakSet not same instance')
                .toBeTruthy();
        });

        test('clone options is disabled by default', () => {
            const a = {
                a: {
                    name: 'John',
                },
            };

            const b = {
                a: {
                    name: 'Jim',
                    
                    // If `clone` option is set to true, then the `name` property
                    // would be ignored - this [CLONE]() would simply be called
                    // and the `name` property will be set to "Rick"!
                    // BUT - that is NOT what we want as a default behaviour by merge().
                    [CLONE]: () => {
                        return {
                            name: 'Rick',
                        };
                    },
                },
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            expect(result.a.name, 'Clone was not disabled')
                .toBe('Jim');
        });
        
        test("can clone objects via [CLONE]() method", () => {
            const a = {
                a: {
                    name: 'John',
                    age: 42,
                },
            };

            const b = {
                a: {
                    name: 'John', // Property should be ignored, due to clone()

                    [CLONE]: () => {
                        return {
                            name: 'Rick',
                        };
                    },
                },
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({ clone: true })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(result.a.name, 'Clone method not applied')
                .toBe('Rick');
            expect(result.a.age, 'Other properties are not merged in correctly')
                .toBe(42);
        });

        test('fails when cloneable source returns invalid value', () => {
            const a = {
                a: {
                    name: 'John',
                },
            };

            const b = {
                a: {
                    name: 'Jim',
                    [CLONE]: () => {
                        return undefined; // Should cause error
                    },
                },
            };

            // --------------------------------------------------------------------- //

            const callback = () => {
                return merge()
                    .using({ clone: true })
                    .of(a, b);
            };

            expect(callback)
                .toThrow(MergeError);
        });
    });
});
