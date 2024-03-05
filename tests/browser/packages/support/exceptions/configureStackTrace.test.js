import { configureStackTrace } from "@aedart/support/exceptions";

describe('@aedart/support/exceptions', () => {

    describe('configureStackTrace()', () => {

        it('can capture stack trace and set it in error instance', () => {
            class MyCustomError extends Error
            {
                constructor(name, options) {
                    super(name, options);

                    configureStackTrace(this);

                    this.name = "MyCustomError";
                }
            }

            // ---------------------------------------------------------------------------- //
            
            const error = new MyCustomError('Oh my...');
            
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