import { apply, hasMixin } from '@aedart/support/mixins';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {
    describe('hasMixin()', () => {
        test('can determine if has mixin, when applied via apply()', () => {
            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixin = (superclass) => class extends superclass {};

            const appliedA = apply(class {}, MyMixin);

            // -------------------------------------------------------------------------- //

            const result = hasMixin(appliedA.prototype, MyMixin);
            expect(result, 'should be application of mixin')
                .toBeTruthy();
        });
    });
});
