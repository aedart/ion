import { PROVIDES } from "@aedart/contracts/support/concerns";
import { isShorthandConfiguration, AbstractConcern } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('isShorthandConfiguration()', () => {

        it('can determine if target is a shorthand concern configuration', () => {

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
                { value: [], expected: false, name: 'Array (empty)' },
                { value: {}, expected: false, name: 'Object (empty)' },
                { value: A, expected: false, name: 'Class A (empty)' },
                { value: [ A ], expected: false, name: 'Array with Class A (not a concern)' },

                { value: [ B ], expected: true, name: 'Array with Class B (custom implementation of concern)' },
                { value: [ C ], expected: true, name: 'Array with Class C (inherits from custom implementation)' },
                { value: [ D ], expected: true, name: 'Array with Class D (inherits from AbstractConcern)' },
                { value: [ E ], expected: true, name: 'Array with Class E (inherits from a base that inherits from AbstractConcern)' },
            ];

            for (const entry of data) {
                expect(isShorthandConfiguration(entry.value))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });

    });
});