import { mix, Mixin } from "@aedart/support/mixins";

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

        it('mixin constructors are automatically invoked', () => {

            const invoked = [];
            const MyMixinA = Mixin((superclass) => class extends superclass {
                constructor() {
                    super();
                    invoked.push('Mixin A');
                }
                
                getThis() {
                    return this;
                }
            });

            const MyMixinB = Mixin((superclass) => class extends superclass {
                constructor() {
                    super();
                    invoked.push('Mixin B');
                }
            });
            
            @mix(
                MyMixinA,
                MyMixinB
            )
            class A {
                constructor() {
                    // Class A has no immediate superclass. However, the @mix() class decorator
                    // extends it with a parent, which applies mixins. We SHOULD call super()
                    // here, but babel and other transpilers complain about doing such...
                    // THUS - the @mix() must somehow achieve this for us!

                    //super(); // THIS WILL NOT WORK HERE...
                    invoked.push('Class A');
                }
            }

            // -------------------------------------------------------------------------- //
            
            const instance = new A();
            
            // Inheritance check
            expect(instance instanceof A)
                .withContext('should be instance of class A')
                .toBeTrue();

            expect(instance instanceof MyMixinA)
                .withContext('should also be instance of mixin (a)')
                .toBeTrue();
            expect(instance instanceof MyMixinB)
                .withContext('should also be instance of mixin (b)')
                .toBeTrue();

            // Instance check of via method in mixin
            expect(instance.getThis() === instance)
                .withContext('invalid instance from getThis()')
                .toBeTrue();
            
            // Debug
            //console.log('invoked constructors', invoked);

            // Constructors check
            expect(invoked.length)
                .withContext('Incorrect amount of constructors invoked')
                .toEqual(3);
            expect(invoked[0])
                .withContext('Incorrect constructor invoked')
                .toEqual('Mixin A');
            expect(invoked[1])
                .withContext('Incorrect constructor invoked')
                .toEqual('Mixin B');
            expect(invoked[2])
                .withContext('Incorrect constructor invoked')
                .toEqual('Class A');
        });

        it('mixin constructors are automatically invoked, even when class has no constructor defined', () => {

            const invoked = [];
            const MyMixinA = Mixin((superclass) => class extends superclass {
                constructor() {
                    super();
                    invoked.push('Mixin A');
                }

                getThis() {
                    return this;
                }
            });

            const MyMixinB = Mixin((superclass) => class extends superclass {
                constructor() {
                    super();
                    invoked.push('Mixin B');
                }
            });

            @mix(
                MyMixinA,
                MyMixinB
            )
            class A {
                // NOTE: No constructor here, but mixin constructor(s) should still be invoked correctly
            }

            // -------------------------------------------------------------------------- //

            const instance = new A();
            
            // Debug
            //console.log('invoked constructors', invoked);

            // Constructors check
            expect(invoked.length)
                .withContext('Incorrect amount of constructors invoked')
                .toEqual(2);
            expect(invoked[0])
                .withContext('Incorrect constructor invoked')
                .toEqual('Mixin A');
            expect(invoked[1])
                .withContext('Incorrect constructor invoked')
                .toEqual('Mixin B');
        });
        
        it('constructors invoked correctly, when extending parent with mixins', () => {

            const invoked = [];
            
            const MyMixinA = Mixin((superclass) => class extends superclass {
                constructor() {
                    super();
                    invoked.push('Mixin A');
                }
            });
            
            const MyMixinB = Mixin((superclass) => class extends superclass {
                constructor() {
                    super();
                    invoked.push('Mixin B');
                }
            });
            
            const MyMixinC = Mixin((superclass) => class extends superclass {
                constructor() {
                    super();
                    invoked.push('Mixin C');
                }
            });
            
            const MyMixinD = Mixin((superclass) => class extends superclass {
                constructor() {
                    super();
                    invoked.push('Mixin D');
                }
            });

            @mix(
                MyMixinA,
                MyMixinB,
            )
            class A {
                constructor() {
                    invoked.push('Class A');
                }
            }

            @mix(
                MyMixinC,
                MyMixinD
            )
            class B extends A {
                constructor() {
                    super();
                    invoked.push('Class B');
                }
            }

            // -------------------------------------------------------------------------- //

            const instance = new B();

            // Inheritance check
            expect(instance instanceof A)
                .withContext('should be instance of class A')
                .toBeTrue();
            expect(instance instanceof B)
                .withContext('should also be instance of class B')
                .toBeTrue();

            expect(instance instanceof MyMixinA)
                .withContext('should also be instance of mixin (a)')
                .toBeTrue();
            expect(instance instanceof MyMixinB)
                .withContext('should also be instance of mixin (b)')
                .toBeTrue();
            expect(instance instanceof MyMixinC)
                .withContext('should also be instance of mixin (c)')
                .toBeTrue();
            expect(instance instanceof MyMixinD)
                .withContext('should also be instance of mixin (d)')
                .toBeTrue();

            // Debug
            // console.log('invoked constructors', invoked);
            
            // Constructors check
            expect(invoked.length)
                .withContext('Incorrect amount of constructors invoked')
                .toEqual(6);
            expect(invoked[0])
                .withContext('Incorrect constructor invoked')
                .toEqual('Mixin A');
            expect(invoked[1])
                .withContext('Incorrect constructor invoked')
                .toEqual('Mixin B');
            expect(invoked[2])
                .withContext('Incorrect constructor invoked')
                .toEqual('Class A');
            expect(invoked[3])
                .withContext('Incorrect constructor invoked')
                .toEqual('Mixin C');
            expect(invoked[4])
                .withContext('Incorrect constructor invoked')
                .toEqual('Mixin D');
            expect(invoked[5])
                .withContext('Incorrect constructor invoked')
                .toEqual('Class B');
        });
    });
});