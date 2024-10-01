import { Application } from "@aedart/core";

describe('@aedart/core', () => {
    describe('bootstrap', () => {

        it('application can be bootstrapped', () => {
            
            const bootstrapped = [];
            
            class A {
                bootstrap() { bootstrapped.push('a'); }
            }

            class B {
                bootstrap() { bootstrapped.push('b'); }
            }

            class C {
                bootstrap() { bootstrapped.push('c'); }
            }
            
            const app = new Application();

            // ------------------------------------------------------------------------------- //
            
            const before = app.hasBootstrapped();
            
            app.bootstrap([ A, B, C ]);
            
            const after = app.hasBootstrapped();

            // ------------------------------------------------------------------------------- //
            
            expect(before)
                .withContext('Application should NOT have been bootstrapped (before)')
                .toBeFalse();

            expect(after)
                .withContext('Application should have been bootstrapped (after)')
                .toBeTrue();
            
            expect(bootstrapped.length)
                .withContext('Incorrect amount of bootstrappers invoked')
                .toBe(3);
            
            expect(bootstrapped)
                .withContext('Incorrect bootstrappers invoked')
                .toEqual([ 'a', 'b', 'c' ]);
        });
    });
});