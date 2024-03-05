import { ConcernsInjector } from "@aedart/support/concerns";
import makeConcernsInjector from "./helpers/makeConcernsInjector";

describe('@aedart/support/concerns', () => {
    describe('ConcernsInjector', () => {

        it('can make new instance', () => {
            const injector = makeConcernsInjector(class {});
            
            // Debug
            // console.log('result', injector);
            
            expect(injector)
                .toBeInstanceOf(ConcernsInjector);
        });

    }); 
});