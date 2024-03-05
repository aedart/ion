import { classOwnKeys } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('classOwnKeys()', () => {

        it('can return all class property keys', () => {
            
            class A {
                foo() {}
                
                get bar() {}
            }
            
            // ----------------------------------------------------------------------- //
            
            const result = classOwnKeys(A);
            
            // Debug
            // console.log('result', result);
            
            expect(result)
                .withContext('Incorrect property keys returned')
                .toEqual([ 'constructor', 'foo', 'bar' ]);
        });

        it('can return class property keys recursively', () => {

            class A {
                foo() {}
            }
            
            class B extends A {
                get bar() {}
            }

            class C extends B {
                zar() {}
            }
            
            // ----------------------------------------------------------------------- //

            const result = classOwnKeys(C, true);

            // Debug
            // console.log('result', result);

            expect(result)
                .withContext('Incorrect property keys returned')
                .toEqual([ 'constructor', 'foo', 'bar', 'zar' ]);
        });

        it('can return class property keys recursively (via class static method)', () => {

            class A {
                a() {}
            }

            class B extends A {
                get b() {}
            }

            class C extends B {
                c() {}
                
                static keys() {
                    return classOwnKeys(this, true);
                }
            }

            // ----------------------------------------------------------------------- //

            const result = C.keys();

            // Debug
            // console.log('result', result);

            expect(result)
                .withContext('Incorrect property keys returned')
                .toEqual([ 'constructor', 'a', 'b', 'c' ]);
        });
        
    });
});