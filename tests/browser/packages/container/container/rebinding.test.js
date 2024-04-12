import { Container } from "@aedart/container";

describe('@aedart/container', () => {
    describe('rebinding', () => {

        it('invokes rebound-callback when resolved binding is rebound', () => {
            const container = new Container();
            
            let wasRebound = false;

            container.rebinding('a', () => {
                wasRebound = true;
            });
            container.bind('a', () => 'b');

            // ----------------------------------------------------------------- //
            
            const result = container.make('a');
            
            container.extend('a', (resolved) => resolved);
            
            expect(result)
                .toBe('b');
            expect(wasRebound)
                .withContext('Rebound callback not invoked')
                .toBeTrue();
        });

        it('invokes rebound-callback when instance is rebound', () => {
            const container = new Container();

            let wasRebound = false;

            container.rebinding('a', () => {
                wasRebound = true;
            });
            
            class A {}

            // ----------------------------------------------------------------- //
            
            const result = container.instance('a', new A());

            container.extend('a', (resolved) => resolved);

            expect(result)
                .toBeInstanceOf(A);
            expect(wasRebound)
                .withContext('Rebound callback not invoked')
                .toBeTrue();
        });
    });
});