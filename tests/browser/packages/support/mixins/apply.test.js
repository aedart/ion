import { apply } from "@aedart/support/mixins";

describe('@aedart/support/mixins', () => {

    describe('apply()', () => {

        it('can apply mixin function to class', () => {
           
            const value = 'bar';
            const MyMixin = (superclass) => class extends superclass {
                foo() {
                    return value;
                }
            }
            
            class A extends apply(class {}, MyMixin) {}
            
            const instance = new A();
            
            expect(instance.foo())
                .withContext('Mixin was not applied to class')
                .toEqual(value);
        });
    });
});