import { describe, expect, test } from 'vitest';
import {
    use,
    AbstractConcern,
    usesConcerns
} from '@aedart/support/concerns';

describe('@aedart/support/concerns', () => {
    describe('usesConcerns', () => {

        /**
         * Mock Concern: Timestamp
         */
        class TimestampConcern extends AbstractConcern
        {
            public getCreated(): number
            {
                return 12345;
            }
        }

        /**
         * Mock Concern: Logger
         */
        class LoggerConcern extends AbstractConcern
        {
            public log(msg: string): string
            {
                return `Log: ${msg}`;
            }
        }
        
        test('can verify if multiple concerns are applied', () =>
        {
            @use(TimestampConcern, LoggerConcern)
            class FullyLoadedService {}

            @use(TimestampConcern)
            class PartialService {}

            expect(usesConcerns(FullyLoadedService, TimestampConcern, LoggerConcern)).toBe(true);
            expect(usesConcerns(PartialService, TimestampConcern, LoggerConcern)).toBe(false);
        });

    });
});
