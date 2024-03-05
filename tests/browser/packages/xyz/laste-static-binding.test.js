xdescribe('@aedart/xyz', () => {
    describe('late static binding', () => {

        it('can obtain constructor', () => {
            class A  {
                
                static foo() {
                    return this; // "this" SHOULD be late static, when invoked via B
                }
            }
            
            class B extends A {}
            
            // ---------------------------------------------------------------------- //
            
            const constructor = B.foo();
            
            expect(constructor)
                .withContext('Incorrect constructor')
                .toBe(B)
            
        });

    }); 
});