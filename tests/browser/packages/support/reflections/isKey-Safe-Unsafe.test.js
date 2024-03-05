import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";
import { isKeySafe, isKeyUnsafe } from "@aedart/support/reflections";

describe('@aedart/support/objects', () => {
    
    const dataSet = [
        { value: 'name', safe: true, name: 'name' },
        { value: 'prototype', safe: true, name: 'prototype' },
    ];
    
    for (const key of DANGEROUS_PROPERTIES) {
        dataSet.push(
            {
                value: key,
                safe: false,
                name: typeof key == 'symbol'
                    ? key.description
                    : key
            },
        );
    }
    
    describe('isKeySafe()', () => {
        it('can determine if key is safe', () => {
            for (const data of dataSet) {
                expect(isKeySafe(data.value))
                    .withContext(`${data.name} was expected to ${data.safe.toString()}`)
                    .toBe(data.safe);
            }
        });
    });

    describe('isKeyUnsafe()', () => {
        it('can determine if key is unsafe', () => {
            for (const data of dataSet) {
                expect(isKeyUnsafe(data.value))
                    .withContext(`${data.name} was expected to ${data.safe.toString()}`)
                    .toBe(!data.safe);
            }
        });
    });
});