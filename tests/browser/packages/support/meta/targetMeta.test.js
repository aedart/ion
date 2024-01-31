import { targetMeta, getTargetMeta } from "@aedart/support/meta";

describe('@aedart/support/meta', () => {
    
    describe('targetMeta()', () => {
        
        it('can decorate class with target meta', () => {
            
            const key = 'foo';
            const value = 'bar';
            
            @targetMeta(key, value)
            class A {}

            // ---------------------------------------------------------------------- //
            
            const result = getTargetMeta(A, key);
            expect(result)
                .withContext('Incorrect target meta')
                .toEqual(value);
        });

        it('inherits class target meta', () => {

            const key = 'foo';
            const value = 'bar';

            @targetMeta(key, value)
            class A {}
            class B extends A {}
            class C extends B {}

            // ---------------------------------------------------------------------- //
            
            const result = getTargetMeta(C, key);
            expect(result)
                .withContext('Failed to inherit target meta')
                .toEqual(value);
        });

        it('can overwrite class target meta', () => {

            const key = 'foo';
            const valueA = 'bar';
            const valueB = 'baz';

            @targetMeta(key, valueA)
            class A {}
            class B extends A {}
            
            @targetMeta(key, valueB)
            class C extends B {}

            // ---------------------------------------------------------------------- //
            
            const original = getTargetMeta(B, key);
            expect(original)
                .withContext('Failed to obtain original target meta')
                .toEqual(valueA);
            
            const overwritten = getTargetMeta(C, key);
            expect(overwritten)
                .withContext('Failed to obtain overwritten target meta')
                .toEqual(valueB);
        });
        
        it('can decorate method with target meta', () => {

            const key = 'baz';
            const value = 123;
            
            class A {
                @targetMeta(key, value)
                foo() {}
            }

            // ---------------------------------------------------------------------- //
            
            const instance = new A();
            const result = getTargetMeta(instance.foo, key);
            
            expect(result)
                .withContext('Incorrect method target meta')
                .toEqual(value);
        });

        it('can inherit target method meta', () => {

            const key = 'baz';
            const value = 321;

            class A {
                @targetMeta(key, value)
                foo() {}
            }
            class B extends A {}
            class C extends B {}

            // ---------------------------------------------------------------------- //
            
            const instance = new C();
            const result = getTargetMeta(instance.foo, key);

            expect(result)
                .withContext('Incorrect method target meta')
                .toEqual(value);
        });

        it('can inherit target method meta, when method overwritten', () => {

            const key = 'bar';
            const value = 321;

            class A {
                @targetMeta(key, value)
                foo() {}
            }
            class B extends A {}
            class C extends B {
                
                // NOTE: meta SHOULD still apply, unless explicitly overwritten
                foo() {}
            }

            // ---------------------------------------------------------------------- //
            
            const instance = new C();
            const result = getTargetMeta(instance.foo, key);

            expect(result)
                .withContext('Incorrect method target meta')
                .toEqual(value);
        });

        it('can overwrite target method meta, when method overwritten', () => {

            const key = 'bar';
            const valueA = 321;
            const valueB = 'baz';

            class A {
                @targetMeta(key, valueA)
                foo() {}
            }
            class B extends A {}
            class C extends B {

                @targetMeta(key, valueB)
                foo() {}
            }

            // ---------------------------------------------------------------------- //
            
            const instanceB = new B();
            const original = getTargetMeta(instanceB.foo, key);

            expect(original)
                .withContext('Incorrect original method target meta')
                .toEqual(valueA);
            
            const instanceC = new C();
            const overwritten = getTargetMeta(instanceC.foo, key);

            expect(overwritten)
                .withContext('Incorrect overwritten method target meta')
                .toEqual(valueB);
        });

        it('can decorate static method', () => {

            const key = 'baz';
            const value = 123;

            class A {
                @targetMeta(key, value)
                static foo() {}
            }

            // ---------------------------------------------------------------------- //
            
            const result = getTargetMeta(A.foo, key);

            expect(result)
                .withContext('Incorrect static method target meta')
                .toEqual(value);
        });

        it('can inherit target static method meta', () => {

            const key = 'bar';
            const value = 'nice';

            class A {
                @targetMeta(key, value)
                static foo() {}
            }
            class B extends A {}
            class C extends B {}

            // ---------------------------------------------------------------------- //
            
            const result = getTargetMeta(C.foo, key);

            expect(result)
                .withContext('Incorrect static method target meta')
                .toEqual(value);
        });

        // TODO: Inheritance of metadata on overwritten static methods will NOT work. This is because @meta() (and decorators in general)
        // TODO: do not resolve "this" as a late binding for static blocks or members. Thus, @meta() yields class A, instead of C as "this".
        xit('can inherit target static method meta, when static method overwritten', () => {

            const key = 'zim';
            const value = 'zar';

            class A {
                @targetMeta(key, value)
                static foo() {}
            }
            class B extends A {}
            class C extends B {

                // NOTE: meta SHOULD still apply, unless explicitly overwritten...
                // But sadly this fails because of no late "this" binding of static
                // blocks or members.
                static foo() {}
            }

            // ---------------------------------------------------------------------- //
            
            const result = getTargetMeta(C.foo, key);

            expect(result)
                .withContext('Incorrect static method target meta')
                .toEqual(value);
        });

        it('can overwrite target static method meta, when static method overwritten', () => {

            const key = 'bar';
            const valueA= true;
            const valueB = false;

            class A {
                @targetMeta(key, valueA)
                static foo() {}
            }
            class B extends A {}
            class C extends B {

                @targetMeta(key, valueB)
                static foo() {}
            }

            // ---------------------------------------------------------------------- //
            
            const original = getTargetMeta(B.foo, key);

            expect(original)
                .withContext('Incorrect original method target meta')
                .toEqual(valueA);

            const overwritten = getTargetMeta(C.foo, key);

            expect(overwritten)
                .withContext('Incorrect overwritten method target meta')
                .toEqual(valueB);
        });
    });

    describe('misc', () => {

        it('fails when attempting to decorate unsupported element', () => {
            const callback = function() {

                class A {
                    @targetMeta('foo', 'bar')
                    foo = 'bar';
                }

                return new A();
            }

            // ---------------------------------------------------------------------- //
            
            expect(callback)
                .withContext('Should not support @targetMeta on unsupported element')
                .toThrowError(TypeError);
        });

    });
    
});