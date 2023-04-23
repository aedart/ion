import {
    meta,
    getMeta
} from '@aedart/support/meta';

describe('@aedart/support/meta', () => {

    describe('accessor', () => {

        it('can set and get meta on auto-accessor', () => {

            const key = 'fip'
            const value = 'fup';

            class A {
                @meta(key, value) accessor value = 42;
            }

            // instance required... 
            new A();
            
            // ----------------------------------------------------------------- //
            
            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can set and get meta on private auto-accessor', () => {

            const key = 'bar'
            const value = 'sweet';

            class A {
                @meta(key, value) accessor #value = 'foo';
            }

            // instance required... 
            new A();

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can set and get meta on static auto-accessor', () => {

            const key = 'bar'
            const value = 9874;

            class A {
                @meta(key, value) static accessor value = 'bar';
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('can set and get meta on static private auto-accessor', () => {

            const key = 'bar'
            const value = 'zip';

            class A {
                @meta(key, value) static accessor #value = 'zip';
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('runs additional initialize callback for auto-accessor', () => {

            const key = 'foo';
            const value = 'bar';
            let invoked = false;

            class A {

                @meta((target, context) => {
                    context.addInitializer(() => {
                        invoked = true;
                    });

                    return {
                        key: key,
                        value: value
                    }
                }) accessor value = 'sweet';
            }

            // instance required... 
            new A();

            // ----------------------------------------------------------------- //

            // console.log('was invoked', invoked)

            expect(invoked)
                .withContext('Init callback not invoked')
                .toBeTrue();
        });
    });
});