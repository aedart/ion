import { isCloneable } from "@aedart/support/objects";

describe('@aedart/support/objects', () => {
    describe('isCloneable', () => {

        it('can determine if is cloneable', () => {

            const dataSet = [
                { value: [], expected: false, name: 'Array' },
                { value: null, expected: false, name: 'Null' },
                { value: {}, expected: false, name: 'Object' },
                { value: { clone: false }, expected: false, name: 'Object with clone property' },
                
                { value: { clone: () => true }, expected: true, name: 'Object with clone function' },
            ];

            for (const data of dataSet) {
                expect(isCloneable(data.value))
                    .withContext(`${data.name} was expected to ${data.expected.toString()}`)
                    .toBe(data.expected);
            }
        });
        
    });
});