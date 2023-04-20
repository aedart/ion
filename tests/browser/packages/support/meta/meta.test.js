import {
    meta,
    getMeta,
    getAllMeta
} from '@aedart/support/meta';
import { METADATA } from "@aedart/contracts/support/meta";

describe('@aedart/support/meta', () => {
    
    describe('class', () => {

        it('can set and get meta on class', () => {
            
            const key = 'alpha'
            const value = 1234;
            
            @meta(key, value)
            class A {}
            
            // ----------------------------------------------------------------- //
            
            expect(Reflect.has(A, METADATA))
                .withContext('A[Symbol.metadata] not defined')
                .toBeTrue();
            
            const found = getMeta(A, key);
            expect(found)
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can use "path" key', () => {

            const key = 'a.b.c'
            const value = 'something';

            @meta(key, value)
            class A {}

            // ----------------------------------------------------------------- //

            const found = getMeta(A, 'a.b');
            expect(found)
                .withContext('Incorrect meta value obtained')
                .toEqual({ c: value });
        });

        it('can use symbols', () => {
            
            const key = Symbol('foo');
            const value = Symbol('bar');

            @meta(key, value)
            class A {}

            // ----------------------------------------------------------------- //

            const found = getMeta(A, key);
            expect(found)
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });
        
        it('can add multiple meta on class', () => {

            const keyA = 'a'
            const valueA = true;

            const keyB = 'b.c'
            const valueB = false;
            
            @meta(keyA, valueA)
            @meta(keyB, valueB)
            class A {}

            // ----------------------------------------------------------------- //

            const all = getAllMeta(A);
            // console.log(all);

            expect(all)
                .withContext('all meta does not appear to contain a and b')
                .toEqual({ a: true, b: { c: false } });
            
            expect(getMeta(A, keyA))
                .withContext('A is incorrect')
                .toBe(valueA)

            expect(getMeta(A, keyB))
                .withContext('B is incorrect')
                .toBe(valueB)
        });

        it('can set key-value using callback', () => {

            const key = Symbol('foo');
            const value = 'bar';

            @meta(() => {
                return {
                    key: key,
                    value: {
                        name: value   
                    }
                }
            })
            class A {}

            // ----------------------------------------------------------------- //

            // console.log(getAllMeta(A));
            
            const found = getMeta(A, key);
            expect(found)
                .withContext('Incorrect meta value obtained')
                .toEqual({ name: value })
        });

        it('inherits metadata', () => {

            const key = 'alpha'
            const value = 1234;

            @meta(key, value)
            class A {}

            class B extends A {}
            
            // ----------------------------------------------------------------- //

            expect(Reflect.has(A, METADATA))
                .withContext('A[Symbol.metadata] not defined')
                .toBeTrue();

            expect(Reflect.has(B, METADATA))
                .withContext('B[Symbol.metadata] not defined')
                .toBeTrue();
            
            expect(getMeta(A, key))
                .withContext('A no longer has meta')
                .toBe(value);

            expect(getMeta(B, key))
                .withContext('B has not inherited meta')
                .toBe(value)
        });

        it('can add meta in subclass', () => {

            const keyA = 'a'
            const valueA = true;

            const keyB = 'b.c'
            const valueB = false;

            const keyC = 'foo'
            const valueC = 'bar';
            
            @meta(keyA, valueA)
            @meta(keyB, valueB)
            class A {}

            @meta(keyC, valueC)
            class B extends A {}
            
            // ----------------------------------------------------------------- //

            const all = getAllMeta(B);
            // console.log(all);

            expect(all)
                .withContext('all meta does not appear to contain a and b')
                .toEqual({ a: true, b: { c: false }, foo: 'bar' });

            expect(getMeta(A, keyA))
                .withContext('Key a is incorrect')
                .toBeTrue();

            expect(getMeta(A, keyB))
                .withContext('Key b is incorrect')
                .toBeFalse();

            expect(getMeta(B, keyC))
                .withContext('Key c (in subclass) is incorrect')
                .toBe(valueC);

            expect(getMeta(A, keyC))
                .withContext('Key c SHOULD NOT exist in class A meta!')
                .toBeUndefined();
        });

        it('can overwrite inherited meta in subclass', () => {
            const key = 'alpha'
            const valueA = 1234;
            const valueB = 8520;

            @meta(key, valueA)
            class A {}

            @meta(key, valueB)
            class B extends A {}

            // ----------------------------------------------------------------- //

            expect(getMeta(B, key))
                .withContext('Overwritten meta has incorrect value')
                .toBe(valueB)
            
            expect(getMeta(A, key))
                .withContext('Original value was also overwritten in base class!')
                .toBe(valueA);
        });
    });
});