import { dependsOn, hasDependencies, getDependencies} from "@aedart/support/container";

describe('@aedart/support/container', () => {
    describe('@dependsOn', () => {

        it('can defined dependencies for class', () => {
            const dependencies = [ 'a', 'b', 123 ];
            
            @dependsOn(...dependencies)
            class A {}
            
            // ---------------------------------------------------------------- //
            
            expect(hasDependencies(A))
                .withContext('No dependencies defined')
                .toBeTrue();
            
            expect(getDependencies(A))
                .withContext('Incorrect dependencies for target')
                .toEqual(dependencies);
        });

        it('can defined dependencies for class method', () => {
            const dependencies = [ 'foo', 'bar', {} ];

            class A {

                @dependsOn(...dependencies)
                index(a, b, c) {}
            }

            // ---------------------------------------------------------------- //

            const instance = new A();
            const target = instance.index;
            
            expect(hasDependencies(target))
                .withContext('No dependencies defined')
                .toBeTrue();

            expect(getDependencies(target))
                .withContext('Incorrect dependencies for target')
                .toEqual(dependencies);
        });
    }); 
});