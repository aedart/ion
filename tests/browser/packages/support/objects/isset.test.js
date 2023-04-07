import {
    isset
} from '@aedart/support/objects';

describe('@aedart/support/objects', () => {
    describe('isset', () => {

        it('returns false when no object', () => {
            
            expect(isset(undefined))
                .toBeFalse();
        });
        
        it('returns false when no paths given', () => {
            const target = { name: 'Ulla' };
            
            expect(isset(target))
                .toBeFalse();
        });
        
        it('can determine if single property isset', function () {
            
            const target = {
                a: 1234,
                b: {
                    name: undefined,
                    c: {
                        age: null
                    }
                },
            };

            expect(isset(target, 'a'))
                .withContext('a should be set')
                .toBeTrue();

            expect(isset(target, 'b'))
                .withContext('b should be set')
                .toBeTrue();

            expect(isset(target, 'b.name'))
                .withContext('b should NOT be set')
                .toBeFalse()

            expect(isset(target, 'b.c'))
                .withContext('b.c should be set')
                .toBeTrue();

            expect(isset(target, 'b.c.name'))
                .withContext('b.c.age should NOT be set')
                .toBeFalse();
            
            expect(isset(target, [ undefined ]))
                .withContext('[ undefined ] should NOT be set')
                .toBeFalse()
        });

        it('can determine if multiple properties are set', function () {

            const sym = Symbol('my-symbol');
            const target = {
                a: 1234,
                b: {
                    name: undefined,
                    c: {
                        age: null
                    }
                },
                d: {
                    [sym]: true
                }
            };
            
            expect(isset(target, 'a', 'b', ['d', sym]))
                .withContext('a, b and d[symbol] should be set')
                .toBeTrue();

            expect(isset(target, 'a', 'b.c.age', 'b.c'))
                .withContext('b.c.age should NOT be set')
                .toBeFalse();
        });
    });
});