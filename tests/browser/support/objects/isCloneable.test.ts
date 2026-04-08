import { CLONE, Cloneable } from '@aedart/contracts/support/objects';
import { isCloneable } from '@aedart/support/objects';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('isCloneable', () => {
        test('can determine if is cloneable', () => {
            class A implements Cloneable
            {
                [CLONE](): this
                {
                    return new A() as this;
                }
            }

            const dataSet = [
                { value: [], expected: false, name: 'Array' },
                { value: null, expected: false, name: 'Null' },
                { value: {}, expected: false, name: 'Object' },
                { value: { clone: false }, expected: false, name: 'Object with clone property' },

                {
                    value: { [CLONE]: () => this },
                    expected: true,
                    name: 'Object with clone function',
                },
                {
                    value: new A(),
                    expected: true,
                    name: 'Object that implements interface (clone function)',
                },
            ];

            for (const data of dataSet) {
                // @ts-ignore
                expect(
                    isCloneable(data.value),
                    `${data.name} was expected to ${data.expected.toString()}`,
                )
                    .toBe(data.expected);
            }
        });
    });
});
