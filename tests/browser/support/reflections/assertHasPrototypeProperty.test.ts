import { assertHasPrototypeProperty } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('assertHasPrototypeProperty', () => {
        test('does not throw when object has prototype property', () => {
            const callback = () => {
                const obj = {
                    __proto__: function()
                    {/* empty */},
                };

                assertHasPrototypeProperty(obj);
            };

            expect(callback)
                .not
                .toThrow(TypeError);
        });

        test('throws when object has no prototype property', () => {
            const callback = () => {
                const obj = { __proto__: null };

                assertHasPrototypeProperty(obj);
            };

            expect(callback)
                .toThrow(TypeError);
        });
    });
});
