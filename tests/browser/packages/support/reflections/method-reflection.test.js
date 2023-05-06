import { reflect, getReflection } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {

    describe('method', () => {

        it('can reflect method', () => {

            class A {
                
                @reflect()
                foo() {}
            }

            const a = new A();
            const reflection = getReflection(a.foo);

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.private)
                .withContext('Element private visibility incorrect')
                .toBeFalse();

            expect(reflection.static)
                .withContext('Element static declaration incorrect')
                .toBeFalse();

            expect(reflection.target)
                .withContext('Element target incorrect')
                .toEqual(a.foo);

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(A);
        });

        it('inherits method reflection', () => {
            
            class A {
                
                @reflect()
                foo() {}
            }
            class B extends A {}
            class C extends B {}

            const c = new C();
            const reflection = getReflection(c.foo);

            expect(reflection)
                .withContext('No reflection found for target')
                .not
                .toBeUndefined();

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.target)
                .withContext('Element target incorrect')
                .toEqual(c.foo);

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(C);
        });

        it('can reflect private method', () => {

            class A {

                @reflect()
                #foo() {}
                
                getFooReflection()
                {
                    return getReflection(this.#foo);
                }
            }

            const a = new A();
            const reflection = a.getFooReflection();

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('#foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.private)
                .withContext('Element private visibility incorrect')
                .toBeTrue();

            expect(reflection.static)
                .withContext('Element static declaration incorrect')
                .toBeFalse();

            expect(reflection.target)
                .withContext('Element target incorrect')
                .not
                .toBeUndefined();

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(A);
        });

        it('inherits private method reflection', () => {

            class A {

                @reflect()
                #foo() {}

                getFooReflection()
                {
                    return getReflection(this.#foo);
                }
            }
            class B extends A {}
            class C extends B {}

            const c = new C();
            const reflection = c.getFooReflection()

            expect(reflection)
                .withContext('No reflection found for target')
                .not
                .toBeUndefined();

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('#foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.private)
                .withContext('Element private visibility incorrect')
                .toBeTrue();

            expect(reflection.target)
                .withContext('Element target incorrect')
                .not
                .toBeUndefined();

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(C);
        });

        it('can reflect static method', () => {

            class A {

                @reflect()
                static foo() {}
            }
            
            const reflection = getReflection(A.foo);

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.private)
                .withContext('Element private visibility incorrect')
                .toBeFalse();

            expect(reflection.static)
                .withContext('Element static declaration incorrect')
                .toBeTrue();

            expect(reflection.target)
                .withContext('Element target incorrect')
                .toEqual(A.foo);

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(A);
        });

        it('inherits static method reflection', () => {

            class A {

                @reflect()
                static foo() {}
            }
            class B extends A {}
            class C extends B {}

            const reflection = getReflection(C.foo);

            expect(reflection)
                .withContext('No reflection found for target')
                .not
                .toBeUndefined();

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.static)
                .withContext('Element static declaration incorrect')
                .toBeTrue();

            expect(reflection.target)
                .withContext('Element target incorrect')
                .toEqual(C.foo);

            // NOTE: Here the owner is the class that defines the static method...
            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(A);
        });

        it('can reflect private static method', () => {

            class A {

                @reflect()
                static #foo() {}
                
                static getFooReflection()
                {
                    return getReflection(A.#foo);
                }
            }

            const reflection = A.getFooReflection();

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('#foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.private)
                .withContext('Element private visibility incorrect')
                .toBeTrue();

            expect(reflection.static)
                .withContext('Element static declaration incorrect')
                .toBeTrue();

            expect(reflection.target)
                .withContext('Element target incorrect')
                .not
                .toBeUndefined();

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(A);
        });

        it('inherits private static method reflection', () => {

            class A {

                @reflect()
                static #foo() {}

                static getFooReflection()
                {
                    return getReflection(A.#foo);
                }
            }
            class B extends A {}
            class C extends B {}

            const reflection = C.getFooReflection();

            expect(reflection)
                .withContext('No reflection found for target')
                .not
                .toBeUndefined();

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('#foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.private)
                .withContext('Element private visibility incorrect')
                .toBeTrue();

            expect(reflection.static)
                .withContext('Element static declaration incorrect')
                .toBeTrue();

            expect(reflection.target)
                .withContext('Element target incorrect')
                .not
                .toBeUndefined();

            // NOTE: Here the owner is the class that defines the static method...
            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(A);
        });

        // TODO: Functionality needs some modification for this to work...
        xit('inherits method reflection even when overwritten', () => {

            class A {

                @reflect()
                foo() {}
            }
            class B extends A {
                
                // Note: method overwrite here...
                foo() {
                    // Note: no super.foo() call here...
                }
            }
            class C extends B {}

            const c = new C();
            const reflection = getReflection(c.foo);

            expect(reflection)
                .withContext('No reflection found for target')
                .not
                .toBeUndefined();

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('foo');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('method');

            expect(reflection.target)
                .withContext('Element target incorrect')
                .toEqual(c.foo);

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(C);
        });
    });
});