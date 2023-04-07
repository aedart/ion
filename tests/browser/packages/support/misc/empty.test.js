import {
    empty
} from '@aedart/support/misc';

describe('@aedart/support/misc', () => {
    describe('empty', () => {

        it('can determine if value is empty', () => {
            
            const emptyValues = [
                '',
                false,
                0,
                0.0,
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

            emptyValues.forEach((value, index) => {
                // Debug
                // console.log('empty', value, isEmpty(value));
                
                expect(empty(value))
                    .withContext(`Value at index ${index} should be empty`)
                    .toBeTrue();
            });
            
            const typedArr = new Int8Array(1);
            typedArr[0] = 1;
            // console.log('Typed arr', typedArr, typedArr.length);
            const nonEmptyValues = [
                ' ',
                'a',
                true,
                1,
                -1
                [ 1 ],
                { name: 'Jimmy' },
                (new Set()).add('a'),
                (new Map).set('foo', 'bar'),
                typedArr,
            ];
            
            nonEmptyValues.forEach((value, index) => {
                // Debug
                // console.log('empty', value, isEmpty(value));
                
                expect(empty(value))
                    .withContext(`Value at index ${index} SHOULD NOT be empty`)
                    .toBeFalse();
            });
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