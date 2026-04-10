import { configureCustomError } from "@aedart/support/exceptions";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/exceptions', () => {

    describe('configureCustomError()', () => {

        test('can configure custom error instance', () => {
            class MyCustomError extends Error
            {
                constructor(name: string, options?: ErrorOptions) {
                    super(name, options);

                    configureCustomError(this);
                }
            }

            // ---------------------------------------------------------------------------- //

            const error = new MyCustomError('Oh my...');
            
            expect(error.name, 'Custom Error name incorrect')
                .toBe(MyCustomError.name)
            
            // Perhaps a bit redundant, ...
            expect(Reflect.has(error, 'stack'), 'stack property not in error')
                .toBeTruthy();
            
            expect(error.stack, 'stack property is undefined')
                .not
                .toBeUndefined();
        });
    });
});