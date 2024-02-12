import { apply, isApplicationOf, wrap } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {

    describe('isApplicationOf()', () => {
        
        it('can determine if mixin was applied', () => {
            
            const MyMixinA = (superclass) => class extends superclass {}
            const MyMixinB = (superclass) => class extends superclass {}

            const appliedA = apply(class {}, MyMixinA);
            const appliedB = apply(class {}, MyMixinB);

            // -------------------------------------------------------------------------- //
            
            const resultA = isApplicationOf(appliedA.prototype, MyMixinA);
            expect(resultA)
                .withContext('should be application of mixin a')
                .toBeTrue();

            const resultB = isApplicationOf(appliedB.prototype, MyMixinA);
            expect(resultB)
                .withContext('should NOT be application of mixin a')
                .toBeFalse();
        });

        it('can determine if mixin was applied, when wrapped', () => {
            const MyMixin = (superclass) => class extends superclass {}
            
            const Wrapped = wrap(MyMixin, (superclass) => apply(superclass, MyMixin));
            
            // -------------------------------------------------------------------------- //

            const result = isApplicationOf(Wrapped(class {}).prototype, MyMixin);
            expect(result)
                .withContext('should be application of wrapped mixin')
                .toBeTrue();
        });
    });
});