import { mix, Builder, Mixin } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {
    describe('mix()', () => {

        it('returns Mixin Builder instance', () => {
            const builder = mix();
            
            expect(builder)
                .toBeInstanceOf(Builder);
        });

        it('returns superclass when none() called', () => {
            class A {}
            
            const none = mix(A).none();

            expect(none)
                .withContext('Incorrect superclass for none()')
                .toBe(A);
        });
        
        it('returns superclass when no mixin applied using with()', () => {
            class A {}
            
            const withoutMixins = mix(A).with();
            
            expect(withoutMixins)
                .withContext('Incorrect superclass for with() without arguments')
                .toBe(A);
        });

        it('can mix with a single mixin', () => {

            const value = 123;

            const MyMixin = (superclass) => class extends superclass {
                foo() {
                    return value
                }
            };

            class A extends mix().with(MyMixin){}

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

            class A extends mix().with(
                MyMixinA,
                MyMixinB,
                MyMixinC,
            ){}

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
            
            class A extends mix().with(
                MyMixinA,
                MyMixinB,
            ){}

            class B extends mix(A).with(
                MyMixinC,
                MyMixinD
            ) {}

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

        it('mixin constructors are invoked', () => {

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

            class A extends mix().with(
                MyMixinA,
                MyMixinB
            ){
                constructor() {
                    super();
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

        it('mixin constructors are invoked, even when class has no constructor defined', () => {

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

            class A extends mix().with(
                MyMixinA,
                MyMixinB                
            ){
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

            class A extends mix().with(
                MyMixinA,
                MyMixinB,
            ){
                constructor() {
                    super();
                    invoked.push('Class A');
                }
            }

            class B extends mix(A).with(
                MyMixinC,
                MyMixinD
            ) {
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

        it('constructor arguments correctly passed on', () => {
            const MyMixinA = Mixin((superclass) => class extends superclass {
                #msg = '';

                constructor(...args) {
                    super(...args);
                    this.message = args[0];
                }

                set message(value) {
                    this.#msg = value;
                }

                get message() {
                    return this.#msg;
                }
            });

            const MyMixinB = Mixin((superclass) => class extends superclass {
                constructor(...args) {
                    super(...args);
                }
            });

            class A extends mix().with(
                MyMixinA,
                MyMixinB
            ){
                constructor(...args) {
                    super(...args);
                }
            }

            // -------------------------------------------------------------------------- //

            const messageA = 'Hi there...';
            const instance = new A(messageA);

            expect(instance.message)
                .withContext('Arguments not passed on correctly')
                .toEqual(messageA)

            // Perhaps a bit redundant to test here, but better safe than sorry...
            const messageB = 'Hi back at you...';
            instance.message = messageB;
            expect(instance.message)
                .withContext('Unable to change property in mixin')
                .toEqual(messageB);
        });
    });
});