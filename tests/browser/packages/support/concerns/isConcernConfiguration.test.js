import { PROVIDES } from "@aedart/contracts/support/concerns";
import { isConcernConfiguration, AbstractConcern } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('isConcernConfiguration()', () => {

        it('can determine if target is a concern configuration', () => {

            class A {}

            class B {
                get concernOwner() {
                    return false;
                }

                static [PROVIDES]() {}
            }

            class C extends B {}

            class D extends AbstractConcern {}

            class E extends D {}

            // ------------------------------------------------------------------------------------ //

            const data = [
                { value: null, expected: false, name: 'Null' },
                { value: [], expected: false, name: 'Array' },
                { value: {}, expected: false, name: 'Object (empty)' },
                { value: A, expected: false, name: 'Class A (empty)' },
                { value: { concern: A }, expected: false, name: 'Configuration with Class A (not a concern)' },
                
                { value: { concern: B }, expected: true, name: 'Configuration with Class B (custom implementation of concern)' },
                { value: { concern: C }, expected: true, name: 'Configuration with Class C (inherits from custom implementation)' },
                { value: { concern: D }, expected: true, name: 'Configuration with Class D (inherits from AbstractConcern)' },
                { value: { concern: E }, expected: true, name: 'Configuration with Class E (inherits from a base that inherits from AbstractConcern)' },
            ];

            for (const entry of data) {
                expect(isConcernConfiguration(entry.value))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });

    });
});