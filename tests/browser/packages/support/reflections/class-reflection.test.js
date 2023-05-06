import { reflect, getReflection } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {

    describe('class', () => {

        it('can reflect class', () => {

            @reflect()
            class A {}

            const reflection = getReflection(A);
            
            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('A');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('class');

            expect(reflection.private)
                .withContext('Element private visibility incorrect')
                .toBeFalse();

            expect(reflection.static)
                .withContext('Element static declaration incorrect')
                .toBeFalse();

            expect(reflection.target)
                .withContext('Element target incorrect')
                .toEqual(A);

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(A);
        });

        it('inherits class reflection', () => {

            @reflect()
            class A {}
            class B extends A {}
            class C extends B {}
            
            const reflection = getReflection(C);

            expect(reflection)
                .withContext('No reflection found for target')
                .not
                .toBeUndefined();

            expect(reflection.name)
                .withContext('Element name incorrect')
                .toEqual('C');

            expect(reflection.kind)
                .withContext('Element kind incorrect')
                .toEqual('class');

            expect(reflection.target)
                .withContext('Element target incorrect')
                .toEqual(C);

            expect(reflection.owner)
                .withContext('Element owner incorrect')
                .toEqual(C);
        });
        
    });
});