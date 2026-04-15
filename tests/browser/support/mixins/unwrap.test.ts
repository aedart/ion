import { wrap, unwrap } from "@aedart/support/mixins";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {

    describe('unwrap()', () => {

        test('returns the wrapped mixin function', () => {
            
            // @ts-expect-error ignore superclass type for testing purposes
            const MyMixinA = (superclass) => class extends superclass {}

            // @ts-expect-error ignore superclass type for testing purposes
            const MyMixinB = (superclass) => class extends superclass {}

            wrap(MyMixinA, MyMixinB);

            // -------------------------------------------------------------------------- //

            const result = unwrap(MyMixinB);
            expect(result, 'should return mixin (a)')
                .toEqual(MyMixinA);
        });
    });
});