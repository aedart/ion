import {
    has,
    hasAll,
    hasAny
} from '@aedart/support/objects';

describe('@aedart/support/objects', () => {
    describe('has', () => {

        it('can determine if single property exist', function () {
            
            const symbolProp = Symbol('my-symbol');
            const target = {
                a: 1234,
                b: {
                    name: 'Sven',
                    c: {
                        age: 24
                    }
                },
                d: [
                    { name: 'Jane'},
                    { name: 'Ashley'},
                ],
                [symbolProp]: true,
                e: {
                    nested: {
                        [symbolProp]: 'foo',
                    }
                },
                f: {
                    [symbolProp]: [
                        123, // 0
                        456, // 1
                        {    // 2
                            name: 'Rick'
                        }
                    ]
                }
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
                [ 'e', 'nested', symbolProp ], // This does ...
                [ 'f', symbolProp, 2, 'name' ]
            ];

            const invalidPaths = [
                'foo',
                'foo.bar',
                'b.c.name',
            ];
            
            validPaths.forEach((path, index) => {
                expect(has(target, path))
                    .withContext(index + ` does not exist in target`)
                    .toBeTrue();
            });

            invalidPaths.forEach((path, index) => {
                expect(has(target, path))
                    .withContext(index + ` SHOULD NOT exist in target`)
                    .toBeFalse();
            });
        });

        it('can determine if single property exist, inherited', function () {
            
            class Box {
                width = 50;
                height = 25;
            }

            class FancyBox extends Box {}
            
            const target = new FancyBox();

            expect(has(target, 'height'))
                .withContext(`height should exist in target`)
                .toBeTrue();
        });
    });
    
    describe('hasAll', () => {

        it('can determine if has all properties', function () {

            const symbolProp = Symbol('my-symbol');
            const target = {
                a: 1234,
                b: {
                    name: 'Sven',
                    c: {
                        age: 24,
                        [symbolProp]: true
                    }
                },
                d: [
                    { name: 'Jane'},
                    { name: 'Ashley'},
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
                'b.c.name' // does not exist
            ];

            expect(hasAll(target, ...validPaths))
                .withContext('should contain all valid paths')
                .toBeTrue()

            expect(hasAll(target, ...invalidPaths))
                .withContext('should NOT contain all paths')
                .toBeFalse();
        });

        it('returns false, when no paths given', () => {
            
            const target = { name: 'Erica' };
            
            expect(hasAll(target))
                .toBeFalse();
        });
    });

    describe('hasAny', () => {

        it('can determine if has any properties', function () {

            const target = {
                a: 1234,
                b: {
                    name: 'Sven',
                    c: {
                        age: 24
                    }
                }
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

            expect(hasAny(target, ...validPaths))
                .withContext('should contain some of the valid paths')
                .toBeTrue()

            expect(hasAny(target, ...invalidPaths))
                .withContext('should NOT contain any paths')
                .toBeFalse();
        });
    });
});