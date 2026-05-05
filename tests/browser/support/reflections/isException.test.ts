import { LogicalError } from '@aedart/support/exceptions';
import { isException } from '@aedart/support/reflections';
import { assert, describe, expect, test } from 'vitest';

describe('@aedart/support/exceptions', () => {
    describe('isException', () => {
        test('returns true when exception name matches', () => {
            const error = new LogicalError('Something went wrong');

            // We cast/check against the name 'LogicalError'
            const result = isException<LogicalError>(error, 'LogicalError');

            expect(result).toBe(true);
        });

        test('returns false when exception name does not match', () => {
            const error = new TypeError('My Type Error...');

            // Checking an TypeError against the name 'LogicalError'
            const result = isException<LogicalError>(error, 'LogicalError');

            expect(result).toBe(false);
        });

        test('returns false for non-error objects or null', () => {
            expect(isException(null, 'LogicalError')).toBe(false);
            expect(isException({}, 'LogicalError')).toBe(false);
            expect(isException({ name: 'LogicalError' }, 'LogicalError')).toBe(true); // Matches structural brand
        });

        test('type narrowing works in conditional block', () => {
            const error: unknown = new LogicalError('Narrow me');

            if (isException<LogicalError>(error, 'LogicalError')) {
                // Vitest/TypeScript: If this compiles and runs,
                // 'error' is successfully narrowed to LogicalError here.
                expect(error.name).toBe('LogicalError');
            } else {
                assert.fail('Should have narrowed to LogicalError');
            }
        });
    });
});
