import { LogicalError } from "@aedart/support/exceptions";

fdescribe('@aedart/support/exceptions', () => {

    describe('LogicalError', () => {

        it('can throw new Logical Error', () => {

            // Although we can use Jasmine's builtin helpers to capture, we do so manually
            // for this custom error/exception to assert other aspects of it...
            
            const msg = 'Lorum Lipsum';
            const options = { cause: { details: 'Morus Esto buno' }};
            let wasThrown = false;
            
            try {
                throw new LogicalError(msg, options);    
            } catch (error) {
                // Debug
                // console.log(error.toString(), error.cause, error.stack);

                wasThrown = true;
                
                expect(error.name)
                    .toBe('LogicalError');
                
                expect(error.message)
                    .toBe(msg);
                
                expect(error.cause)
                    .withContext('Error cause does not appear to be defined')
                    .toBe(options.cause);
                
                expect(error.stack)
                    .withContext('Error stack does not appear to be defined')
                    .not
                    .toBeUndefined();
                
                expect(error)
                    .withContext('Should be instance of LogicalError')
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
                throw new LogicalError();
            }
            
            expect(callback)
                .toThrowError(LogicalError);
        });

    });
    
});