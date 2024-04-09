import { Container } from "@aedart/container";

describe('@aedart/support/container', () => {
    describe('flush', () => {

        it('flushes bindings, instances, aliases and resolved', () => {
            const container = new Container();

            container
                .bind('a', () => 'b')
                .alias('a', 'b');
            
            class Foo {}
            container.instance('foo', new Foo());

            // ----------------------------------------------------------------- //

            container.flush();

            expect(container.has('a'))
                .withContext('binding still registered')
                .toBeFalse();

            expect(container.has('b'))
                .withContext('alias still registered')
                .toBeFalse();

            expect(container.has('foo'))
                .withContext('instance still registered')
                .toBeFalse();

            expect(container.isResolved('foo'))
                .withContext('instance still marked as resolved')
                .toBeFalse();
        });
    });
});