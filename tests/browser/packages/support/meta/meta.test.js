import {
    meta,
    getMeta,
    getAllMeta
} from '@aedart/support/meta';

describe('@aedart/support/meta', () => {
    
    describe('class', () => {

        it('can set and get meta on class', () => {
            
            const key = 'alpha'
            const value = 1234;
            
            @meta(key, value)
            class A {}
            
            // ----------------------------------------------------------------- //
            
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
    });
});