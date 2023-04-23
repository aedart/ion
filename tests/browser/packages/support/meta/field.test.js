import {
    meta,
    getMeta
} from '@aedart/support/meta';

describe('@aedart/support/meta', () => {

    describe('field', () => {

        it('can set and get meta on field', () => {

            const key = 'fip'
            const value = 'fup';

            class A {
                @meta(key, value) value = 'foo';
            }

            // instance required... 
            new A();
            
            // ----------------------------------------------------------------- //
            
            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can set and get meta on private field', () => {

            const key = 'bar'
            const value = 'sweet';

            class A {
                @meta(key, value) #value = 'bar'
            }

            // instance required... 
            new A();

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can set and get meta on static field', () => {

            const key = 'bar'
            const value = 9874;

            class A {
                @meta(key, value) static value;
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('can set and get meta on static private field', () => {

            const key = 'bar'
            const value = 'zip';

            class A {
                @meta(key, value) static #value = 42;
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });
    });
});