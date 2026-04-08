import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";
import { isKeySafe, isKeyUnsafe } from "@aedart/support/reflections";
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {

    const dataSet: Record<PropertyKey, any>[] = [
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
        test('can determine if key is safe', () => {
            for (const data of dataSet) {
                expect(isKeySafe(data.value), `${data.name} was expected to ${data.safe.toString()}`)
                    .toBe(data.safe);
            }
        });
    });

    describe('isKeyUnsafe()', () => {
        test('can determine if key is unsafe', () => {
            for (const data of dataSet) {
                expect(isKeyUnsafe(data.value), `${data.name} was expected to ${data.safe.toString()}`)
                    .toBe(!data.safe);
            }
        });
    });
    
});
