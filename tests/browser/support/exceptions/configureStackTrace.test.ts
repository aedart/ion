import { configureStackTrace } from "@aedart/support/exceptions";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/exceptions', () => {

    describe('configureStackTrace()', () => {

        test('can capture stack trace and set it in error instance', () => {
            class MyCustomError extends Error
            {
                constructor(name: string, options?: ErrorOptions) {
                    super(name, options);

                    configureStackTrace(this);

                    this.name = "MyCustomError";
                }
            }

            // ---------------------------------------------------------------------------- //
            
            const error = new MyCustomError('Oh my...');
            
            expect(Reflect.has(error, 'stack'), 'stack property not in error')
                .toBeTruthy();
            
            expect(error.stack, 'stack property is undefined')
                .not
                .toBeUndefined();
        });
    });
});