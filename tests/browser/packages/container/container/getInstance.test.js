import { Container } from "@aedart/container";

describe('@aedart/container', () => {
    describe('getInstance', () => {

        it('returns singleton instance', () => {
            const a = Container.getInstance();
            const b = Container.getInstance();
            
            expect(b)
                .withContext('Incorrect container instance returned')
                .toBe(a);

            Container.setInstance(null);
        });
        
    });
});