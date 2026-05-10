import { classOwnKeys } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('classOwnKeys', () => {
        test('can return all class property keys', () => {
            class A
            {
                foo()
                {/* empty */}

                get bar() {
                    return 2 + Math.random();
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
                {/* empty */}
            }

            class B extends A
            {
                get bar() {
                    return Math.random();
                }
            }

            class C extends B
            {
                zar()
                {/* empty */}
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
                {/* empty */}
            }

            class B extends A
            {
                get b() {
                    return Math.random();
                }
            }

            class C extends B
            {
                c()
                {/* empty */}

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
