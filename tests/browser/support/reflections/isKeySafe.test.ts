import { DANGEROUS_PROPERTIES } from '@aedart/contracts/support/objects';
import { isKeySafe, isKeyUnsafe } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    const dataSet: Record<PropertyKey, unknown>[] = [
        { value: 'name', safe: true, name: 'name' },
        { value: 'prototype', safe: false, name: 'prototype' },
        { value: '__proto__', safe: false, name: '__proto__' },
        { value: 'constructor', safe: false, name: 'constructor' },
    ];

    describe('DANGEROUS_PROPERTIES', () => {
        test('cannot change predefined property', () => {
            expect(Object.isFrozen(DANGEROUS_PROPERTIES), 'DANGEROUS_PROPERTIES should be frozen')
                .toBeTruthy();
        });
    });

    describe('isKeySafe()', () => {
        test('can determine if key is safe', () => {
            for (const data of dataSet) {
                expect(
                    // @ts-expect-error Ignoring argument type for testing purposes
                    isKeySafe(data.value),
                    `${data.name} was expected to ${String(data.safe)}`, // eslint-disable-line @typescript-eslint/restrict-template-expressions
                )
                    .toBe(data.safe);
            }
        });
    });

    describe('isKeyUnsafe()', () => {
        test('can determine if key is unsafe', () => {
            for (const data of dataSet) {
                expect(
                    // @ts-expect-error Ignoring argument type for testing purposes
                    isKeyUnsafe(data.value),
                    `${data.name} was expected to ${String(data.safe)}`, // eslint-disable-line @typescript-eslint/restrict-template-expressions
                )
                    .toBe(!data.safe);
            }
        });
    });
});
