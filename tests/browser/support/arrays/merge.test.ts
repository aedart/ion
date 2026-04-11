import { merge, ArrayMergeError, Merger } from '@aedart/support/arrays';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/ararys', () => {
    describe('merge()', () => {

        test('can merge multiple arrays', () => {

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

        test('does not shallow copy simple object values', () => {

            const objA = { foo: true };
            const objB = { bar: true };

            const a = [ objA ];
            const b = [ objB ];

            // --------------------------------------------------------------- //

            const result = merge(a, b);

            // Debug
            // console.log('result', result);

            expect(result[0], 'Object a is a shallow copy!')
                .not
                .toBe(objA);

            expect(result[1], 'Object b is a shallow copy!')
                .not
                .toBe(objB);
        });

        test('fails when attempting to merge arrays with non-cloneable values', () => {

            const a = [ 1, 2, 3 ];
            const b = [ function() {} ];

            // --------------------------------------------------------------- //

            const callback = () => {
                merge(a, b);
            }

            expect(callback)
                .toThrow(ArrayMergeError);
        });

        test('returns merger object when no args given', () => {
            const merger = merge();

            expect(merger)
                .toBeInstanceOf(Merger);
        });

        test('can transfer functions', () => {

            const fnA = () => false;
            const fnB = () => true;

            const a = [ fnA ];
            const b = [ fnB ];

            // --------------------------------------------------------------- //

            const result = merge()
                .using({ transferFunctions: true })
                .of(a, b);

            expect(result.length, 'Incorrect amount of elements in output')
                .toBe(2);

            expect(result[0], 'Function A not transferred')
                .toBe(fnA);

            expect(result[1], 'Function B not transferred')
                .toBe(fnB);
        });

        test('can apply custom merge callback', () => {

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
