
import { AbstractConcern, ConcernsContainer, getConcernsContainer, use } from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('getConcernsContainer()', () => {

        it('fails of target instance is not a concerns owner', () => {
            class A {}
            
            // ------------------------------------------------------------------------------- //
            
            const callback = () => {
                getConcernsContainer(new A());    
            }
            
            expect(callback)
                .toThrowError(TypeError)
        });

        it('returns concerns container', () => {
            
            class MyConcern extends AbstractConcern {}
            
            @use(MyConcern)
            class A {}

            // ------------------------------------------------------------------------------- //
            
            const result = getConcernsContainer(new A());
            
            expect(result)
                .toBeInstanceOf(ConcernsContainer);
        });
    });
});