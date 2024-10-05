import { BaseLoader, isConfigurationLoaderConstructor } from "@aedart/config";

/**
 * @deprecated TODO: Remove this...
 */
xdescribe('@aedart/config', () => {
    describe('loaders', () => {

        describe('isConfigurationLoaderConstructor', () => {

            it('can determine if target is a configuration loader constructor', () => {

                class A {}

                class B {
                    load() {}
                }

                class C extends B {}

                class D extends BaseLoader {}

                class E extends D {}

                // ------------------------------------------------------------------------------------ //

                const data = [
                    { value: null, expected: false, name: 'Null' },
                    { value: [], expected: false, name: 'Array' },
                    { value: {}, expected: false, name: 'Object (empty)' },
                    { value: A, expected: false, name: 'Class A (empty)' },

                    { value: B, expected: true, name: 'Class B (custom implementation of loader)' },
                    { value: C, expected: true, name: 'Class C (inherits from custom implementation)' },
                    { value: D, expected: true, name: 'Class D (inherits from BaseLoader abstraction)' },
                    { value: E, expected: true, name: 'Class E (inherits from a base that inherits from BaseLoader abstraction)' },
                ];

                for (const entry of data) {
                    expect(isConfigurationLoaderConstructor(entry.value))
                        .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                        .toBe(entry.expected);
                }
            });

        });

    });
});