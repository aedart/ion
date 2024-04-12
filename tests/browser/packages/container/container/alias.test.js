import { Container } from "@aedart/container";

describe('@aedart/container', () => {
    describe('alias', () => {

        it('can register alias for binding', () => {
            const container = new Container();

            container
                .bind('alpha', () => 'beta')
                .alias('alpha', 'beta');

            // -------------------------------------------------------------------- //

            expect(container.isAlias('beta'))
                .withContext('Alias not registered')
                .toBeTrue();
            
            expect(container.bound('beta'))
                .withContext('Alias not bound')
                .toBeTrue();

            const result = container.make('beta');
            expect(result)
                .toBe('beta');
        });

        it('fails when identifier is the same as the alias', () => {
            const container = new Container();

            const callback = () => {
                container.alias('a', 'a');    
            }
            
            expect(callback)
                .toThrowError(TypeError);
        });

        it('can obtain identifier for alias', () => {
            const container = new Container();

            container.alias('alpha', 'beta');

            // -------------------------------------------------------------------- //
            
            const result = container.getAlias('beta');
            expect(result)
                .toBe('alpha');
        });
    });
});