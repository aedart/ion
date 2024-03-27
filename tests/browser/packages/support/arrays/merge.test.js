import {
    ArrayMergeError,
    merge,
    Merger
} from "@aedart/support/arrays";

describe('@aedart/support/arrays', () => {
    describe('merge()', () => {

        it('can merge multiple arrays', () => {
            
            const a = [ 1, 2, 3 ];
            const b = [ 4, 5, 6 ];
            const c = [ 7, 8, 9 ];
            
            // --------------------------------------------------------------- //
            
            const result = merge(a, b, c);

            // Debug
            // console.log('result', result);
            
            expect(result)
                .toEqual([ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]);
        });

        it('does not shallow copy simple object values', () => {
            
            const objA = { foo: true };
            const objB = { bar: true };
            
            const a = [ objA ];
            const b = [ objB ];

            // --------------------------------------------------------------- //

            const result = merge(a, b);
            
            // Debug
            // console.log('result', result);
            
            expect(result[0])
                .withContext('Object a is a shallow copy!')
                .not
                .toBe(objA);

            expect(result[1])
                .withContext('Object b is a shallow copy!')
                .not
                .toBe(objB);
        });

        it('fails when attempting to merge arrays with non-cloneable values', () => {

            const a = [ 1, 2, 3 ];
            const b = [ function() {} ];
            
            // --------------------------------------------------------------- //
            
            const callback = () => {
                merge(a, b);
            }
            
            expect(callback)
                .toThrowError(ArrayMergeError);
        });

        it('returns merger object when no args given', () => {
            const merger = merge();
            
            expect(merger)
                .toBeInstanceOf(Merger);
        });

        it('can transfer functions', () => {

            const fnA = () => false;
            const fnB = () => true;
            
            const a = [ fnA ];
            const b = [ fnB ];

            // --------------------------------------------------------------- //
            
            const result = merge()
                .using({ transferFunctions: true })
                .of(a, b);
            
            expect(result.length)
                .withContext('Incorrect amount of elements in output')
                .toBe(2);
            
            expect(result[0])
                .withContext('Function A not transferred')
                .toBe(fnA);

            expect(result[1])
                .withContext('Function B not transferred')
                .toBe(fnB);
        });

        it('can apply custom merge callback', () => {

            const a = [ 1, 2, 3 ];
            const b = [ 4, 5, 6 ];

            // --------------------------------------------------------------- //

            const result = merge()
                .using((element) => {
                    return element * 2;
                })
                .of(a, b);

            expect(result)
                .toEqual([ 2, 4, 6, 8, 10, 12 ]);
        });
    }); 
});