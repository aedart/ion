import { getConstructorName } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('getConstructorName()', () => {

        it('can obtain class constructor name', () => {
            class Box {}
            
            const result = getConstructorName(Box);

            // Debug
            console.log(result);
            
            expect(result)
                .toBe('Box');
        });

        it('returns null for anonymous class', () => {
            const result = getConstructorName(class {});

            // Debug
            console.log(result);
            
            expect(result)
                .toBeNull();
        });

        it('returns default value', () => {
            const defaultValue = 'MyBox';

            const result = getConstructorName(class {}, defaultValue);
            
            // Debug
            console.log(result);
            
            expect(result)
                .toBe(defaultValue)
        });
    });
});