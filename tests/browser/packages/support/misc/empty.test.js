import {
    empty
} from '@aedart/support/misc';

describe('@aedart/support/misc', () => {
    describe('empty', () => {

        it('can determine if value is empty', () => {
            
            const values = [
                '',
                false,
                0,
                0.0,
                0n,
                NaN,
                null,
                undefined,
                [],
                {},
                new Set(),
                new Map(),
                new Int8Array(),
                // new WeakMap(), // Has no way to determine size 
                // new WeakSet(), // Has no way to determine size
            ];

            for (const [index, value] of values.entries()) {
                //console.log(index, value);

                expect(empty(value))
                    .withContext(`Value at index ${index} should be empty`)
                    .toBeTrue();
            }
        });

        it('can determine if value is not empty', () => {
            const typedArr = new Int8Array(1);
            typedArr[0] = 1;
            
            const values = [
                ' ',
                'a',
                true,
                1,
                1n,
                [ 1 ],
                -1,
                Infinity,
                { name: 'Jimmy' },
                (new Set()).add('a'),
                (new Map).set('foo', 'bar'),
                typedArr,
                new Date(),
                function() {},
                Symbol('symbol')
            ];

            for (const [index, value] of values.entries()) {
                //console.log(index, value);

                expect(empty(value))
                    .withContext(`Value at index ${index} SHOULD NOT be empty`)
                    .toBeFalse();
            }
        });
        
        it('can determine if "Arguments" is empty', () => {
            
            const fn = function() {
                return arguments;
            };
            
            expect(empty(fn()))
                .withContext('Arguments should be empty, when no args. provided for method call')
                .toBeTrue();

            expect(empty(fn('a', 'b', 'c')))
                .withContext('Method call with args. SHOULD NOT be empty')
                .toBeFalse();
        });
    });
});