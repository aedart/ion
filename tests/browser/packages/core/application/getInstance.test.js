import { Container } from "@aedart/container";
import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('getInstance', () => {

        it('returns singleton instance', () => {
            const a = Application.getInstance();
            const b = Application.getInstance();
            
            expect(b)
                .withContext('Incorrect container instance returned (for b)')
                .toBe(a);

            expect(a)
                .withContext('instance should be instance of a Container')
                .toBeInstanceOf(Container);

            expect(a)
                .withContext('instance should be instance of a Application')
                .toBeInstanceOf(Application);
            
            a.destroy();
            b.destroy();
        });
    });
});