import {
    Mixin,
    hasMixin
} from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {

        describe('Mixin', () => {
            
            it('can define and apply mixin function', () => {

                // It is a bit redundant to test all of "Mixin" decorator's applied decorators.
                // So here we just ensure that the top-level functionality works as intended.
                
                const MyMixin = Mixin((superclass) => class extends superclass {});
                
                class A {}
                class B extends MyMixin(A) {}

                // -------------------------------------------------------------------------- //
                
                const instance = new B();

                expect(hasMixin(instance, MyMixin))
                    .withContext('should have mixin in instance')
                    .toBeTrue();

                expect(instance instanceof A)
                    .withContext('should be instance of class A')
                    .toBeTrue();

                expect(instance instanceof B)
                    .withContext('should be instance of class B')
                    .toBeTrue();
                
                expect(instance instanceof MyMixin)
                    .withContext('should be instance of mixin')
                    .toBeTrue();
            });
        });
    });
});