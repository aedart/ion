import { AbstractConcern, appliedConcerns, use } from '@aedart/support/concerns';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/concerns', () => {
    describe('appliedConcerns()', () => {
        class TimestampConcern extends AbstractConcern
        {
        }

        class LoggerConcern extends AbstractConcern
        {
        }

        class AuthConcern extends AbstractConcern
        {
        }

        test('returns empty array if no concerns are applied', () => {
            class PlainClass
            {
            }

            expect(appliedConcerns(PlainClass)).toEqual([]);
            expect(appliedConcerns(new PlainClass())).toEqual([]);
        });

        test('can retrieve all concerns applied to a class', () => {
            @use(TimestampConcern, LoggerConcern)
            class MyService
            {
            }

            const concerns = appliedConcerns(MyService);

            expect(concerns).toHaveLength(2);
            expect(concerns).toContain(TimestampConcern);
            expect(concerns).toContain(LoggerConcern);
        });

        test('retrieves concerns from the entire inheritance chain', () => {
            @use(TimestampConcern)
            class Parent
            {
            }

            @use(LoggerConcern)
            class Child extends Parent
            {
            }

            const concerns = appliedConcerns(Child);

            // Should contain both child's and parent's concerns
            expect(concerns).toHaveLength(2);
            expect(concerns).toContain(TimestampConcern);
            expect(concerns).toContain(LoggerConcern);
        });

        test('retrieves flattened nested concerns', () => {
            @use(AuthConcern)
            class SecurityConcern extends AbstractConcern
            {
            }

            @use(SecurityConcern)
            class ProtectedService
            {
            }

            const concerns = appliedConcerns(ProtectedService);

            // @use() flattens the registry, thus AuthConcern must also be present
            expect(concerns).toHaveLength(2);
            expect(concerns).toContain(SecurityConcern);
            expect(concerns).toContain(AuthConcern);
        });

        test('handles instances as target', () => {
            @use(TimestampConcern)
            class MyService
            {
            }

            const instance = new MyService();
            const concerns = appliedConcerns(instance);

            expect(concerns).toContain(TimestampConcern);
        });

        test('returns unique concerns even if registry exists in multiple levels', () => {
            @use(TimestampConcern)
            class Base
            {
            }

            class Derived extends Base
            {
            }

            const concerns = appliedConcerns(Derived);
            expect(concerns).toHaveLength(1);
            expect(concerns[0]).toBe(TimestampConcern);
        });
    });
});
