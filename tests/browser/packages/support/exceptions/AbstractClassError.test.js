import { AbstractClassError, LogicalError } from "@aedart/support/exceptions";

describe('@aedart/support/exceptions', () => {

    describe('AbstractClassError', () => {

        it('can throw new Abstract Class Error', () => {

            class A {}
            let wasThrown = false;

            try {
                throw new AbstractClassError(A);
            } catch (error) {
                // Debug
                // console.log(error.toString(), error.cause, error.stack);

                wasThrown = true;

                expect(error.target)
                    .withContext('Target not set')
                    .toBe(A);

                expect(error)
                    .withContext('Should be instance of AbstractClassError')
                    .toBeInstanceOf(AbstractClassError);
                
                expect(error)
                    .withContext('Should also be instance of LogicalError')
                    .toBeInstanceOf(LogicalError);

                expect(error)
                    .withContext('Should also be instance of Error')
                    .toBeInstanceOf(Error);
            }

            expect(wasThrown)
                .withContext('Custom error was not thrown')
                .toBeTrue();
        });

        it('can capture via expect', () => {
            const callback = () => {
                throw new AbstractClassError(class {});
            }

            expect(callback)
                .toThrowError(AbstractClassError);
        });

    });

});