import { reflect } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {

    describe('misc', () => {

        it('fails when attempting to reflect unsupported class elements', () => {
            
            const callback = function() {

                class A {
                    @reflect()
                    foo = 'bar';
                }

                return new A();
            }

            expect(callback)
                .withContext('Should not support reflect on unsupported class element')
                .toThrowError(TypeError);
        });
    });
});