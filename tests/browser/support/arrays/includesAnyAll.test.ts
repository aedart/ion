import { includesAll, includesAny } from '@aedart/support/arrays';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/ararys', () => {
    describe('includesAll', () => {
        test('can determine if array includes all values', () => {
            const data = [
                {
                    arr: [1, 2, 3],
                    values: [1, 2],
                    expected: true,
                    name: 'A',
                },
                {
                    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                    values: [17, 10],
                    expected: true,
                    name: 'B',
                },
                {
                    arr: [1, 2, 3],
                    values: [1, 4],
                    expected: false,
                    name: 'C',
                },
            ];

            for (const entry of data) {
                expect(
                    includesAll(entry.arr, entry.values),
                    `${entry.name} was expected to ${entry.expected.toString()}`,
                )
                    .toBe(entry.expected);
            }
        });
    });

    describe('includesAny', () => {
        test('can determine if array includes any (some) values', () => {
            const data = [
                {
                    arr: [1, 2, 3],
                    values: [4, 2],
                    expected: true,
                    name: 'A',
                },
                {
                    arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
                    values: [17, 12],
                    expected: true,
                    name: 'B',
                },
                {
                    arr: [1, 2, 3],
                    values: [4, 5],
                    expected: false,
                    name: 'C',
                },
            ];

            for (const entry of data) {
                expect(
                    includesAny(entry.arr, entry.values),
                    `${entry.name} was expected to ${entry.expected.toString()}`,
                )
                    .toBe(entry.expected);
            }
        });
    });
});
