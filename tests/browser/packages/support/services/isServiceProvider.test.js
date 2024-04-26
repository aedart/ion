import { isServiceProvider, ServiceProvider } from "@aedart/support/services";

describe('@aedart/support/services', () => {
    describe('isServiceProvider()', () => {

        it('can determine if target is a service provider instance', () => {

            class A {}

            class B {
                register() {}

                boot() {}

                before() {}
                after() {}
                callBeforeCallbacks() {}
                callAfterCallbacks() {}
            }

            class C extends B {}

            class D extends ServiceProvider {}

            class E extends D {}

            // ------------------------------------------------------------------------------------ //

            const data = [
                { value: null, expected: false, name: 'Null' },
                { value: [], expected: false, name: 'Array' },
                { value: {}, expected: false, name: 'Object (empty)' },
                { value: new A(), expected: false, name: 'Class A (empty)' },

                { value: new B(), expected: true, name: 'Class B (custom implementation of service provider)' },
                { value: new C(), expected: true, name: 'Class C (inherits from custom implementation)' },
                { value: new D(null), expected: true, name: 'Class D (inherits from ServiceProvider abstraction)' },
                { value: new E(null), expected: true, name: 'Class E (inherits from a base that inherits from ServiceProvider abstraction)' },
            ];

            for (const entry of data) {
                expect(isServiceProvider(entry.value))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });

    });
});