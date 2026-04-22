import Character, { ChannelLogger, DummyLogger, logMethodCall } from '@aedart/xyz/decorators';
import { describe, expect, test } from 'vitest';

describe('@aedart/xyz', () => {
    describe('Decorators module', () => {
        test('logs method calls', function()
        {
            // This test ensures that the TypeScript

            let character = new Character();
            character.move();

            let entries = DummyLogger.entries;

            // Debug
            // console.log(entries);

            expect(entries.length, 'Incorrect amount of entries recorded in Dummy Logger')
                .toBe(3);

            // --------------------------------------------------------------------------------- //
            // Context in log....

            let context = entries[0][1];

            // Debug
            // console.log(context.kind);
            // console.log(context.name);

            expect(context.kind, 'Context should be a method')
                .toBe('method');

            expect(context.name, 'Context name should be move')
                .toBe('move');

            // --------------------------------------------------------------------------------- //
            // Cleanup

            DummyLogger.clear();
        });

        test('can decorate using exported decorator', function()
        {
            // This test ensures that the rollup, webpack and babel works as intended with
            // decorators in the tests.

            class Foo
            {
                @logMethodCall
                bar()
                {
                    return 'bar';
                }
            }

            const foo = new Foo();
            foo.bar();

            // --------------------------------------------------------------------------------- //

            let entries = DummyLogger.entries;

            // Debug
            // console.log(entries);

            expect(entries.length, 'Incorrect amount of entries recorded in Dummy Logger')
                .toBe(2);

            // --------------------------------------------------------------------------------- //
            // Context in log....

            let context = entries[0][1];

            // Debug
            // console.log(context.kind);
            // console.log(context.name);

            expect(context.kind, 'Context should be a method')
                .toBe('method');

            expect(context.name, 'Context name should be bar')
                .toBe('bar');

            // --------------------------------------------------------------------------------- //
            // Cleanup

            DummyLogger.clear();
        });

        test('decorator is still applied in subclass', () => {
            class Foo
            {
                @logMethodCall
                hi()
                {
                    return 'bar';
                }
            }

            class Bar extends Foo
            {}

            const bar = new Bar();
            bar.hi();

            // --------------------------------------------------------------------------------- //

            let entries = DummyLogger.entries;

            // Debug
            // console.log(entries);

            expect(entries.length, 'Decorator not invoked')
                .toBe(2);

            // --------------------------------------------------------------------------------- //
            // Cleanup

            DummyLogger.clear();
        });

        test('decorator is invoked when method overwritten', () => {
            class Foo
            {
                @logMethodCall
                hi()
                {
                    return 'bar';
                }
            }

            class Bar extends Foo
            {
                hi()
                {
                    super.hi(); // NOTE: This is VERY important - or decorator is NOT invoked!

                    return 'Hi there...';
                }
            }

            const bar = new Bar();
            bar.hi();

            // --------------------------------------------------------------------------------- //

            let entries = DummyLogger.entries;

            // Debug
            // console.log(entries);

            expect(entries.length, 'Decorator not invoked')
                .toBe(2);

            // --------------------------------------------------------------------------------- //
            // Cleanup

            DummyLogger.clear();
        });
    });

    describe('Decorator Context and Target', () => {
        test('can add initialization logic', () => {
            const channel = Symbol('decorator-context');

            function decorator(msg: string)
            {
                return (target: object, context: DecoratorContext): void => {
                    // General log of what is available...
                    ChannelLogger.log(
                        channel,
                        msg,
                        target,
                        context.kind,
                        context.name,
                        // @ts-expect-error ignore private and static
                        context.private,
                        // @ts-expect-error ignore private and static
                        context.static,
                    );

                    // WARNING: class field DOES NOT support addInitializer(), acc. to specification!
                    if (context.kind !== 'field') {
                        // Possible to add multiple initializers
                        // context.addInitializer(function() {
                        //     DummyLogger.log('- - '.repeat(10));
                        // });

                        // The addInitializer() is really a life-line in that we can obtain the
                        // class that a given "target" belongs to, using "this" or its prototype...
                        // @ts-ignore
                        context.addInitializer(function(thisArg: unknown)
                        {
                            ChannelLogger.log(
                                channel,
                                '@init',
                                context.name,
                                context.kind,
                                // @ts-expect-error ignore private and static
                                context.static,
                                // To obtain the "class" of the target...

                                // @ts-expect-error ignore private and static
                                context.static
                                    // @ts-expect-error ignore thisArg for now
                                    ? this
                                    // @ts-expect-error ignore thisArg for now
                                    : Reflect.getPrototypeOf(this)?.constructor,
                            );
                        });
                    } else {
                        // @ts-expect-error
                        return function(initialValue)
                        {
                            ChannelLogger.log(
                                channel,
                                '@init',
                                context.name,
                                context.kind,
                                context.static,
                                // To obtain the "class" of the target...
                                context.static
                                    // @ts-expect-error ignore thisArg for now
                                    ? this
                                    // @ts-expect-error ignore thisArg for now
                                    : Reflect.getPrototypeOf(this).constructor,
                            );

                            return initialValue;
                        };
                    }
                };
            }

            // --------------------------------------------------------------------------------- //

            @decorator('Service Class')
            class Service
            {
                // @ts-expect-error ignore unable to resolve property decorator signature
                @decorator('private id')
                #id: number = 1234;

                // @ts-expect-error ignore unable to resolve property decorator signature
                @decorator('static private status')
                static #status: string = 'on';

                // @ts-expect-error ignore unable to resolve property decorator signature
                @decorator('public url')
                url: string = 'www.example.org/api/v3';

                // @ts-expect-error ignore unable to resolve property decorator signature
                @decorator('static public host')
                static host: string = 'example.org';

                @decorator('accessor query')
                accessor query: Record<PropertyKey, any> = {};

                @decorator('static accessor protocol')
                static accessor protocol: string = 'https';

                _name: string = '';
                @decorator('public set name')
                set name(value: string) {
                    this._name = value;
                }

                @decorator('public get name')
                get name() {
                    return this._name;
                }

                static _log: string;
                @decorator('static public set log')
                static set log(value: string) {
                    Service._log = value;
                }

                @decorator('static public get log')
                static get log() {
                    return Service._log;
                }

                @decorator('public foo')
                foo()
                {}

                @decorator('static public bar')
                static bar()
                {}

                @decorator('private call')
                #call()
                {}

                @decorator('static private ping')
                static #ping()
                {}
            }

            // a) All static decorated members are initialised, without need to initialise class instance.
            // b) When class instance is made, then it will run "addInitializer" for all decorated members.
            const x = new Service();
            // x.foo(); // No need, the "addInitializer" callback is invoked.

            // --------------------------------------------------------------------------------- //

            let entries = ChannelLogger.entries(channel);
            for (const entry of entries) {
                // Debug
                // console.log(entry);
            }

            // If we have entries, then test passes... (test is more intended for manual review of what was logged)
            expect(entries.length)
                .toBeGreaterThan(0);

            // --------------------------------------------------------------------------------- //
            // Cleanup

            ChannelLogger.clear(channel);
        });
    });

    // Experimental: Raw function decorators...
    // describe('Function decorators', () => {
    //
    //     test('can decorate a regular function', function () {
    //
    //         // --------------------------------------------------------------------------------- //
    //         // Declare decorated function...
    //         const decorator = function(method, context) {
    //             return function(This, ...args) {
    //                 DummyLogger.log('Custom Log: ', context);
    //
    //                 return method.call(This, ...args);
    //             }
    //         }
    //
    //         // WARNING: This will NOT work with current "decorator" proposal.
    //         // Can only decorate classes and class methods.
    //         @decorator
    //         const foo = function() {
    //             return 'bar';
    //         }
    //
    //         // --------------------------------------------------------------------------------- //
    //         // Invoke method...
    //
    //         foo();
    //
    //         // --------------------------------------------------------------------------------- //
    //
    //         let entries = DummyLogger.entries;
    //
    //         // Debug
    //         console.log(entries);
    //
    //         expect(entries.length)
    //             .withContext('Incorrect amount of entries recorded in Dummy Logger')
    //             .toBe(1);
    //
    //         // --------------------------------------------------------------------------------- //
    //         // Context in log....
    //
    //         let context = entries[0][1];
    //
    //         // Debug
    //         console.log(context.kind);
    //         console.log(context.name);
    //
    //         expect(context.kind)
    //             .withContext('Context should be a method')
    //             .toBe('method');
    //
    //         expect(context.name)
    //             .withContext('Context name should be bar')
    //             .toBe('bar');
    //
    //         // --------------------------------------------------------------------------------- //
    //         // Cleanup
    //
    //         DummyLogger.clear();
    //     });
    // });
});
