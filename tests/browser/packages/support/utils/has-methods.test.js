import {
    has,
    hasAll,
    hasAny
} from '@aedart/support';

describe('@aedart/support', () => {
    describe('has', () => {

        it('can determine if single property exist', function () {
            
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
                'a',
                'b',
                'b.name',
                'b.c',
                'b.c.age',
            ];

            const invalidPaths = [
                'foo',
                'foo.bar',
                'b.c.name',
            ];
            
            validPaths.forEach((path) => {
                expect(has(target, path))
                    .withContext(`${path} does not exist in target`)
                    .toBeTrue();
            });

            invalidPaths.forEach((path) => {
                expect(has(target, path))
                    .withContext(`${path} SHOULD NOT exist in target`)
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
                'a',
                'b.name',
                'b.c.age',
            ];

            const invalidPaths = [
                'b.c.age',
                'b.c.name' // does not exist
            ];

            expect(hasAll(target, validPaths))
                .withContext('should contain all valid paths')
                .toBeTrue()

            expect(hasAll(target, invalidPaths))
                .withContext('should NOT contain all paths')
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

            expect(hasAny(target, validPaths))
                .withContext('should contain some of the valid paths')
                .toBeTrue()

            expect(hasAny(target, invalidPaths))
                .withContext('should NOT contain any paths')
                .toBeFalse();
        });
    });
});