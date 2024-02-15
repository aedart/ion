import { assertHasPrototypeProperty } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('assertHasPrototypeProperty()', () => {

        it('does not throw when object has prototype property', () => {

            const callback = () => {
                const obj = { __proto__: function() {} };
                
                assertHasPrototypeProperty(obj);
            }
            
            expect(callback)
                .not
                .toThrowError(TypeError)
        });

        it('throws when object has no prototype property', () => {

            const callback = () => {
                const obj = { __proto__: null };

                assertHasPrototypeProperty(obj);
            }

            expect(callback)
                .toThrowError(TypeError)
        });
    });
});