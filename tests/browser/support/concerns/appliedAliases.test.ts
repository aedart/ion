import { AbstractConcern, appliedAliases, use } from '@aedart/support/concerns';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/concerns', () => {
    describe('appliedAliases()', () => {
        class LoggerConcern extends AbstractConcern
        {
            public log(msg: string)
            {
                return msg;
            }
        }

        class AuthConcern extends AbstractConcern
        {
            public login()
            {
                return true;
            }
        }

        test('returns empty map if no aliases are applied', () => {
            @use(LoggerConcern)
            class NoAliasService
            {
            }

            const aliases = appliedAliases(NoAliasService);

            expect(aliases.size).toBe(0);
            expect(aliases instanceof Map).toBe(true);
        });

        test('can retrieve all aliases from a single class', () => {
            @use({
                concern: LoggerConcern,
                aliases: { log: 'writeToLog' },
            })
            @use({
                concern: AuthConcern,
                aliases: { login: 'authenticate' },
            })
            class AliasedService
            {
            }

            const aliases = appliedAliases(AliasedService);

            expect(aliases.size).toBe(2);
            expect(aliases.get('writeToLog')?.original).toBe('log');
            expect(aliases.get('authenticate')?.original).toBe('login');
        });

        test('aggregates aliases from the inheritance chain', () => {
            @use({
                concern: LoggerConcern,
                aliases: { log: 'parentLog' },
            })
            class Parent
            {
            }

            @use({
                concern: AuthConcern,
                aliases: { login: 'childLogin' },
            })
            class Child extends Parent
            {
            }

            const aliases = appliedAliases(Child);

            expect(aliases.size).toBe(2);
            expect(aliases.has('parentLog')).toBe(true);
            expect(aliases.has('childLogin')).toBe(true);
        });

        test('preserves alias source information', () => {
            @use({
                concern: LoggerConcern,
                aliases: { log: 'writeLog' },
            })
            class MyService
            {
            }

            const aliases = appliedAliases(MyService);
            const source = aliases.get('writeLog');

            expect(source?.concern).toBe(LoggerConcern);
            expect(source?.original).toBe('log');
        });

        test('handles nested concern aliases through flattening', () => {
            @use({
                concern: LoggerConcern,
                aliases: { log: 'internalLog' },
            })
            class CompositeConcern extends AbstractConcern
            {
            }

            @use({
                concern: CompositeConcern,
                aliases: { internalLog: 'finalLog' },
            })
            class FinalService
            {
            }

            const aliases = appliedAliases(FinalService);

            expect(aliases.has('finalLog')).toBe(true);
            expect(aliases.get('finalLog')?.original).toBe('internalLog');
        });
    });
});
