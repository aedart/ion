import {
    meta,
    getMeta
} from '@aedart/support/meta';

describe('@aedart/support/meta', () => {

    describe('method', () => {

        it('can set and get meta on method', () => {

            const key = 'bar'
            const value = 1234;

            class A {

                @meta(key, value)
                foo() {}
            }

            // instance required... 
            new A();
            
            // ----------------------------------------------------------------- //
            
            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can set and get meta on private method', () => {

            const key = 'bar'
            const value = 'sweet';

            class A {

                @meta(key, value)
                #foo() {}
            }

            // instance required... 
            new A();

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });
        
        it('can set and get meta on static method', () => {

            const key = 'bar'
            const value = 9874;

            class A {

                @meta(key, value)
                static foo() {}
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('can set and get meta on static private method', () => {

            const key = 'bar'
            const value = 'zip';

            class A {

                @meta(key, value)
                static #foo() {}
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('runs additional initialize callback for method', () => {

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
                })
                foo(){}
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