import {
    Cached,
    Bare,
    hasMixin
} from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {

        describe('Cached', () => {

            it('caches the resulting mixin application', () => {

                // @see https://justinfagnani.com/2016/01/07/enhancing-mixins-with-decorator-functions/#cachingmixinapplications
                
                let aApplied = 0;
                let bApplied = 0;
                
                const MyMixinA = Cached(Bare((superclass) => {
                    aApplied++;
                    return class extends superclass {}
                }));
                const MyMixinB = Cached(Bare((superclass) => {
                    bApplied++;
                    return class extends superclass {}
                }));
                
                class A {}
                
                // Notice that the same mixins are applied on the same superclass.
                class B extends MyMixinA(MyMixinB(A)) {}
                class C extends MyMixinA(MyMixinB(A)) {}
                
                // -------------------------------------------------------------------------- //

                const instanceB = new B();
                expect(hasMixin(instanceB, MyMixinA))
                    .withContext('B should have mixin (a)')
                    .toBeTrue();
                expect(hasMixin(instanceB, MyMixinB))
                    .withContext('B should have mixin (b)')
                    .toBeTrue();

                const instanceC = new C();
                expect(hasMixin(instanceC, MyMixinA))
                    .withContext('C should have mixin (a)')
                    .toBeTrue();
                expect(hasMixin(instanceC, MyMixinB))
                    .withContext('C should have mixin (b)')
                    .toBeTrue();
                
                // The "Cached" decorator should ensure that the resulting application of applying
                // mixin a and b onto class A is only done once.
                
                expect(aApplied)
                    .withContext('mixin (a) should only be applied once')
                    .toEqual(1);
                expect(bApplied)
                    .withContext('mixin (b) should only be applied once')
                    .toEqual(1);
            });
        });
    });
});