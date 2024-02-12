import {
    HasInstance,
    Bare
} from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {

        describe('HasInstance', () => {

            it('respects class inheritance ', () => {
                const MyMixin = HasInstance((superclass) => class extends superclass {});
                
                class A {}
                class B extends MyMixin(A) {}
                
                // -------------------------------------------------------------------------- //

                const instance = new B();
                
                expect(instance instanceof A)
                    .withContext('instance should be instance of A')
                    .toBeTrue();

                expect(instance instanceof B)
                    .withContext('instance should also be instance of B')
                    .toBeTrue();
            });

            it('can determine if instance of mixin', () => {
                // NOTE: The Bare decorator MUST also be applied here, or instance of [mixin] will not work as intended!
                const MyMixin = HasInstance(Bare((superclass) => class extends superclass {}));
                
                class A {}
                class B extends MyMixin(A) {}

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(instance instanceof A)
                    .withContext('instance should be instance of A')
                    .toBeTrue();

                expect(instance instanceof B)
                    .withContext('instance should also be instance of B')
                    .toBeTrue();

                expect(instance instanceof MyMixin)
                    .withContext('instance should also be instance of mixin')
                    .toBeTrue();
            });
        });
    });
});