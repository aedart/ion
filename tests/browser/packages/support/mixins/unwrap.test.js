import { wrap, unwrap } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {

    describe('unwrap()', () => {

        it('returns the wrapped mixin function', () => {
            const MyMixinA = (superclass) => class extends superclass {}
            const MyMixinB = (superclass) => class extends superclass {}

            wrap(MyMixinA, MyMixinB);

            // -------------------------------------------------------------------------- //

            const result = unwrap(MyMixinB);
            expect(result)
                .withContext('should return mixin (a)')
                .toEqual(MyMixinA);
        });
    });
});