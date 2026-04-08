import { get, has, set } from '@aedart/support/objects';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('set', () => {
        test('can set property', function()
        {
            const target = {};

            const foo = Symbol('foo-symbol');
            const values = [
                { key: 'a', value: 1234 },
                { key: 'b.name', value: 'Ole' },
                { key: 'b.c', value: { age: 48 } },
                { key: 'd[0]', value: { name: 'Tim' } },
                { key: 'd[1].name', value: 'Erica' },
                { key: foo, value: true },
                { key: ['e', 'nested', foo], value: 'bar' },
                { key: ['e', foo, 3], value: 'zim' },
            ];

            values.forEach(({ key, value }, index) => {
                set(target, key, value);

                expect(has(target, key), `Target does not contain key for values index ${index}`)
                    .toBeTruthy();

                expect(get(target, key), `Incorrect value in target for values index ${index}`)
                    .toBe(value);
            });

            // Debug
            // console.log(target);
            // console.log(target.d);
            // console.log(target.e);
        });
    });
});
