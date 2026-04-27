import { meta, Metadata } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('@meta() decorator', () => {
    test('can store and retrieve metadata on class', () => {
        @meta('name', 'Alpha')
        class Alpha
        {}

        expect(Metadata.get(Alpha, 'name')).toBe('Alpha');
    });

    test('can store metadata via callback', () => {
        @meta((_target, context) => ({ key: 'kind', value: context.kind }))
        class Beta
        {}

        expect(Metadata.get(Beta, 'kind')).toBe('class');
    });

    test('inherits metadata from parent class', () => {
        @meta('theme', 'dark')
        class Parent
        {}

        class Child extends Parent
        {}

        expect(Metadata.get(Child, 'theme')).toBe('dark');
    });

    test('manual branching: child does not mutate parent', () => {
        @meta('version', '1.0.0')
        class Parent
        {}

        @meta('version', '2.0.0')
        class Child extends Parent
        {}

        expect(Metadata.get(Parent, 'version')).toBe('1.0.0');
        expect(Metadata.get(Child, 'version')).toBe('2.0.0');
    });

    test('bridges gaps in inheritance chain', () => {
        @meta('shared', true)
        class A
        {}
        class B extends A
        {}
        @meta('local', 'yes')
        class C extends B
        {}

        expect(Metadata.get(C, 'shared')).toBe(true);
        expect(Metadata.get(C, 'local')).toBe('yes');
    });

    test('can decorate and inherit instance methods', () => {
        class Parent
        {
            @meta('access', 'admin')
            doSomething()
            {}
        }

        class Child extends Parent
        {
            override doSomething()
            {} // Override method
        }

        // Method metadata is stored on the prototype, namespaced by method name

        new Parent();
        new Child();

        expect(Metadata.get(Parent.prototype, 'methods.doSomething.access')).toBe('admin');
        expect(Metadata.get(Child.prototype, 'methods.doSomething.access')).toBe('admin');
    });

    test('can decorate and inherit instance fields', () => {
        class Parent
        {
            @meta('validation', 'required')
            name: string = '';
        }

        class Child extends Parent
        {}

        new Parent();
        new Child();

        // Note: We access the prototype since instance fields are defined there via decorators
        expect(Metadata.get(Parent.prototype, 'fields.name.validation')).toBe('required');
        expect(Metadata.get(Child.prototype, 'fields.name.validation')).toBe('required');
    });

    test('can decorate and inherit static methods', () => {
        class Parent
        {
            @meta('op', 'sum')
            static compute()
            {}
        }

        class Child extends Parent
        {}

        expect(Metadata.get(Parent, 'methods.compute.op')).toBe('sum');
        expect(Metadata.get(Child, 'methods.compute.op')).toBe('sum');
    });

    test('can decorate and inherit static fields', () => {
        class Parent
        {
            @meta('env', 'prod')
            static connection = 'mysql';
        }

        class Child extends Parent
        {}

        expect(Metadata.get(Parent, 'fields.connection.env')).toBe('prod');
        expect(Metadata.get(Child, 'fields.connection.env')).toBe('prod');
    });

    test('deep path support via @aedart/support/objects', () => {
        @meta('config.options.debug', true)
        class Debugger
        {}

        expect(Metadata.get(Debugger, 'config.options.debug')).toBe(true);
        expect(Metadata.get(Debugger, 'config')).toEqual({ options: { debug: true } });
    });

    test('can use Symbols as metadata keys', () => {
        const MY_KEY = Symbol('my_key');

        @meta(MY_KEY, 'secret-value')
        class SecureClass
        {}

        expect(Metadata.get(SecureClass, MY_KEY)).toBe('secret-value');
    });

    // test('prevents prototype pollution via unsafe keys', () =>
    // {
    //     const trigger = () =>
    //     {
    //         class Polluter
    //         {
    //             @meta('__proto__.polluted', true)
    //             static someField = 123;
    //         }
    //
    //         // For static members, the error should happen during class definition
    //         // if the engine runs static initializers immediately.
    //         // For instance members, we MUST instantiate:
    //         class InstancePolluter {
    //             @meta('constructor.prototype.polluted', true)
    //             someMethod() {}
    //         }
    //         new InstancePolluter();
    //     };
    //
    //     expect(trigger).toThrow();
    // });

    describe('@meta() security: prototype pollution', () => {
        test('immediately prevents pollution via class decorator', () => {
            const trigger = () => {
                @meta('__proto__.polluted', true)
                class Polluter
                {}
            };

            // Class decorators run immediately; should throw during definition.
            expect(trigger).toThrow();
        });

        test('prevents pollution via static member decorator', () => {
            const trigger = () => {
                class StaticPolluter
                {
                    @meta('constructor.prototype.polluted', true)
                    static someField = 123;
                }
            };

            // Static initializers run during class definition; should throw here.
            expect(trigger).toThrow();
        });

        test('prevents pollution via instance member decorator', () => {
            const trigger = () => {
                class InstancePolluter
                {
                    @meta('constructor.prototype.polluted', true)
                    someMethod()
                    {}
                }

                // CRITICAL: Must instantiate to trigger the member's addInitializer
                new InstancePolluter();
            };

            // Now that we instantiate, the initializer runs and set() throws.
            expect(trigger).toThrow();
        });
    });
});
