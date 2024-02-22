import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";
import { TYPED_ARRAY_PROTOTYPE } from "@aedart/contracts/support/reflections";
import {
    merge,
    Merger,
    MergeError
} from "@aedart/support/objects";

describe('@aedart/support/objects', () => {
    describe('merge', () => {

        it('returns object merger instance when no arguments given', () => {
            
            const result = merge();
            
            expect(result)
                .toBeInstanceOf(Merger);
        });

        it('can merge primitive values', () => {
            
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
                'null': null,  // Redundant...
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
            //console.log('result', result);
            
            const keys = Reflect.ownKeys(result);
            expect(keys.length)
                .withContext('Incorrect amount of keys merged')
                .toBe(Reflect.ownKeys(b).length);
            
            for (const key of keys) {
                const expected = b[key];
                
                expect(result[key])
                    .withContext(`Incorrect value for key ${key}`)
                    .toBe(expected);
            }
        });

        it('overwrites existing values with undefined be default', () => {
            const a = {
                'foo': 'bar'
            };
            const b = {
                'foo': undefined
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            //console.log('result', result);

            expect(result['foo'])
                .withContext('Value should be undefined')
                .toBeUndefined();
        });

        it('can avoid overwriting existing values with undefined', () => {
            const a = {
                'foo': 'bar'
            };
            const b = {
                'foo': undefined
            };

            // --------------------------------------------------------------------- //
            
            const result = merge()
                .using({ overwriteWithUndefined: false })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(result['foo'])
                .withContext('Value should NOT be undefined')
                .toBe(a['foo'])
        });

        it('can apply custom merge callback', () => {
            const a = {
                'a': 1
            };
            const b = {
                'b': 2
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
            
            expect(Reflect.has(result, 'a'))
                .withContext('a missing')
                .toBeTrue();
            expect(result['a'])
                .withContext('Merge callback not applied for a')
                .toBe(a['a']);

            expect(Reflect.has(result, 'b'))
                .withContext('b missing')
                .toBeTrue()
            expect(result['b'])
                .withContext('Merge callback not applied for b')
                .toBe(b['b'] + 1);
        });

        it('skips dangerous keys', () => {
            const a = {
                'foo': 'bar'
            };
            const b = {
                prototype: { 'bar': true }
            };
            const c = {
                __proto__: { 'zar': false }
            }

            // --------------------------------------------------------------------- //

            const result = merge(a, b, c);

            // Debug
            // console.log('result', result);

            for (const key of DANGEROUS_PROPERTIES) {
                expect(Reflect.has(result, key))
                    .withContext(`Dangerous key (${key}) is not skipped`)
                    .toBeFalse();
            }
        });

        it('can skip custom provided keys', () => {
            const a = {
                'foo': 'bar'
            };
            const b = {
                'bar': 'foo',
                __proto__: { 'admin': true }
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({ skip: [ 'foo' ] })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(Reflect.has(result, 'bar'))
                .withContext('None skipped key missing')
                .toBeTrue();

            expect(Reflect.has(result, 'foo'))
                .withContext('Skipped key is in output')
                .toBeFalse();

            for (const key of DANGEROUS_PROPERTIES) {
                expect(Reflect.has(result, key))
                    .withContext(`Dangerous key (${key}) is not skipped`)
                    .toBeFalse();
            }
        });

        it('can skip keys via callback', () => {
            const a = {
                'foo': 'bar'
            };
            const b = {
                'bar': 'foo',
                'ab': 'ba'
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    skip: (key, source) => {
                        return key === 'ab' && Reflect.has(source, key);
                    }
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(Reflect.has(result, 'foo'))
                .withContext('Incorrect key (foo) skipped')
                .toBeTrue();
            expect(Reflect.has(result, 'bar'))
                .withContext('Incorrect key (bar) skipped')
                .toBeTrue();
            
            expect(Reflect.has(result, 'ab'))
                .withContext('Skipped key is in output')
                .toBeFalse();
        });
        
        it('can merge values of symbol keys', () => {

            const MY_SYMBOL_KEY = Symbol('a');

            const a = {
                [MY_SYMBOL_KEY]: true
            };
            const b = {
                [MY_SYMBOL_KEY]: 'Wee'
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            //console.log('result', result);

            const keys = Reflect.ownKeys(result);
            expect(keys.length)
                .withContext('Incorrect amount of keys merged')
                .toBe(Reflect.ownKeys(b).length);

            for (const key of keys) {
                const expected = b[key];

                expect(result[key])
                    .withContext(`Incorrect value for symbol key`)
                    .toBe(expected);
            }
        });

        it('overwrites array properties by default', () => {
            
            const a = {
                'arr': [ 1, 2, 3 ]
            };
            const b = {
                'arr': [ 4, 5, 6 ]
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            const expected = JSON.stringify(b);
            expect(JSON.stringify(result))
                .withContext('Array value not overwritten by default')
                .toBe(expected);
            
            expect(result['arr'] === b['arr'])
                .withContext('Array property is not copied (structured copy was expected)')
                .toBeFalse();
        });

        it('can merge array values', () => {

            const a = {
                'arr': [ 1, 2, 3 ]
            };
            const b = {
                'arr': [ 4, 5, 6 ]
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            const expected = JSON.stringify({
                'arr': [ ...a['arr'], ...b['arr'] ]
            });
            expect(JSON.stringify(result))
                .withContext('Array value not merged')
                .toBe(expected);
        });

        it('fails when array values contain none-cloneable values', () => {
            
            const callback = () => {
                const a = {
                    'arr': [ 1, 2, 3 ]
                };
                const b = {
                    'arr': [ function() {} ]
                };

                return merge(a, b);
            }
            
            // --------------------------------------------------------------------- //
            
            expect(callback)
                .toThrowError(MergeError);
        });

        it('can merge concat spreadable object values', () => {

            const a = {
                'a': [ 1, 2, 3 ],
                'b': [ 'foo' ],
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
                    2: 'c'
                },
                'b': {
                    [Symbol.isConcatSpreadable]: false,
                    length: 2,
                    0: 'bar',
                    1: 'zar',
                },
                'c': [ 'foo' ]
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(result.a)
                .withContext('a) Array was not merged correctly with concat spreadable set to true')
                .toEqual([ 1, 2, 3, 'a', 'b', 'c' ]);

            expect(JSON.stringify(result.b))
                .withContext('b) Array was not merged correctly with concat spreadable set to false')
                .toBe(JSON.stringify([ 'foo', b['b'] ]));

            expect(result.c)
                .withContext('c) Merged failed on top of object with concat spreadable set to true')
                .toEqual([ 'bar', 'foo' ]);
        });

        it('does not merge array-like objects by default', () => {

            const a = {
                'a': [ 1, 2, 3 ],
                'b': {
                    length: 2,
                    0: 'a',
                    1: 'b',
                },
                'c': {
                    length: 1,
                    0: 'foo',
                },
                'd': [ 3, 4, 5 ],
                'e': [ 6, 7, 8 ],
            };
            const b = {
                'a': {
                    length: 2,
                    0: 'a',
                    1: 'b',
                },
                'b': [ 'foo' ],
                'c': {
                    length: 2,
                    1: 'bar',
                },
                'd': new String('foo'),
                'e': new Int8Array(2)
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            expect(JSON.stringify(result.a))
                .withContext('a) failed to overwrite existing value with array-like object')
                .toBe(JSON.stringify({ 0: 'a', 1: 'b', length: 2 }));

            expect(JSON.stringify(result.b))
                .withContext('b) failed to overwrite existing array-like value with array')
                .toBe(JSON.stringify([ 'foo' ]));

            expect(JSON.stringify(result.c))
                .withContext('c) failed to merge existing array-like value with array-like object')
                .toBe(JSON.stringify({ 0: 'foo', 1: 'bar', length: 2 }));
            
            expect(result.d)
                .withContext('d) String object should not be considered array-like (in this context)')
                .toBeInstanceOf(String);

            expect(result.e)
                .withContext('e) Typed Array object should not be considered array-like (in this context)')
                .toBeInstanceOf(Int8Array);
        });

        it('can merge array-like objects', () => {

            const a = {
                'a': [ 1, 2, 3 ],
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
                'd': [ 3, 4, 5 ],
                'e': [ 6, 7, 8 ],
            };
            const b = {
                'a': {
                    // NOTE: Object is not concat spreadable, so entire object should be expected!
                    length: 2,
                    0: 'a',
                    1: 'b',
                },
                'b': [ 'foo' ],
                'c': {
                    length: 2,
                    1: 'bar',
                },
                'd': new String('foo'),
                'e': new Int8Array(2)
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(JSON.stringify(result.a))
                .withContext('a) should have merged existing array with array-like object')
                .toBe(JSON.stringify([1, 2, 3, {0: 'a', 1: 'b', length: 2}]));

            expect(JSON.stringify(result.b))
                .withContext('b) should have merged array-like object with an array')
                .toBe(JSON.stringify([{0: 'a', 1: 'b', length: 2}, 'foo']));

            expect(JSON.stringify(result.c))
                .withContext('c) failed to merge array-like value with array-like object')
                .toBe(JSON.stringify({0: 'foo', 1: 'bar', length: 2}));

            expect(result.d)
                .withContext('d) String object should not be considered array-like (in this context)')
                .toBeInstanceOf(String);

            expect(result.e)
                .withContext('e) Typed Array object should not be considered array-like (in this context)')
                .toBeInstanceOf(Int8Array);
        });
        
        it('creates shallow copy of functions', () => {
            const a = {
                'foo': null,
            };
            const b = {
                'foo': function() {}
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true
                })
                .of(a, b);
            
            expect(Reflect.has(result, 'foo'))
                .withContext('Key with function value not merged')
                .toBeTrue();
            
            expect(result['foo'])
                .withContext('Function not referenced in result')
                .toBe(b['foo'])
        });

        it('can merge nested objects', () => {
            const a = {
                'foo': null,
                'bar': {
                    'name': 'Risk'
                }
            };
            const b = {
                'foo': {
                    'name': 'John'
                },
                'bar': {
                    'age': 31,
                    'address': {
                        'street': 'Somewhere Str. 654'
                    }
                }
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    mergeArrays: true
                })
                .of(a, b);
            
            // Debug
            // console.log('result', result)
            
            const expected = JSON.stringify({
                'foo': {
                    'name': 'John'
                },
                'bar': {
                    'name': 'Risk',
                    'age': 31,
                    'address': {
                        'street': 'Somewhere Str. 654'
                    }
                }
            });
            
            expect(JSON.stringify(result))
                .withContext('Incorrect merge of nested objects')
                .toBe(expected)
        });

        it('fails when invalid maximum depth option provided', () => {

            const a = {
                'foo': 'bar',
            };
            const b = {
                'foo': true
            };

            // --------------------------------------------------------------------- //
            
            const callback = () => {
                return merge()
                    .using({
                        depth: -1
                    })
                    .of(a, b);
            }
            
            // --------------------------------------------------------------------- //
            
            expect(callback)
                .toThrowError(MergeError);
        });

        it('fails when maximum depth has been exceeded', () => {

            const a = {
                'person': {
                    'name': 'Risk'
                }
            };
            const b = {
                'person': {
                    'age': 31,
                    'address': {
                        'street': 'Somewhere Str. 654' // This depth level should cause failure...
                    }
                }
            };

            // --------------------------------------------------------------------- //
            
            const callback = () => {
                return merge()
                    .using({
                        depth: 1
                    })
                    .of(a, b);
            }

            // --------------------------------------------------------------------- //

            expect(callback)
                .toThrowError(MergeError);
        });

        it('can merge with maximum depth set to zero', () => {

            const a = {
                'foo': false,
            };
            const b = {
                'foo': true,
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    depth: 0
                })
                .of(a, b);

            // --------------------------------------------------------------------- //

            expect(Reflect.has(result, 'foo') && result['foo'] === true)
                .withContext('Failed to merge with maximum depth option set to zero')
                .toBeTrue()
        });

        it('can clones objects of native kind', () => {
            const dataSet = [
                {
                    name: 'ArrayBuffer',
                    source: { value: new ArrayBuffer(8) },
                    expectedInstanceOf: ArrayBuffer,
                    match: (cloned) => {
                        return cloned.byteLength === 8;
                    }
                },
                {
                    name: 'Boolean',
                    source: { value: new Boolean(true) },
                    expectedInstanceOf: Boolean,
                    match: (cloned) => {
                        return cloned.valueOf() === true;
                    }
                },
                {
                    name: 'DataView',
                    source: { value: new DataView(new ArrayBuffer(16)) },
                    expectedInstanceOf: DataView,
                    match: (cloned) => {
                        return cloned.buffer.byteLength === 16;
                    }
                },
                {
                    name: 'Date',
                    source: { value: new Date('2024-02-19 14:13:25') },
                    expectedInstanceOf: Date,
                    match: (cloned) => {
                        return cloned.valueOf() === 1708348405000; // milliseconds for since the epoch for date
                    }
                },
                {
                    name: 'Error',
                    source: { value: new TypeError('foo') },
                    expectedInstanceOf: Error,
                    match: (cloned) => {
                        return cloned.message === 'foo';
                    }
                },
                {
                    name: 'Map',
                    source: { value: new Map([
                        [ 'a', 1 ],    
                        [ 'b', 2 ],    
                        [ 'c', 3 ],    
                    ]) },
                    expectedInstanceOf: Map,
                    match: (cloned) => {
                        return cloned.has('a') && cloned.get('a') === 1
                            && cloned.has('b') && cloned.get('b') === 2
                            && cloned.has('c') && cloned.get('c') === 3
                    }
                },
                {
                    name: 'Number',
                    source: { value: new Number(42) },
                    expectedInstanceOf: Number,
                    match: (cloned) => {
                        return cloned.valueOf() === 42;
                    }
                },
                {
                    name: 'RegEx',
                    source: { value: new RegExp("bar", "g") },
                    expectedInstanceOf: RegExp,
                    match: (cloned) => {
                        return cloned.toString() === '/bar/g'
                    }
                },
                {
                    name: 'Set',
                    source: { value: new Set([ 1, 2, 3 ]) },
                    expectedInstanceOf: Set,
                    match: (cloned) => {
                        return cloned.has(1)
                            && cloned.has(2)
                            && cloned.has(3);
                    }
                },
                {
                    name: 'String',
                    source: { value: new String('John Doe') },
                    expectedInstanceOf: String,
                    match: (cloned) => {
                        return cloned.valueOf() === 'John Doe';
                    }
                },
                {
                    name: 'TypedArray',
                    source: { value: new Int16Array(new ArrayBuffer(16)) },
                    expectedInstanceOf: TYPED_ARRAY_PROTOTYPE,
                    match: (cloned) => {
                        return cloned.byteLength === 16;
                    }
                },
            ];

            // --------------------------------------------------------------------- //
            
            for (const entry of dataSet) {
                const target = {};
                
                const result = merge(target, entry.source);
                
                expect(Reflect.has(result, 'value'))
                    .withContext(`No value property in result for ${entry.name}`)
                    .toBeTrue();
                
                expect(result.value instanceof entry.expectedInstanceOf)
                    .withContext(`Invalid instanceof for ${entry.name}`)
                    .toBeTrue();
                
                expect(result.value === entry.source.value)
                    .withContext(`Shallow copy was made for ${entry.name}`)
                    .toBeFalse();
                
                expect(entry.match(result.value))
                    .withContext(`Custom value match failed for ${entry.name}`)
                    .toBeTrue();
            }
        });

        it('does not clone objects of "Weak Reference" kind', () => {
            
            class A {}
            
            const a = {};
            const b = {
                'a' : new WeakRef(new A()),
                'b' : new WeakMap([
                    [ new A(), 'foo' ]
                ]),
                'c' : new WeakSet([ new A() ])
            }

            // --------------------------------------------------------------------- //
            
            const result = merge(a, b);
            
            // Debug
            // console.log('result', result);
            
            expect(result['a'] === b['a'])
                .withContext('a) WeakRef not same instance')
                .toBeTrue();

            expect(result['b'] === b['b'])
                .withContext('b) WeakMap not same instance')
                .toBeTrue();

            expect(result['c'] === b['c'])
                .withContext('c) WeakSet not same instance')
                .toBeTrue();
        });

        it('favours cloneable object\'s clone() method', () => {
            
            const a = {
                a: {
                    name: 'John',
                    age: 42
                }
            };

            const b = {
                a: {
                    name: 'John', // Property should be ignored, due to clone()
                    
                    clone: () => {
                        return {
                            name: 'Rick'
                        }
                    }
                }
            };

            // --------------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            expect(result.a.name)
                .withContext('Clone method not favoured')
                .toBe('Rick');
            expect(result.a.age)
                .withContext('Other properties are not merged in correctly')
                .toBe(42)
        });

        it('can disable cloneable behaviour', () => {

            const a = {
                a: {
                    name: 'John',
                }
            };

            const b = {
                a: {
                    name: 'Jim',
                    clone: () => {
                        return {
                            name: 'Rick'
                        }
                    }
                }
            };

            // --------------------------------------------------------------------- //

            const result = merge()
                .using({
                    useCloneable: false
                })
                .of(a, b);

            // Debug
            // console.log('result', result);

            expect(result.a.name)
                .withContext('Clone was not disabled')
                .toBe('Jim');
        });
        
        it('fails when cloneable source returns invalid value', () => {

            const a = {
                a: {
                    name: 'John',
                }
            };

            const b = {
                a: {
                    name: 'Jim',
                    clone: () => {
                        return null; // Should cause error
                    }
                }
            };

            // --------------------------------------------------------------------- //

            const callback = () => {
                return merge(a, b);
            }
            
            expect(callback)
                .toThrowError(MergeError);
        });
    });    
});