import { apply, isApplicationOf, wrap } from "@aedart/support/mixins";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {

    describe('isApplicationOf()', () => {
        
        test('can determine if mixin was applied', () => {

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinA = (superclass) => class extends superclass {}

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixinB = (superclass) => class extends superclass {}

            const appliedA = apply(class {}, MyMixinA);
            const appliedB = apply(class {}, MyMixinB);

            // -------------------------------------------------------------------------- //
            
            const resultA = isApplicationOf(appliedA.prototype, MyMixinA);
            expect(resultA, 'should be application of mixin a')
                .toBeTruthy();

            const resultB = isApplicationOf(appliedB.prototype, MyMixinA);
            expect(resultB, 'should NOT be application of mixin a')
                .toBeFalsy();
        });

        test('can determine if mixin was applied, when wrapped', () => {

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixin = (superclass) => class extends superclass {}
            
            const Wrapped = wrap(MyMixin, (superclass) => apply(superclass, MyMixin));
            
            // -------------------------------------------------------------------------- //

            const result = isApplicationOf(Wrapped(class {}).prototype, MyMixin);
            expect(result, 'should be application of wrapped mixin')
                .toBeTruthy();
        });
    });
});