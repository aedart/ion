import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('version', () => {

        it('can obtain application version', () => {
            const app = new Application();
            
            // Debug
            // console.log('VERSION', app.version);
            
            const result = app.version;
            
            expect(typeof result)
                .toBe('string');
            
            expect(result.length)
                .not
                .toBe(0);
        });
    });
});