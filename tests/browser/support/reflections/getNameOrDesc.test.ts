import { getNameOrDesc } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('getNameOrDesc()', () => {

        test('can obtain class constructor name', () => {
            class ApiService {}

            const result = getNameOrDesc(ApiService);

            // Debug
            // console.log(result);

            expect(result)
                .toBe('ApiService');
        });

        test('returns description tag for anonymous class', () => {
            const result = getNameOrDesc(class {});

            // Debug
            // console.log(result);

            expect(result)
                .toBe('[object Function]');
        });
    });
});
