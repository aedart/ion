import { forget, forgetAll, has } from '@aedart/support/objects';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('forget', () => {
        test('can "forget" property', function()
        {
            const sym = Symbol('foo');
            const target = {
                a: 1234,
                b: {
                    name: 'Sven',
                    c: {
                        age: 24,
                    },
                },
                d: [
                    { name: 'Jane' },
                    { name: 'Ashley' },
                ],
                [sym]: true,
                e: {
                    nested: {
                        [sym]: 'foo',
                    },
                },
            };

            const paths = [
                'a',
                'b.name',
                'b.c.age',
                'b.c',
                'b',
                'd[1].name',
                'd',
                sym,
                ['e', 'nested', sym],
            ];

            paths.forEach((path, index) => {
                const result = forget(target, path);

                expect(result, `Value in target was not removed, at value index ${index}`)
                    .toBeTruthy();

                expect(has(target, path), `Value in target still exists, at value index ${index}`)
                    .toBeFalsy();
            });
        });

        test('returns false when trying to forget a non-configurable property', () => {
            const target = {};
            Object.defineProperty(target, 'readonly', {
                value: 1,
                configurable: false,
            });

            expect(forget(target, 'readonly')).toBeFalsy();
            expect(has(target, 'readonly')).toBeTruthy();
        });

        test('leaves a hole in arrays when forgetting an index', () => {
            const target = {
                arr: ['first', 'second', 'third'],
            };

            const result = forget(target, 'arr[1]');

            expect(result).toBeTruthy();
            expect(target.arr.length).toBe(3);
            expect(target.arr[1]).toBeUndefined();
            expect(1 in target.arr).toBeFalsy(); // The hole check
        });

        test('returns false for empty path', () => {
            const target = { a: 1 };
            expect(forget(target, '')).toBeFalsy();
        });

        test('returns true when forgetting path that does not exist (idempotency)', () => {
            const target = { a: 1 };
            // The parent 'b' doesn't exist, so 'b.c' is effectively already forgotten.
            expect(forget(target, 'b.c')).toBeTruthy();
        });
    });

    describe('forgetAll', () => {
        test('does nothing when target is undefined', () => {
            // @ts-expect-error ignore target type here, for testing purpose
            forgetAll(undefined);

            // NA - if no failure, then passes...
            expect(true)
                .toBeTruthy();
        });

        test('can "forget all" properties', function()
        {
            const sym = Symbol('foo');
            const target = {
                a: 'bar',
                b: {
                    c: {
                        name: 'Helga',
                    },
                },
                d: [
                    { age: 27 },
                    { age: 19 },
                ],
                [sym]: false,
                e: {
                    nested: {
                        [sym]: 'foo',
                    },
                },
            };

            const paths = [
                'a',
                'b',
                'b.name',
                'b.c.age',
                'b.c',
                'd[1].name',
                'd',
                sym,
                ['e', 'nested', sym],
            ];

            forgetAll(target, ...paths);

            paths.forEach((path, index) => {
                expect(has(target, path), `Value not removed in target, at value index ${index}`)
                    .toBeFalsy();
            });
        });
    });
});
