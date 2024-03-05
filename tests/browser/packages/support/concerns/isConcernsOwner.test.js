import { CONCERNS } from "@aedart/contracts/support/concerns";
import { isConcernsOwner } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('isConcernsOwner()', () => {

        it('can determine if target instance is a concern owner', () => {

            class A {}

            class B {
                get [CONCERNS]() {}
            }

            class C extends B {}

            // ------------------------------------------------------------------------------------ //

            const data = [
                { value: null, expected: false, name: 'Null' },
                { value: [], expected: false, name: 'Array' },
                { value: {}, expected: false, name: 'Object (empty)' },
                { value: A, expected: false, name: 'Class A (empty)' },

                { value: new B(), expected: true, name: 'Class B instance' },
                { value: new C(), expected: true, name: 'Class C instance (inherits Class B)' },
            ];

            for (const entry of data) {
                expect(isConcernsOwner(entry.value))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });

    });
});