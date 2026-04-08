import { has, forget, forgetAll } from '@aedart/support/objects'
import { describe, expect, test } from 'vitest';

describe('@aedart/support/objects', () => {
    describe('forget', () => {

        test('can "forget" property', function () {

            const sym = Symbol('foo');
            const target = {
                a: 1234,
                b: {
                    name: 'Sven',
                    c: {
                        age: 24
                    }
                },
                d: [
                    {name: 'Jane'},
                    {name: 'Ashley'},
                ],
                [sym]: true,
                e: {
                    nested: {
                        [sym]: 'foo',
                    }
                }
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
                ['e', 'nested', sym]
            ];

            paths.forEach((path, index) => {
                const result = forget(target, path);

                expect(result, `Value in target was not removed, at value index ${index}`)
                    .toBeTruthy();

                expect(has(target, path), `Value in target still exists, at value index ${index}`)
                    .toBeFalsy();
            });
        });
    });

    describe('forgetAll', () => {

        test('can "forget all" properties', function () {

            const sym = Symbol('foo');
            const target = {
                a: 'bar',
                b: {
                    c: {
                        name: 'Helga'
                    }
                },
                d: [
                    {age: 27},
                    {age: 19},
                ],
                [sym]: false,
                e: {
                    nested: {
                        [sym]: 'foo',
                    }
                }
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
                ['e', 'nested', sym]
            ];

            forgetAll(target, ...paths);

            paths.forEach((path, index) => {
                expect(has(target, path), `Value not removed in target, at value index ${index}`)
                    .toBeFalsy();
            });
        });
    });    
});
