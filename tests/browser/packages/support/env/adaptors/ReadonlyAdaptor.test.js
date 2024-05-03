import { Repository, ReadonlyAdaptor, WriteError } from "@aedart/support/env";

describe('@aedart/support/env', () => {
    describe('ReadonlyAdaptor', () => {

        it('fails when attempting to set environment variable', () => {
            
            const repo = new ReadonlyAdaptor(new Repository({
                // N/A
            }));

            // -------------------------------------------------------------------- //
            
            const callback = () => {
                repo.set('APP_ENV', 'local');    
            }
            
            expect(callback)
                .toThrowError(WriteError);
        });

        it('fails when attempting to delete environment variable', () => {

            const repo = new ReadonlyAdaptor(new Repository({
                FOO: 'BAR'
            }));

            // -------------------------------------------------------------------- //

            const callback = () => {
                repo.forget('FOO');
            }

            expect(callback)
                .toThrowError(WriteError);
        });
    });
});