import { ServiceProvider } from "@aedart/support/services";
import { isServiceProviderConstructor } from "@aedart/support/services";

describe('@aedart/support/services', () => {
    describe('isServiceProviderConstructor()', () => {

        it('can determine if target is a service provider constructor', () => {

            class A {}

            class B {
                register() {}
                
                boot() {}
            }

            class C extends B {}

            class D extends ServiceProvider {}

            class E extends D {}

            // ------------------------------------------------------------------------------------ //

            const data = [
                { value: null, expected: false, name: 'Null' },
                { value: [], expected: false, name: 'Array' },
                { value: {}, expected: false, name: 'Object (empty)' },
                { value: A, expected: false, name: 'Class A (empty)' },

                { value: B, expected: true, name: 'Class B (custom implementation of service provider)' },
                { value: C, expected: true, name: 'Class C (inherits from custom implementation)' },
                { value: D, expected: true, name: 'Class D (inherits from ServiceProvider abstraction)' },
                { value: E, expected: true, name: 'Class E (inherits from a base that inherits from ServiceProvider abstraction)' },
            ];

            for (const entry of data) {
                expect(isServiceProviderConstructor(entry.value))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });

    });
});