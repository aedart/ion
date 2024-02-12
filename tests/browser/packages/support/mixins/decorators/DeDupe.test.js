import {
    DeDupe,
    Bare,
    hasMixin
} from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {

        describe('DeDupe', () => {

            it('applies mixin only once', () => {

                let applied = 0;
                const MyMixin = DeDupe(Bare((superclass) => {
                    applied++;
                    return class extends superclass {};
                }));

                class A extends MyMixin(
                    MyMixin(
                        MyMixin(class {})
                    )
                ) {}

                // -------------------------------------------------------------------------- //

                const instance = new A();
                
                expect(hasMixin(instance, MyMixin))
                    .withContext('A should have mixin')
                    .toBeTrue();
                
                expect(applied)
                    .withContext('mixin should only be applied once')
                    .toEqual(1);
            });
        });
    });
});