import { Builder, mix, Mixin } from '@aedart/support/mixins';
import { describe, expect, test } from 'vitest';
describe('@aedart/support/mixins', () => {
    describe('mix()', () => {
        test('returns Mixin Builder instance', () => {
            const builder = mix();

            expect(builder)
                .toBeInstanceOf(Builder);
        });

        test('returns superclass when none() called', () => {
            class A
            {}

            const none = mix(A).none();

            expect(none, 'Incorrect superclass for none()')
                .toBe(A);
        });

        test('returns superclass when no mixin applied using with()', () => {
            class A
            {}

            const withoutMixins = mix(A).with();

            expect(withoutMixins, 'Incorrect superclass for with() without arguments')
                .toBe(A);
        });

        test('can mix with a single mixin', () => {
            const value = 123;

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixin = (superclass) =>
                class extends superclass {
                    foo()
                    {
                        return value;
                    }
                };

            class A extends mix().with(MyMixin)
            {}

            // -------------------------------------------------------------------------- //

            const instance = new A() as { foo(): number; };
            const result = instance.foo();

            expect(result, 'method not mixed into class')
                .toEqual(value);
        });

        test('can mix with multiple mixins', () => {
            const valueA = 123;

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinA = (superclass) =>
                class extends superclass {
                    foo()
                    {
                        return valueA;
                    }
                };

            const valueB = 456;

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinB = (superclass) =>
                class extends superclass {
                    bar()
                    {
                        return valueB;
                    }
                };

            const valueC = 'zoom';

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinC = (superclass) =>
                class extends superclass {
                    zar()
                    {
                        return valueC;
                    }
                };

            class A extends mix().with(
                MyMixinA,
                MyMixinB,
                MyMixinC,
            )
            {}

            // -------------------------------------------------------------------------- //

            const instance = new A() as { foo(): number; bar(): number; zar(): number; };

            expect(instance.foo(), 'mixin (a) not applied')
                .toEqual(valueA);

            expect(instance.bar(), 'mixin (b) not applied')
                .toEqual(valueB);

            expect(instance.zar(), 'mixin (c) not applied')
                .toEqual(valueC);
        });

        test('can mix with class that extends parent with mixins applied', () => {
            const valueA = 984;

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinA = (superclass) =>
                class extends superclass {
                    a()
                    {
                        return valueA;
                    }
                };

            const valueB = 852;

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinB = (superclass) =>
                class extends superclass {
                    b()
                    {
                        return valueB;
                    }
                };

            const valueC = 123;

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinC = (superclass) =>
                class extends superclass {
                    c()
                    {
                        return valueC;
                    }
                };

            const valueD = 462;

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinD = (superclass) =>
                class extends superclass {
                    d()
                    {
                        return valueD;
                    }
                };

            class A extends mix().with(
                MyMixinA,
                MyMixinB,
            )
            {}

            class B extends mix(A).with(
                MyMixinC,
                MyMixinD,
            )
            {}

            // -------------------------------------------------------------------------- //

            const instance = new B() as { a(): number; b(): number; c(): number; d(): number; };

            expect(instance instanceof A, 'should be instance of class A')
                .toBeTruthy();
            expect(instance instanceof B, 'should also be instance of class B')
                .toBeTruthy();

            // NOTE: instance of mixin checks will only work if mixin functions are decorated
            // with the "HasInstance" mixin decorator. Or, via the "Mixin" decorator.

            expect(instance.a(), 'mixin (a) not applied')
                .toEqual(valueA);

            expect(instance.b(), 'mixin (b) not applied')
                .toEqual(valueB);

            expect(instance.c(), 'mixin (c) not applied')
                .toEqual(valueC);

            expect(instance.d(), 'mixin (d) not applied')
                .toEqual(valueD);
        });

        test('mixin constructors are invoked', () => {
            const invoked: string[] = [];
            const MyMixinA = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor()
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super();
                        invoked.push('Mixin A');
                    }

                    getThis()
                    {
                        return this;
                    }
                }
            );

            const MyMixinB = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor()
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super();
                        invoked.push('Mixin B');
                    }
                }
            );

            class A extends mix().with(
                MyMixinA,
                MyMixinB,
            )
            {
                constructor()
                {
                    super();
                    invoked.push('Class A');
                }
            }

            // -------------------------------------------------------------------------- //

            const instance = new A() as { getThis(): object; };

            // Inheritance check
            expect(instance instanceof A, 'should be instance of class A')
                .toBeTruthy();

            expect(instance instanceof MyMixinA, 'should also be instance of mixin (a)')
                .toBeTruthy();
            expect(instance instanceof MyMixinB, 'should also be instance of mixin (b)')
                .toBeTruthy();

            // Instance check of via method in mixin
            expect(instance.getThis() === instance, 'invalid instance from getThis()')
                .toBeTruthy();

            // Debug
            // console.log('invoked constructors', invoked);

            // Constructors check
            expect(invoked.length, 'Incorrect amount of constructors invoked')
                .toEqual(3);
            expect(invoked[0], 'Incorrect constructor invoked')
                .toEqual('Mixin A');
            expect(invoked[1], 'Incorrect constructor invoked')
                .toEqual('Mixin B');
            expect(invoked[2], 'Incorrect constructor invoked')
                .toEqual('Class A');
        });

        test('mixin constructors are invoked, even when class has no constructor defined', () => {
            const invoked: string[] = [];
            const MyMixinA = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor()
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super();
                        invoked.push('Mixin A');
                    }
                }
            );

            const MyMixinB = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor()
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super();
                        invoked.push('Mixin B');
                    }
                }
            );

            class A extends mix().with(
                MyMixinA,
                MyMixinB,
            )
            {
                // NOTE: No constructor here, but mixin constructor(s) should still be invoked correctly
            }

            // -------------------------------------------------------------------------- //

            new A();

            // Debug
            // console.log('invoked constructors', invoked);

            // Constructors check
            expect(invoked.length, 'Incorrect amount of constructors invoked')
                .toEqual(2);
            expect(invoked[0], 'Incorrect constructor invoked')
                .toEqual('Mixin A');
            expect(invoked[1], 'Incorrect constructor invoked')
                .toEqual('Mixin B');
        });

        test('constructors invoked correctly, when extending parent with mixins', () => {
            const invoked: string[] = [];

            const MyMixinA = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor()
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super();
                        invoked.push('Mixin A');
                    }
                }
            );

            const MyMixinB = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor()
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super();
                        invoked.push('Mixin B');
                    }
                }
            );

            const MyMixinC = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor()
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super();
                        invoked.push('Mixin C');
                    }
                }
            );

            const MyMixinD = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor()
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super();
                        invoked.push('Mixin D');
                    }
                }
            );

            class A extends mix().with(
                MyMixinA,
                MyMixinB,
            )
            {
                constructor()
                {
                    super();
                    invoked.push('Class A');
                }
            }

            class B extends mix(A).with(
                MyMixinC,
                MyMixinD,
            )
            {
                constructor()
                {
                    super();
                    invoked.push('Class B');
                }
            }

            // -------------------------------------------------------------------------- //

            const instance = new B();

            // Inheritance check
            expect(instance instanceof A, 'should be instance of class A')
                .toBeTruthy();
            expect(instance instanceof B, 'should also be instance of class B')
                .toBeTruthy();

            expect(instance instanceof MyMixinA, 'should also be instance of mixin (a)')
                .toBeTruthy();
            expect(instance instanceof MyMixinB, 'should also be instance of mixin (b)')
                .toBeTruthy();
            expect(instance instanceof MyMixinC, 'should also be instance of mixin (c)')
                .toBeTruthy();
            expect(instance instanceof MyMixinD, 'should also be instance of mixin (d)')
                .toBeTruthy();

            // Debug
            // console.log('invoked constructors', invoked);

            // Constructors check
            expect(invoked.length, 'Incorrect amount of constructors invoked')
                .toEqual(6);
            expect(invoked[0], 'Incorrect constructor invoked')
                .toEqual('Mixin A');
            expect(invoked[1], 'Incorrect constructor invoked')
                .toEqual('Mixin B');
            expect(invoked[2], 'Incorrect constructor invoked')
                .toEqual('Class A');
            expect(invoked[3], 'Incorrect constructor invoked')
                .toEqual('Mixin C');
            expect(invoked[4], 'Incorrect constructor invoked')
                .toEqual('Mixin D');
            expect(invoked[5], 'Incorrect constructor invoked')
                .toEqual('Class B');
        });

        test('constructor arguments correctly passed on', () => {
            const MyMixinA = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    #msg = '';

                    constructor(...args: string[])
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super(...args);
                        this.message = args[0];
                    }

                    set message(value) {
                        this.#msg = value;
                    }

                    get message() {
                        return this.#msg;
                    }
                }
            );

            const MyMixinB = Mixin((superclass) =>
                // @ts-expect-error Unknown superclass in this case, ignore for testing purpose
                class extends superclass {
                    constructor(...args: string[])
                    {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                        super(...args);
                    }
                }
            );

            class A extends mix().with(
                MyMixinA,
                MyMixinB,
            )
            {
                constructor(...args: string[])
                {
                    super(...args);
                }
            }

            // -------------------------------------------------------------------------- //

            const messageA = 'Hi there...';
            const instance = new A(messageA) as { message: string; };

            expect(instance.message, 'Arguments not passed on correctly')
                .toEqual(messageA);

            // Perhaps a bit redundant to test here, but better safe than sorry...
            const messageB = 'Hi back at you...';

            instance.message = messageB;

            expect(instance.message, 'Unable to change property in mixin')
                .toEqual(messageB);
        });
    });
});
