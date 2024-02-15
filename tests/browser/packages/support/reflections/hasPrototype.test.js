import {hasPrototype} from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('hasPrototype()', () => {

        it('can determine if object has prototype', () => {
            
            class A {}
            const obj = Object.create(null);
            
            expect(hasPrototype(A))
                .withContext('Class A should have a prototype')
                .toBeTrue();

            expect(hasPrototype(obj))
                .withContext('Object.create(null) should NOT have a prototype')
                .toBeFalse();
        });
        
    }); 
});