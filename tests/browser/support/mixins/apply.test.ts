import type { MixinFunction } from '@aedart/contracts/support/mixins';
import { apply } from '@aedart/support/mixins';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {
    describe('apply()', () => {
        test('can apply mixin function to class', () => {
            const value = 'bar';

            // @ts-expect-error Ignore superclass type for testing purposes
            const MyMixin = (superclass) =>
                class extends superclass {
                    foo()
                    {
                        return value;
                    }
                };

            // @ts-expect-error Unknown base class in this case. Ignore for testing purpose
            class A extends apply(class {}, MyMixin as MixinFunction)
            {}

            const instance = new A() as { foo(): string; };

            expect(instance.foo(), 'Mixin was not applied to class')
                .toEqual(value);
        });
    });
});
