import {
    meta,
    getMeta
} from '@aedart/support/meta';

describe('@aedart/support/meta', () => {

    describe('getter', () => {

        it('can set and get meta on getter', () => {

            const key = 'fip'
            const value = 'fup';

            class A {

                @meta(key, value)
                get foo() {
                    return 'bar'
                }
            }

            // instance required... 
            new A();
            
            // ----------------------------------------------------------------- //
            
            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can set and get meta on private getter', () => {

            const key = 'bar'
            const value = 'sweet';

            class A {

                @meta(key, value)
                get #foo() {
                    return 'bar'
                }
            }

            // instance required... 
            new A();

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can set and get meta on static getter', () => {

            const key = 'bar'
            const value = 9874;

            class A {

                @meta(key, value)
                static get foo() {
                    return 'bar';
                }
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('can set and get meta on static private getter', () => {

            const key = 'bar'
            const value = 'zip';

            class A {

                @meta(key, value)
                static get #foo() {
                    return 'bar';
                }
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('runs additional initialize callback for getter', () => {

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
                get foo(){
                    return 'bar'
                }
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