import { CORE } from "@aedart/contracts/core";
import { CONTAINER } from "@aedart/contracts/container";
import { Container } from "@aedart/container";
import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('getInstance', () => {

        it('returns singleton instance', () => {
            const a = Application.getInstance();
            const b = Application.getInstance();
            const c = a.get(CONTAINER);
            const d = a.get(CORE);

            expect(b)
                .withContext('Incorrect container instance returned (for b)')
                .toBe(a);

            expect(c)
                .withContext('Incorrect container instance returned (for c)')
                .toBe(b);

            expect(d)
                .withContext('Incorrect container instance returned (for d)')
                .toBe(c);
            
            expect(a)
                .withContext('instance should be instance of a Container')
                .toBeInstanceOf(Container);

            expect(a)
                .withContext('instance should be instance of a Application')
                .toBeInstanceOf(Application);
            
            a.destroy();
            b.destroy();
            c.destroy();
            d.destroy();
        });

        it('singleton instance has core bootstrappers set', () => {
            const app = Application.getInstance();
            
            expect(app.coreBootstrappers.length)
                .withContext('No core bootstrappers available in singleton instance')
                .not
                .toBe(0);

            app.destroy();
        });

    });
});