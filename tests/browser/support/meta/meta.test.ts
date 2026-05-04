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

    test('bridges long inheritance gaps for members', () => {
        // Level 1: Define base metadata on a method and field
        // class Level1 {
        //     @meta('status', 'base-method')
        //     doWork() {}
        //
        //     @meta('prop-type', 'string')
        //     name: string = '';
        // }

        @meta('foo', 'bar')
        class Level1
        {
            @meta('status', 'base-method')
            doWork()
            {}

            @meta('prop-type', 'string')
            name: string = '';
        }

        // new Level1()

        // Level 2-4: Empty classes (The Gaps)
        // These should not have their own repositories initially,
        // so findRepository must skip them to find Level1.
        class Level2 extends Level1
        {}
        class Level3 extends Level2
        {}
        class Level4 extends Level3
        {}

        // Level 5: Define static metadata to test the static namespace path
        class Level5 extends Level4
        {
            @meta('version', 'v5-static')
            static connect()
            {}
        }

        // new Level1()

        // Level 6: The Leaf class
        class Level6 extends Level5
        {}

        // Debugging
        // console.log('--- Debug Registry ---');
        // console.log(
        //     'Level1 Prototype Has Repo:',
        //     Metadata.has(Level1.prototype, 'methods.doWork.status'),
        // );
        // console.log(
        //     'Level6 Prototype Has Repo:',
        //     Metadata.has(Level6.prototype, 'methods.doWork.status'),
        // );

        // --- Assertions ---

        // 1. Instance Method Metadata (Deep Inheritance)
        // Should resolve: Level6 -> Level6.prototype -> Level1.prototype (via #parent)
        expect(Metadata.get(Level6, 'methods.doWork.status'))
            .toBe('base-method');

        // 2. Instance Field Metadata (Deep Inheritance)
        expect(Metadata.get(Level6, 'fields.name.prop-type'))
            .toBe('string');

        // 3. Static Method Metadata (Bridge Gap)
        // Should resolve: Level6 -> Level5 (via #parent)
        expect(Metadata.get(Level6, 'static.methods.connect.version'))
            .toBe('v5-static');

        // 4. Verification of "local" vs "inherited"
        // Ensure that setting metadata on a child doesn't pollute the parent
        @meta('is-leaf', true)
        class Leaf extends Level6
        {}

        expect(Metadata.has(Leaf, 'methods.doWork.status')).toBe(true);
        expect(Metadata.get(Leaf, 'is-leaf')).toBe(true);
        expect(Metadata.has(Level1, 'is-leaf')).toBe(false);
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

        // new Parent();
        // new Child();

        expect(Metadata.get(Parent, 'methods.doSomething.access')).toBe('admin');
        expect(Metadata.get(Child, 'methods.doSomething.access')).toBe('admin');
    });

    test('can decorate and inherit instance fields', () => {
        class Parent
        {
            @meta('validation', 'required')
            name: string = '';
        }

        class Child extends Parent
        {}

        // new Parent();
        // new Child();

        // Note: We access the prototype since instance fields are defined there via decorators
        expect(Metadata.get(Parent, 'fields.name.validation')).toBe('required');
        expect(Metadata.get(Child, 'fields.name.validation')).toBe('required');
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

        expect(Metadata.get(Parent, 'static.methods.compute.op')).toBe('sum');
        expect(Metadata.get(Child, 'static.methods.compute.op')).toBe('sum');
    });

    test('can decorate and inherit static fields', () => {
        class Parent
        {
            @meta('env', 'prod')
            static connection = 'mysql';
        }

        class Child extends Parent
        {}

        expect(Metadata.get(Parent, 'static.fields.connection.env')).toBe('prod');
        expect(Metadata.get(Child, 'static.fields.connection.env')).toBe('prod');
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
