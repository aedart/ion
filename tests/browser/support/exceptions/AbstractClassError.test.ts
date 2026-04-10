import { AbstractClassError, LogicalError } from "@aedart/support/exceptions";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/exceptions', () => {

    describe('AbstractClassError', () => {

        test('can throw new Abstract Class Error', () => {

            class A {}
            let wasThrown = false;

            try {
                throw new AbstractClassError(A);
            } catch (err: unknown) {
                const error = err as AbstractClassError;
                
                // Debug
                // console.log(error.toString(), error.cause, error.stack);

                wasThrown = true;

                expect(error.target, 'Target not set')
                    .toBe(A);

                expect(error, 'Should be instance of AbstractClassError')
                    .toBeInstanceOf(AbstractClassError);
                
                expect(error, 'Should also be instance of LogicalError')
                    .toBeInstanceOf(LogicalError);

                expect(error, 'Should also be instance of Error')
                    .toBeInstanceOf(Error);
            }

            expect(wasThrown, 'Custom error was not thrown')
                .toBeTruthy();
        });

        test('can capture via expect', () => {
            const callback = () => {
                throw new AbstractClassError(class {});
            }

            expect(callback)
                .toThrow(AbstractClassError);
        });

    });

});