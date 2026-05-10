import { toWeakRef } from '@aedart/support/misc';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/misc', () => {
    describe('toWeakRef', () => {
        test('returns undefined when target is null or undefined', () => {
            const targets = [
                null,
                undefined,
            ];

            targets.forEach((target, index) => {
                // @ts-expect-error Null is tested here on purposes.
                expect(toWeakRef(target), `Target at index ${index} should be undefined`)
                    .toBeUndefined();
            });
        });

        test('returns weak reference when target already a weak reference', () => {
            const obj = { name: 'John' };

            const target = new WeakRef(obj);

            expect(toWeakRef(target), 'Invalid target returned')
                .toBe(target);
        });

        test('wraps target into weak reference', () => {
            const obj = { name: 'John' };

            const result = toWeakRef(obj);

            expect(result, 'No weak reference returned')
                .toBeInstanceOf(WeakRef);

            expect(result?.deref(), 'Dereference failed')
                .toBe(obj);
        });
    });
});
