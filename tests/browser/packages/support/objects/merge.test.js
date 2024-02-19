import { DEFAULT_MERGE_SKIP_KEYS } from "@aedart/contracts/support/objects";
import { TYPED_ARRAY_PROTOTYPE } from "@aedart/contracts/support/reflections";
import {
    merge,
    MergeError
} from "@aedart/support/objects";

describe('@aedart/support/objects', () => {
    describe('merge', () => {
        
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
            
            const result = merge([ a, b ]);
            
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

            const result = merge([ a, b ]);

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

            const result = merge([ a, b ],  { overwriteWithUndefined: false });

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

            const result = merge([ a, b ],  (result, key, value) => {
                if (key === 'b') {
                    return value + 1;
                }
                
                return value;
            });

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

        it('skips default keys', () => {
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

            const result = merge([ a, b, c ]);

            // Debug
            // console.log('result', result);

            for (const key of DEFAULT_MERGE_SKIP_KEYS) {
                expect(Reflect.has(result, key))
                    .withContext(`Default skip key (${key}) is not skipped`)
                    .toBeFalse();
            }
        });

        it('can skip custom provided keys', () => {
            const a = {
                'foo': 'bar'
            };
            const b = {
                'bar': 'foo'
            };

            // --------------------------------------------------------------------- //

            const result = merge([ a, b ], { skip: [ 'foo' ] });

            // Debug
            // console.log('result', result);

            expect(Reflect.has(result, 'bar'))
                .withContext('None skipped key missing')
                .toBeTrue();

            expect(Reflect.has(result, 'foo'))
                .withContext('Skipped key is in output')
                .toBeFalse();
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

            const result = merge([ a, b ], {
                skip: (key, source) => {
                    return key === 'ab' && Reflect.has(source, key);
                }
            });

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

            const result = merge([ a, b ]);

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

            const result = merge([ a, b ]);

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

            const result = merge([ a, b ],  { mergeArrays: true });

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

                return merge([ a, b ] );
            }
            
            // --------------------------------------------------------------------- //
            
            expect(callback)
                .toThrowError(MergeError);
        });
        
        it('creates shallow copy of functions', () => {
            const a = {
                'foo': null,
            };
            const b = {
                'foo': function() {}
            };

            // --------------------------------------------------------------------- //

            const result = merge([ a, b ],  { mergeArrays: true });
            
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

            const result = merge([ a, b ],  { mergeArrays: true });
            
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
                return merge([ a, b ],  { depth: -1 });
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
                return merge([ a, b ],  { depth: 1 });
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

            const result = merge([ a, b ],  { depth: 0 });

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
                
                const result = merge([ target, entry.source ]);
                
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
    });    
});