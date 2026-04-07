import { classOwnKeys } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('classOwnKeys', () => {
        test('can return all class property keys', () => {
            class A
            {
                foo()
                {}

                get bar() {
                    return null;
                }
            }

            // ----------------------------------------------------------------------- //

            const result = classOwnKeys(A);

            // Debug
            // console.log('result', result);

            expect(result, 'Incorrect property keys returned')
                .toEqual(['constructor', 'foo', 'bar']);
        });

        test('can return class property keys recursively', () => {
            class A
            {
                foo()
                {}
            }

            class B extends A
            {
                get bar() {
                    return '';
                }
            }

            class C extends B
            {
                zar()
                {}
            }

            // ----------------------------------------------------------------------- //

            const result = classOwnKeys(C, true);

            // Debug
            // console.log('result', result);

            expect(result, 'Incorrect property keys returned')
                .toEqual(['constructor', 'zar', 'bar', 'foo']);
        });

        test('can return class property keys recursively (via class static method)', () => {
            class A
            {
                a()
                {}
            }

            class B extends A
            {
                get b() {
                    return null;
                }
            }

            class C extends B
            {
                c()
                {}

                static keys()
                {
                    return classOwnKeys(this, true);
                }
            }

            // ----------------------------------------------------------------------- //

            const result = C.keys();

            // Debug
            // console.log('result', result);

            expect(result, 'Incorrect property keys returned')
                .toEqual(['constructor', 'c', 'b', 'a']);
        });
    });
});
