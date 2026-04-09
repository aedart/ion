import { Populatable } from '@aedart/contracts/support/objects';
import { isPopulatable } from '@aedart/support/objects';

import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('isPopulatable', () => {
        test('can determine if is populatable', () => {
            class A implements Populatable
            {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                populate(data?: Record<PropertyKey, object>): this
                {
                    return this;
                }
            }

            const dataSet = [
                { value: [], expected: false, name: 'Array' },
                { value: null, expected: false, name: 'Null' },
                { value: {}, expected: false, name: 'Object' },
                {
                    value: { populate: false },
                    expected: false,
                    name: 'Object with populate property',
                },

                {
                    value: { populate: () => true },
                    expected: true,
                    name: 'Object with populate function',
                },
                {
                    value: new A(),
                    expected: true,
                    name: 'Object that implements Populatable interface',
                },
            ];

            for (const data of dataSet) {
                expect(
                    // @ts-expect-error Ignoring argument type for testing purposes
                    isPopulatable(data.value),
                    `${data.name} was expected to ${data.expected.toString()}`,
                )
                    .toBe(data.expected);
            }
        });
    });
});
