import { meta } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('@meta() security: prototype pollution', () => {
    test('immediately prevents pollution via class decorator', () => {
        const trigger = () => {
            @meta('__proto__.polluted', true)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class Polluter
            {}
        };

        // Class decorators run immediately; should throw during definition.
        expect(trigger).toThrow();
    });

    test('prevents pollution via static member decorator', () => {
        const trigger = () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class StaticPolluter
            {
                @meta('constructor.prototype.polluted', true)
                static someField = 123;
            }
        };

        // Static initializers run during class definition; should throw here.
        expect(trigger).toThrow();
    });

    test('prevents pollution via instance member decorator', () => {
        const trigger = () => {
            class InstancePolluter
            {
                @meta('constructor.prototype.polluted', true)
                someMethod()
                {/* empty */}
            }

            // CRITICAL: Must instantiate to trigger the member's addInitializer
            new InstancePolluter();
        };

        // Now that we instantiate, the initializer runs and set() throws.
        expect(trigger).toThrow();
    });
});
