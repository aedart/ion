import { hasMixin, Mixin } from '@aedart/support/mixins';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {
        describe('Mixin', () => {
            test('can define and apply mixin function', () => {
                // It is a bit redundant to test all of "Mixin" decorator's applied decorators.
                // So here we just ensure that the top-level functionality works as intended.

                const MyMixin = Mixin((superclass) => class extends superclass {});

                class A
                {}
                class B extends MyMixin(A)
                {}

                // -------------------------------------------------------------------------- //

                const instance = new B();

                expect(hasMixin(instance, MyMixin), 'should have mixin in instance')
                    .toBeTruthy();

                expect(instance instanceof A, 'should be instance of class A')
                    .toBeTruthy();

                expect(instance instanceof B, 'should be instance of class B')
                    .toBeTruthy();

                expect(instance instanceof MyMixin, 'should be instance of mixin')
                    .toBeTruthy();
            });
        });
    });
});
