import { getNameOrDesc } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('getNameOrDesc()', () => {

        it('can obtain class constructor name', () => {
            class ApiService {}
            
            const result = getNameOrDesc(ApiService);

            // Debug
            // console.log(result);
            
            expect(result)
                .toBe('ApiService');
        });

        it('returns description tag for anonymous class', () => {
            const result = getNameOrDesc(class {});

            // Debug
            // console.log(result);
            
            expect(result)
                .toBe('[object Function]');
        });
    });
});