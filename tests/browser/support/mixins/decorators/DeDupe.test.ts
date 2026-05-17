import { Bare, DeDupe, hasMixin } from '@aedart/support/mixins';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/mixins', () => {
    describe('decorators', () => {
        describe('DeDupe', () => {
            test('applies mixin only once', () => {
                let applied = 0;
                const MyMixin = DeDupe(Bare((superclass) => {
                    applied++;

                    // @ts-expect-error Ignore superclas type here.
                    return class extends superclass {};
                }));

                // @ts-expect-error Ignore MyMixin return type here.
                class A extends MyMixin(
                    MyMixin(
                        MyMixin(class {}),
                    ),
                )
                {}

                // -------------------------------------------------------------------------- //

                const instance = new A();

                expect(hasMixin(instance, MyMixin), 'A should have mixin')
                    .toBeTruthy();

                expect(applied, 'mixin should only be applied once')
                    .toEqual(1);
            });
        });
    });
});
