import { Bare, Cached, hasMixin } from '@aedart/support/mixins';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {
        describe('Cached', () => {
            test('caches the resulting mixin application', () => {
                // @see https://justinfagnani.com/2016/01/07/enhancing-mixins-with-decorator-functions/#cachingmixinapplications

                let aApplied = 0;
                let bApplied = 0;

                const MyMixinA = Cached(Bare((superclass) => {
                    aApplied++;
                    return class extends superclass {};
                }));
                const MyMixinB = Cached(Bare((superclass) => {
                    bApplied++;
                    return class extends superclass {};
                }));

                class A
                {}

                // Notice that the same mixins are applied on the same superclass.
                class B extends MyMixinA(MyMixinB(A))
                {}
                class C extends MyMixinA(MyMixinB(A))
                {}

                // -------------------------------------------------------------------------- //

                const instanceB = new B();
                expect(hasMixin(instanceB, MyMixinA), 'B should have mixin (a)')
                    .toBeTruthy();
                expect(hasMixin(instanceB, MyMixinB), 'B should have mixin (b)')
                    .toBeTruthy();

                const instanceC = new C();
                expect(hasMixin(instanceC, MyMixinA), 'C should have mixin (a)')
                    .toBeTruthy();
                expect(hasMixin(instanceC, MyMixinB), 'C should have mixin (b)')
                    .toBeTruthy();

                // The "Cached" decorator should ensure that the resulting application of applying
                // mixin a and b onto class A is only done once.

                expect(aApplied, 'mixin (a) should only be applied once')
                    .toEqual(1);
                expect(bApplied, 'mixin (b) should only be applied once')
                    .toEqual(1);
            });
        });
    });
});
