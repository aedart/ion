import { isBoundFunction } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('isBoundFunction', () => {
        test('can determine function is bound', () => {
            const obj = {};
            const foo = function()
            {};
            const boundFoo = foo.bind(obj);
            const bar = function()
            {};

            expect(isBoundFunction(boundFoo), 'A should be bound')
                .toBeTruthy();

            expect(isBoundFunction(bar), 'B should not be bound')
                .toBeFalsy();
        });
    });
});
