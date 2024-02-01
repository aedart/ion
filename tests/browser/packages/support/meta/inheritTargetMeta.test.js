import {
    targetMeta,
    getTargetMeta,
    inheritTargetMeta
} from "@aedart/support/meta";

describe('@aedart/support/meta', () => {

    describe('inheritTargetMeta()', () => {

        it('fails inheriting target static method meta, when static method overwritten', () => {

            const key = 'zim';
            const value = 'zar';

            class A {
                @targetMeta(key, value)
                static foo() {}
            }
            class B extends A {}
            class C extends B {

                // NOTE: meta cannot be inherited because @meta() / decorators do
                // not offer a late binding of "this", meaning that the "owner"
                // corresponds to class A, instead of class C...
                static foo() {}
            }

            // ---------------------------------------------------------------------- //

            const result = getTargetMeta(C.foo, key);

            expect(result)
                .toBeUndefined();
        });

        it('fails when @inheritTargetMeta() used on base class directly', () => {

            const callback = function() {

                @inheritTargetMeta()
                class A {
                    static foo() {}
                }
                class B extends A {}

                return new B();
            }

            // ---------------------------------------------------------------------- //

            expect(callback)
                .withContext('@inheritTargetMeta() should not be allowed on base class')
                .toThrowError(TypeError);
        });
        
        it('fails when @inheritTargetMeta() used on base method', () => {

            const callback = function() {

                class A {
                    @inheritTargetMeta()
                    static foo() {}
                }
                class B extends A {}

                return new B();
            }

            // ---------------------------------------------------------------------- //

            expect(callback)
                .withContext('@inheritTargetMeta() should not be allowed on base method')
                .toThrowError(TypeError);
        });
        
        it('inherits target static method meta, via @inheritTargetMeta()', () => {

            const key = 'zim';
            const value = 'zar';

            class A {
                @targetMeta(key, value)
                static foo() {}
            }
            class B extends A {}
            class C extends B {

                @inheritTargetMeta()
                static foo() {}
            }

            // ---------------------------------------------------------------------- //

            const result = getTargetMeta(C.foo, key);

            // Debug
            //console.log('C.foo "target" metadata', C[METADATA][TARGET_METADATA].method.s.foo);

            expect(result)
                .withContext('Incorrect static method target meta')
                .toEqual(value);
        });

        it('fails nothing to inherit', () => {

            const callback = function() {

                class A {
                    static foo() {}
                }
                class B extends A {}
                class C extends B {
                    
                    // Parent foo() has no "target" metadata defined!
                    @inheritTargetMeta()
                    static foo() {}
                }

                return new C();
            }

            // ---------------------------------------------------------------------- //

            expect(callback)
                .withContext('@inheritTargetMeta() should fail when nothing to inherit')
                .toThrowError(TypeError);
        });
    });
});