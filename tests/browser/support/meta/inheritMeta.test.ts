import { inheritMeta } from '@aedart/support/meta';
import { describe, expect, test } from 'vitest';

describe('@inheritMeta() decorator', () => {
    test('fails when used on class', () => {
        const trigger = () => {
            // Not intended to be used on a class...
            @inheritMeta()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class A
            {}
        };

        expect(trigger).toThrow();
    });

    test('fails when used on non-static members', () => {
        const trigger = () => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            class A
            {
                // Not intended to be used on non-static member
                @inheritMeta()
                foo()
                {/* empty */}
            }
        };

        expect(trigger).toThrow();
    });

    // NOTE: See additional tests for @inheritMeta() in `meta-static-members.test.ts`!
});
