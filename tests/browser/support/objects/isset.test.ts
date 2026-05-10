import { isset } from '@aedart/support/objects';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('isset', () => {
        test('returns false when no object', () => {
            // @ts-expect-error ignore type, for testing purpose
            expect(isset(undefined))
                .toBeFalsy();
        });

        test('returns false when no paths given', () => {
            const target = { name: 'Ulla' };

            expect(isset(target))
                .toBeFalsy();
        });

        test('can determine if single property isset', function()
        {
            const target = {
                a: 1234,
                b: {
                    name: undefined,
                    c: {
                        age: null,
                    },
                },
            };

            expect(isset(target, 'a'), 'a should be set')
                .toBeTruthy();

            expect(isset(target, 'b'), 'b should be set')
                .toBeTruthy();

            expect(isset(target, 'b.name'), 'b should NOT be set')
                .toBeFalsy();

            expect(isset(target, 'b.c'), 'b.c should be set')
                .toBeTruthy();

            expect(isset(target, 'b.c.name'), 'b.c.age should NOT be set')
                .toBeFalsy();

            // @ts-expect-error ignore type(s) for testing purposes
            expect(isset(target, [undefined]), '[ undefined ] should NOT be set')
                .toBeFalsy();
        });

        test('can determine if multiple properties are set', function()
        {
            const sym = Symbol('my-symbol');
            const target = {
                a: 1234,
                b: {
                    name: undefined,
                    c: {
                        age: null,
                    },
                },
                d: {
                    [sym]: true,
                },
            };

            expect(isset(target, 'a', 'b', ['d', sym]), 'a, b and d[symbol] should be set')
                .toBeTruthy();

            expect(isset(target, 'a', 'b.c.age', 'b.c'), 'b.c.age should NOT be set')
                .toBeFalsy();
        });
    });
});
