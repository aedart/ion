import {
    meta,
    getMeta
} from '@aedart/support/meta';

describe('@aedart/support/meta', () => {

    describe('setter', () => {

        it('can set and get meta on setter', () => {

            const key = 'fip'
            const value = 'fup';

            class A {

                #value;
                
                @meta(key, value)
                set foo(value) {
                    this.#value = value;
                }
            }

            // instance required... 
            new A();
            
            // ----------------------------------------------------------------- //
            
            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value)
        });

        it('can set and get meta on private setter', () => {

            const key = 'bar'
            const value = 'sweet';

            class A {

                #value;
                
                @meta(key, value)
                set #foo(value) {
                    this.#value = value;
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

                static #value
                
                @meta(key, value)
                static set foo(value) {
                    A.#value = value;
                }
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('can set and get meta on static private setter', () => {

            const key = 'bar'
            const value = 'zip';

            class A {

                static #value;
                
                @meta(key, value)
                static set #foo(value) {
                    A.#value = value;
                }
            }

            // ----------------------------------------------------------------- //

            expect(getMeta(A, key))
                .withContext('Incorrect meta value obtained')
                .toBe(value);
        });

        it('runs additional initialize callback for setter', () => {

            const key = 'foo';
            const value = 'bar';
            let invoked = false;

            class A {

                #value;
                
                @meta((target, context) => {
                    context.addInitializer(() => {
                        invoked = true;
                    });

                    return {
                        key: key,
                        value: value
                    }
                })
                set foo(value){
                    this.#value = value;
                }
            }

            // instance required... 
            new A();

            // ----------------------------------------------------------------- //

            // console.log('was invoked', invoked)

            expect(invoked)
                .withContext('Init callback not invoked for method')
                .toBeTrue();
        });
    });
});