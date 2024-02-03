import { mixin } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {
    describe('@mixin()', () => {

        it('fails when no arguments given', () => {
            const callback = function() {
                
                @mixin()
                class A {}
            }

            expect(callback)
                .withContext('@mixin() should fail when no arguments given')
                .toThrowError(TypeError);
        });

        it('fails when used on anything other than a class', () => {
            const callback = function() {
                const MyMixin = (superclass) => class extends superclass {};

                class A {
                    
                    @mixin(MyMixin)
                    foo(){}
                }
            }
            
            expect(callback)
                .withContext('@mixin() should fail when used to decorate a class method')
                .toThrowError(TypeError);
        });

        it('can mixin single decorator', () => {

            const value = 123;

            const MyMixin = (superclass) => class extends superclass {
                foo() {
                    return value
                }
            };
            
            @mixin(MyMixin)
            class A {}
            
            // -------------------------------------------------------------------------- //
            
            const instance = new A();
            const result = instance.foo();
            
            expect(result)
                .withContext('method not mixed into class')
                .toEqual(value);
        });

        it('can mixin multiple decorator', () => {

            const valueA = 123;
            const MyMixinA = (superclass) => class extends superclass {
                foo() { return valueA }
            };

            const valueB = 456;
            const MyMixinB = (superclass) => class extends superclass {
                bar() { return valueB }
            };

            const valueC = 'zoom';
            const MyMixinC = (superclass) => class extends superclass {
                zar() { return valueC }
            };
            
            @mixin(
                MyMixinA,
                MyMixinB,
                MyMixinC,
            )
            class A {}

            // -------------------------------------------------------------------------- //

            const instance = new A();

            expect(instance.foo())
                .withContext('MyMixinA not mixed in superclass')
                .toEqual(valueA);

            expect(instance.bar())
                .withContext('MyMixinB not mixed in superclass')
                .toEqual(valueB);

            expect(instance.zar())
                .withContext('MyMixinC not mixed in superclass')
                .toEqual(valueC);
        });

        // TODO: Fails... for now..
        xit('can determine if instance of mixin', () => {

            const value = 123;

            const MyMixin = (superclass) => class extends superclass {};

            @mixin(MyMixin)
            class A {}

            // -------------------------------------------------------------------------- //

            const instance = new A();

            expect(instance instanceof MyMixin)
                .withContext('class SHOULD be instance of mixin')
                .toBeTrue();
        });
    });
});