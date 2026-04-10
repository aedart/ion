import { getErrorMessage } from '@aedart/support/exceptions';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/exceptions', () => {
    describe('getErrorMessage()', () => {
        test('returns error message', () => {
            const err = new Error('Lorum lipsum');

            const result = getErrorMessage(err);
            expect(result)
                .toBe(err.message);
        });

        test('returns default message, when unable to resolve message from error', () => {
            const defaultMessage = 'My other failure reason';

            const err = {};

            const result = getErrorMessage(err, defaultMessage);
            expect(result)
                .toBe(defaultMessage);
        });

        test('defaults when expression is given', () => {
            let result;
            const defaultMessage =
                'Everyone just loves the saltyness of popcorn kebab brushd with sugar.';

            try {
                throw 'Some expression';
            } catch (e) {
                result = getErrorMessage(e, defaultMessage);
            }

            expect(result)
                .toBe(defaultMessage);
        });
    });
});
