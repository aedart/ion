import { Bare, HasInstance } from '@aedart/support/mixins';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {
        describe('HasInstance', () => {
            test('respects class inheritance ', () => {
                const MyMixin = HasInstance((superclass) => class extends superclass {});

                class A
                {}
                class B extends MyMixin(A)
                {}

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(instance instanceof A, 'instance should be instance of A')
                    .toBeTruthy();

                expect(instance instanceof B, 'instance should also be instance of B')
                    .toBeTruthy();
            });

            test('can determine if instance of mixin', () => {
                // NOTE: The Bare decorator MUST also be applied here, or instance of [mixin] will not work as intended!
                const MyMixin = HasInstance(Bare((superclass) => class extends superclass {}));

                class A
                {}
                class B extends MyMixin(A)
                {}

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(instance instanceof A, 'instance should be instance of A')
                    .toBeTruthy();

                expect(instance instanceof B, 'instance should also be instance of B')
                    .toBeTruthy();

                expect(instance instanceof MyMixin, 'instance should also be instance of mixin')
                    .toBeTruthy();
            });
        });
    });
});
