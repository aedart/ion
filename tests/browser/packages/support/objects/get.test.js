import {
    get
} from '@aedart/support/objects';

describe('@aedart/support/objects', () => {
    describe('get', () => {

        it('can get property', function () {

            const symbolProp = Symbol('other-symbol');
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
                // [ 'e.nested', symbolProp ]   // This does not work...
                ['e', 'nested', symbolProp],    // This does ...
                [ 'f', symbolProp, 2, 'name' ]
            ];

            const invalidPaths = [
                'foo',
                'foo.bar',
                'b.c.name',
            ];

            validPaths.forEach((path, index) => {
                let result = get(target, path);
                
                // Debug
                // console.log('path', path, 'result', result);
                
                expect(result)
                    .withContext(`Value for index ${index} resulted in undefined`)
                    .not
                    .toBeUndefined()
            });

            invalidPaths.forEach((path, index) => {
                let result = get(target, path);
                expect(result)
                    .withContext(`Value for index ${index} SHOULD be undefined`)
                    .toBeUndefined()
            });
        });

        it('returns default value when property does not exist', function () {
            const target = { a: 1, b: { name: 'Abe' } };
            
            let defaultValue = 'my-default';
            let result = get(target, 'b.nested.not.exist', defaultValue);
            
            expect(result)
                .toBe(defaultValue);
        });
    });
});