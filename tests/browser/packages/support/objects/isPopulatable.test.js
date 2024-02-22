import { isPopulatable } from "@aedart/support/objects";

describe('@aedart/support/objects', () => {
    describe('isPopulatable', () => {

        it('can determine if is populatable', () => {

            const dataSet = [
                { value: [], expected: false, name: 'Array' },
                { value: null, expected: false, name: 'Null' },
                { value: {}, expected: false, name: 'Object' },
                { value: { populate: false }, expected: false, name: 'Object with populate property' },
                
                { value: { populate: () => true }, expected: true, name: 'Object with populate function' },
            ];

            for (const data of dataSet) {
                expect(isPopulatable(data.value))
                    .withContext(`${data.name} was expected to ${data.expected.toString()}`)
                    .toBe(data.expected);
            }
        });
        
    });
});