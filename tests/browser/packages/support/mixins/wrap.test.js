import { wrap } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {

    describe('wrap()', () => {

        it('sets the prototype of the wrapper mixin', () => {
            const MyMixinA = (superclass) => class extends superclass {}
            const MyMixinB = (superclass) => class extends superclass {}

            wrap(MyMixinA, MyMixinB);
            
            // -------------------------------------------------------------------------- //

            const result = Reflect.getPrototypeOf(MyMixinB);
            expect(result)
                .withContext('prototype of mixin (b) should match that of mixin (a)')
                .toEqual(MyMixinA);
        });
    });
});