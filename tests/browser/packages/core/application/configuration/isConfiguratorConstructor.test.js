import { BaseConfigurator, isConfiguratorConstructor } from "@aedart/core";

describe('@aedart/core', () => {
    describe('configuration', () => {

        describe('isConfiguratorConstructor', () => {

            it('can determine if target is an application configurator constructor', () => {

                class A {}

                class B {
                    for() {}
                    with() {}
                    withConfiguration(){}
                    withBindings() {}
                    withSingletons() {}
                    withInstances() {}
                    withAliases() {}
                    withBootstrappers() {}
                    withServiceProviders() {}
                    apply() {}
                }

                class C extends B {}

                class D extends BaseConfigurator {}

                class E extends D {}

                // ------------------------------------------------------------------------------------ //

                const data = [
                    { value: null, expected: false, name: 'Null' },
                    { value: [], expected: false, name: 'Array' },
                    { value: {}, expected: false, name: 'Object (empty)' },
                    { value: A, expected: false, name: 'Class A (empty)' },

                    { value: B, expected: true, name: 'Class B (custom implementation of configurator)' },
                    { value: C, expected: true, name: 'Class C (inherits from custom implementation)' },
                    { value: D, expected: true, name: 'Class D (inherits from BaseConfigurator abstraction)' },
                    { value: E, expected: true, name: 'Class E (inherits from a base that inherits from BaseConfigurator abstraction)' },
                ];

                for (const entry of data) {
                    expect(isConfiguratorConstructor(entry.value))
                        .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                        .toBe(entry.expected);
                }
            });

        });

    });
});