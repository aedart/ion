import { Container } from "@aedart/container";

describe('@aedart/support/container', () => {
    describe('bind', () => {

        it('can bind factory callback', () => {
            const container = new Container();

            container.bind('alpha', () => 'beta');
            
            // -------------------------------------------------------------------- //
            
            const result = container.make('alpha');
            expect(result)
                .toBe('beta');
        });

        it('"bind if" does not overwrite existing binding', () => {
            const container = new Container();

            container
                .bindIf('alpha', () => 'beta')
                .bindIf('alpha', () => 'gamma');

            // -------------------------------------------------------------------- //

            const result = container.make('alpha');
            expect(result)
                .toBe('beta');
        });

        it('"bind if" registers when there is no existing binding', () => {
            const container = new Container();

            container
                .bindIf('alpha', () => 'beta')
                .bindIf('beta', () => 'gamma');

            // -------------------------------------------------------------------- //

            const result = container.make('beta');
            expect(result)
                .toBe('gamma');
        });

        it('can bind constructor', () => {
            class Bar {}

            const container = new Container();

            container.bind('foo', Bar);

            // -------------------------------------------------------------------- //

            const result = container.make('foo');
            expect(result)
                .toBeInstanceOf(Bar);
        });
    });
});