import { has, hasAll, hasAny } from '@aedart/support/objects';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('has', () => {
        test('can determine if single property exist', function()
        {
            const symbolProp = Symbol('my-symbol');
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
                [symbolProp]: true,
                e: {
                    nested: {
                        [symbolProp]: 'foo',
                    },
                },
                f: {
                    [symbolProp]: [
                        123, // 0
                        456, // 1
                        { // 2
                            name: 'Rick',
                        },
                    ],
                },
            };

            const validPaths = [
                'a',
                'b',
                'b.name',
                'b.c',
                'b.c.age',
                'd[0]',
                'd[1].name',
                symbolProp,
                // [ 'e.nested', symbolProp ] // This does not work...
                ['e', 'nested', symbolProp], // This does ...
                ['f', symbolProp, 2, 'name'],
            ];

            const invalidPaths = [
                'foo',
                'foo.bar',
                'b.c.name',
            ];

            validPaths.forEach((path, index) => {
                expect(has(target, path), index + ` does not exist in target`)
                    .toBeTruthy();
            });

            invalidPaths.forEach((path, index) => {
                expect(has(target, path), index + ` SHOULD NOT exist in target`)
                    .toBeFalsy();
            });
        });

        test('returns true for existing falsy values', () => {
            const target = {
                a: null,
                b: 0,
                c: false,
                d: '',
            };

            expect(has(target, 'a')).toBeTruthy();
            expect(has(target, 'b')).toBeTruthy();
            expect(has(target, 'c')).toBeTruthy();
            expect(has(target, 'd')).toBeTruthy();
        });

        test('returns false for unsafe properties', () => {
            const target = {};
            // Even though these exist on Object.prototype, our utility should deny them
            expect(has(target, '__proto__')).toBeFalsy();
            expect(has(target, 'constructor')).toBeFalsy();
        });

        test('handles sparse arrays (holes)', () => {
            const target = {
                arr: [1, /* hole */, 3]
            };

            expect(has(target, 'arr[0]')).toBeTruthy();
            expect(has(target, 'arr[1]')).toBeFalsy(); // Index exists but has no value
            expect(has(target, 'arr[2]')).toBeTruthy();
        });

        test('returns false for empty or invalid path types', () => {
            const target = { a: 1 };

            expect(has(target, '')).toBeFalsy();
            // @ts-expect-error testing invalid input
            expect(has(target, null)).toBeFalsy();
        });
        
        test('can determine if single property exist, inherited', function()
        {
            class Box
            {
                width = 50;
                height = 25;
            }

            class FancyBox extends Box
            {}

            const target = new FancyBox();

            expect(has(target, 'height'), `height should exist in target`)
                .toBeTruthy();
        });
    });

    describe('hasAll', () => {
        test('can determine if has all properties', function()
        {
            const symbolProp = Symbol('my-symbol');
            const target = {
                a: 1234,
                b: {
                    name: 'Sven',
                    c: {
                        age: 24,
                        [symbolProp]: true,
                    },
                },
                d: [
                    { name: 'Jane' },
                    { name: 'Ashley' },
                ],
            };

            const validPaths = [
                'a',
                'b.name',
                'b.c.age',
                ['b', 'c', symbolProp],
                'd[0]',
                'd[1].name',
            ];

            const invalidPaths = [
                'b.c.age',
                'b.c.name', // does not exist
            ];

            expect(hasAll(target, ...validPaths), 'should contain all valid paths')
                .toBeTruthy();

            expect(hasAll(target, ...invalidPaths), 'should NOT contain all paths')
                .toBeFalsy();
        });

        test('returns false, when no paths given', () => {
            const target = { name: 'Erica' };

            expect(hasAll(target))
                .toBeFalsy();
        });
    });

    describe('hasAny', () => {
        test('Returns false when target is undefined', () => {
            // @ts-expect-error ignore target type for testing purpose
            expect(hasAny(undefined, ['a.b.c']))
                .toBeFalsy();
        });

        test('can determine if has any properties', function()
        {
            const target = {
                a: 1234,
                b: {
                    name: 'Sven',
                    c: {
                        age: 24,
                    },
                },
            };

            const validPaths = [
                'z', // does not exist
                'b.c.name', // does not exist
                'b.c.age',
            ];

            const invalidPaths = [
                'b.c.name', // does not exist
                'z', // does not exist
            ];

            expect(hasAny(target, ...validPaths), 'should contain some of the valid paths')
                .toBeTruthy();

            expect(hasAny(target, ...invalidPaths), 'should NOT contain any paths')
                .toBeFalsy();
        });
    });
});
