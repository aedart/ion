import {describe, expect, test} from 'vitest';
import {use, AbstractConcern, getAliasSource} from '@aedart/support/concerns';

describe('@aedart/support/concerns', () =>
{
    describe('getAliasSource()', () =>
    {
        test('can identify the source of an aliased method', () =>
        {
            class LoggerConcern extends AbstractConcern
            {
                public log(msg: string)
                {
                    return msg;
                }
            }

            @use({
                concern: LoggerConcern,
                aliases: {log: 'writeToLog'}
            })
            class MyService
            {
            }

            const source = getAliasSource(MyService, 'writeToLog');

            expect(source).toBeDefined();
            expect(source?.concern).toBe(LoggerConcern);
            expect(source?.original).toBe('log');

            // Non-aliased keys should return undefined
            expect(getAliasSource(MyService, 'log')).toBeUndefined();
        });

        test('resolves the ultimate source across multiple levels of aliasing', () =>
        {
            class BaseBehavior extends AbstractConcern { public ping() { return 'pong'; } }

            @use({ concern: BaseBehavior, aliases: { ping: 'ping_aliased' } })
            class CompositeConcern extends AbstractConcern {}

            @use({ concern: CompositeConcern, aliases: { ping_aliased: 'ping_final' } })
            class FinalService {}

            const source = getAliasSource(FinalService, 'ping_final');

            expect(source?.concern).toBe(BaseBehavior);
            expect(source?.original).toBe('ping');
        });
    });

});