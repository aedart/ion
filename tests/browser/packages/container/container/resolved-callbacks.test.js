import { Container } from "@aedart/container";

describe('@aedart/support/container', () => {
    describe('before / after', () => {

        it('invokes resolved callbacks', () => {
            const container = new Container();

            let beforeInvoked = false;
            let afterInvoked = false;
            
            class Service {}
            container
                .bind('api', Service)
                .before('api', () => {
                    beforeInvoked = true;
                })
                .after('api', () => {
                    afterInvoked = true;
                });
            

            // ----------------------------------------------------------------- //

            const result = container.make('api');

            expect(result)
                .toBeInstanceOf(Service);
            
            expect(beforeInvoked)
                .withContext('before callback not invoked')
                .toBeTrue();

            expect(afterInvoked)
                .withContext('after callback not invoked')
                .toBeTrue();
        });
    });
});