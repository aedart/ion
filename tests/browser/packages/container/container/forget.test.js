import { Container } from "@aedart/container";

describe('@aedart/support/container', () => {
    describe('forget', () => {

        it('can forget binding', () => {
            const container = new Container();

            container.bind('a', () => 'b');

            // ----------------------------------------------------------------- //

            const result = container.forget('a');
            
            expect(result)
                .withContext('Identifier is not forgotten')
                .toBeTrue();

            expect(container.has('a'))
                .withContext('Binding still exists in container')
                .toBeFalse();
        });

        it('can forget binding alias', () => {
            const container = new Container();

            container
                .bind('a', () => 'b')
                .alias('a', 'b');

            // ----------------------------------------------------------------- //

            const result = container.forget('b');

            expect(result)
                .withContext('Identifier is not forgotten')
                .toBeTrue();

            expect(container.has('b'))
                .withContext('Binding still exists in container')
                .toBeFalse();

            expect(container.has('a'))
                .withContext('Binding (a) SHOULD STILL exists in container')
                .toBeTrue();
        });

        it('can forget instance', () => {
            const container = new Container();

            class A {}
            container.instance('a', new A());

            // ----------------------------------------------------------------- //

            const result = container.forget('a');

            expect(result)
                .withContext('Identifier is not forgotten')
                .toBeTrue();

            expect(container.has('a'))
                .withContext('Binding still exists in container')
                .toBeFalse();
        });
    });
});