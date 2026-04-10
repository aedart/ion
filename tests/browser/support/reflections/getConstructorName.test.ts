import { getConstructorName } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('getConstructorName()', () => {
        test('can obtain class constructor name', () => {
            class Box
            {}

            const result = getConstructorName(Box);

            // Debug
            // console.log(result);

            expect(result)
                .toBe('Box');
        });

        test('returns null for anonymous class', () => {
            const result = getConstructorName(class {});

            // Debug
            // console.log(result);

            expect(result)
                .toBeNull();
        });

        test('returns default value', () => {
            const defaultValue = 'MyBox';

            const result = getConstructorName(class {}, defaultValue);

            // Debug
            // console.log(result);

            expect(result)
                .toBe(defaultValue);
        });
    });
});
