import { Container } from "@aedart/container";

describe('@aedart/support/container', () => {
    describe('instance', () => {

        it('can register existing instance', () => {
            class A {}
            
            const container = new Container();

            const instance = container.instance('a', new A());

            // -------------------------------------------------------------------- //

            const result = container.get('a');

            expect(container.bound('a'))
                .withContext('Instance does not appear to be bound')
                .toBeTrue();
            
            expect(result)
                .toBe(instance);
        });
    });
});