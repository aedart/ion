import { wrap } from "@aedart/support/mixins";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {

    describe('wrap()', () => {

        test('sets the prototype of the wrapper mixin', () => {

            // @ts-expect-error ignore superclass type for testing purposes
            const MyMixinA = (superclass) => class extends superclass {}

            // @ts-expect-error ignore superclass type for testing purposes
            const MyMixinB = (superclass) => class extends superclass {}

            wrap(MyMixinA, MyMixinB);
            
            // -------------------------------------------------------------------------- //

            const result = Reflect.getPrototypeOf(MyMixinB);
            expect(result, 'prototype of mixin (b) should match that of mixin (a)')
                .toEqual(MyMixinA);
        });
    });
});