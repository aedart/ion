import { apply, hasMixin } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {

    describe('hasMixin()', () => {
        
        it('can determine if has mixin, when applied via apply()', () => {
            const MyMixin = (superclass) => class extends superclass {}

            const appliedA = apply(class {}, MyMixin);

            // -------------------------------------------------------------------------- //

            const result = hasMixin(appliedA.prototype, MyMixin);
            expect(result)
                .withContext('should be application of mixin')
                .toBeTrue();
        });
    });
});