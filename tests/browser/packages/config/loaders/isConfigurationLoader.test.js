import { BaseLoader, isConfigurationLoader } from "@aedart/config";

/**
 * @deprecated TODO: Remove this...
 */
describe('@aedart/config', () => {
    describe('loaders', () => {

        describe('isConfigurationLoader', () => {

            it('can determine if target is a configuration loader instance', () => {

                class A {}

                class B {
                    load(){}
                }

                class C extends B {}

                class D extends BaseLoader {}

                class E extends D {}

                // ------------------------------------------------------------------------------------ //

                const data = [
                    { value: null, expected: false, name: 'Null' },
                    { value: [], expected: false, name: 'Array' },
                    { value: {}, expected: false, name: 'Object (empty)' },
                    { value: new A(), expected: false, name: 'Class A (empty)' },

                    { value: new B(), expected: true, name: 'Class B (custom implementation of loader)' },
                    { value: new C(), expected: true, name: 'Class C (inherits from custom implementation)' },
                    { value: new D(), expected: true, name: 'Class D (inherits from BaseLoader abstraction)' },
                    { value: new E(), expected: true, name: 'Class E (inherits from a base that inherits from BaseLoader abstraction)' },
                ];

                for (const entry of data) {
                    expect(isConfigurationLoader(entry.value))
                        .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                        .toBe(entry.expected);
                }
            });

        });

    });
});