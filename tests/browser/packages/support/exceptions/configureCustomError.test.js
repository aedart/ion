import { configureCustomError } from "@aedart/support/exceptions";

describe('@aedart/support/exceptions', () => {

    describe('configureCustomError()', () => {

        it('can configure custom error instance', () => {
            class MyCustomError extends Error
            {
                constructor(name, options) {
                    super(name, options);

                    configureCustomError(this);
                }
            }

            // ---------------------------------------------------------------------------- //

            const error = new MyCustomError('Oh my...');
            
            expect(error.name)
                .withContext('Custom Error name incorrect')
                .toBe(MyCustomError.name)
            
            // Perhaps a bit redundant, ...
            expect(Reflect.has(error, 'stack'))
                .withContext('stack property not in error')
                .toBeTrue();
            
            expect(error.stack)
                .withContext('stack property is undefined')
                .not
                .toBeUndefined();
        });
    });
});