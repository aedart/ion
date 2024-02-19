import { getErrorMessage } from "@aedart/support/exceptions";

describe('@aedart/support/exceptions', () => {

    describe('getErrorMessage()', () => {

        it('returns error message', () => {

            const err = new Error('Lorum lipsum');
            
            const result = getErrorMessage(err);
            expect(result)
                .toBe(err.message);
        });

        it('returns default message, when unable to resolve message from error', () => {

            const defaultMessage = 'My other failure reason';
            
            const err = {};
            
            const result = getErrorMessage(err, defaultMessage);
            expect(result)
                .toBe(defaultMessage);
        });
    });

});