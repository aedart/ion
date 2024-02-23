import { PROVIDES } from "@aedart/contracts/support/concerns";
import { isConcernConstructor, AbstractConcern } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('isConcernConstructor()', () => {

        it('can determine if is a concern class', () => {

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
                
                { value: B, expected: true, name: 'Class B (custom implementation of concern)' },
                { value: C, expected: true, name: 'Class C (inherits from custom implementation)' },
                { value: D, expected: true, name: 'Class D (inherits from AbstractConcern)' },
                { value: E, expected: true, name: 'Class E (inherits from a base that inherits from AbstractConcern)' },
            ];

            for (const entry of data) {
                expect(isConcernClass(entry.value))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });

    });
});