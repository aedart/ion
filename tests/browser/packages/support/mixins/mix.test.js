import { mix } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {
    describe('@mix()', () => {

        it('fails when no arguments given', () => {
            const callback = function() {
                
                @mix()
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
                    
                    @mix(MyMixin)
                    foo(){}
                }
            }
            
            expect(callback)
                .withContext('@mixin() should fail when used to decorate a class method')
                .toThrowError(TypeError);
        });

        it('can mix with a single mixin', () => {

            const value = 123;

            const MyMixin = (superclass) => class extends superclass {
                foo() {
                    return value
                }
            };
            
            @mix(MyMixin)
            class A {}
            
            // -------------------------------------------------------------------------- //
            
            const instance = new A();
            const result = instance.foo();
            
            expect(result)
                .withContext('method not mixed into class')
                .toEqual(value);
        });

        it('can mix with multiple mixins', () => {

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
            
            @mix(
                MyMixinA,
                MyMixinB,
                MyMixinC,
            )
            class A {}

            // -------------------------------------------------------------------------- //

            const instance = new A();

            expect(instance.foo())
                .withContext('mixin (a) not applied')
                .toEqual(valueA);

            expect(instance.bar())
                .withContext('mixin (b) not applied')
                .toEqual(valueB);

            expect(instance.zar())
                .withContext('mixin (c) not applied')
                .toEqual(valueC);
        });

        it('can mix with class that extends parent with mixins applied', () => {

            const valueA = 984;
            const MyMixinA = (superclass) => class extends superclass {
                a() { return valueA }
            };

            const valueB = 852;
            const MyMixinB = (superclass) => class extends superclass {
                b() { return valueB }
            };

            const valueC = 123;
            const MyMixinC = (superclass) => class extends superclass {
                c() { return valueC }
            };

            const valueD = 462;
            const MyMixinD = (superclass) => class extends superclass {
                d() { return valueD }
            };
            
            @mix(
                MyMixinA,
                MyMixinB,
            )
            class A {}
            
            @mix(
                MyMixinC,
                MyMixinD
            )
            class B extends A {}

            // -------------------------------------------------------------------------- //

            const instance = new B();

            expect(instance instanceof A)
                .withContext('should be instance of class A')
                .toBeTrue();
            expect(instance instanceof B)
                .withContext('should also be instance of class B')
                .toBeTrue();
            
            // NOTE: instance of mixin checks will only work if mixin functions are decorated
            // with the "HasInstance" mixin decorator. Or, via the "Mixin" decorator.
            
            expect(instance.a())
                .withContext('mixin (a) not applied')
                .toEqual(valueA);
            expect(instance.b())
                .withContext('mixin (b) not applied')
                .toEqual(valueB);
            expect(instance.c())
                .withContext('mixin (c) not applied')
                .toEqual(valueC);
            expect(instance.d())
                .withContext('mixin (d) not applied')
                .toEqual(valueD);
        });

        // TODO: ...Hmmm, edge case that might not be that good!
        xit('invokes constructors', () => {
            
            const MyMixinA = (superclass) => class extends superclass {
                constructor() {
                    super();
                    console.log('Mixin A');
                }
            };
            
            const MyMixinB = (superclass) => class extends superclass {
                constructor() {
                    super();
                    console.log('Mixin B');
                }
            };
            
            const MyMixinC = (superclass) => class extends superclass {
                constructor() {
                    super();
                    console.log('Mixin C');
                }
            };
            
            const MyMixinD = (superclass) => class extends superclass {
                constructor() {
                    super();
                    console.log('Mixin C');
                }
            };

            @mix(
                MyMixinA,
                MyMixinB,
            )
            class A {
                constructor() {
                    // TODO: Problem here... we cannot just call super(). This
                    // TODO: class is dynamically extended and its prototype set to inherit
                    // TODO: from a class it originally does not inherit from...
                    console.log('class A');
                }
            }

            @mix(
                MyMixinC,
                MyMixinD
            )
            class B extends A {
                constructor() {
                    super();
                    console.log('class B');
                }
            }

            // -------------------------------------------------------------------------- //

            const instance = new B();
        });
    });
});