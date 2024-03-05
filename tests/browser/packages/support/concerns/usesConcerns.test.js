import {usesConcerns, AbstractConcern, use} from "@aedart/support/concerns";

describe('@aedart/support/concerns', () => {
    describe('usesConcerns()', () => {

        it('can determine if target instance uses concerns', () => {

            class ConcernA extends AbstractConcern {}
            class ConcernB extends AbstractConcern {}
            class ConcernC extends AbstractConcern {}
            
            class ConcernD extends AbstractConcern {}
            
            class A {}

            @use(
                ConcernA,
                ConcernB
            )
            class B {}

            @use(ConcernC)
            class C extends B {}

            // ------------------------------------------------------------------------------------ //

            const data = [
                { instance: null, concerns: [], expected: false, name: 'Null' },
                { instance: [], concerns: [], expected: false, name: 'Array' },
                { instance: {}, concerns: [], expected: false, name: 'Object (empty)' },
                { instance: A, concerns: [], expected: false, name: 'Class A (empty)' },
                { instance: new A(), concerns: [ ConcernA ], expected: false, name: 'A' },
                { instance: new C(), concerns: [], expected: false, name: 'C, concerns: (empty)' },
                
                { instance: new C(), concerns: [ ConcernA ], expected: true, name: 'C, concerns: a' },
                { instance: new C(), concerns: [ ConcernB ], expected: true, name: 'C, concerns: b' },
                { instance: new C(), concerns: [ ConcernC ], expected: true, name: 'C, concerns: c' },
                { instance: new C(), concerns: [ ConcernA, ConcernB ], expected: true, name: 'C, concerns: a, b' },
                { instance: new C(), concerns: [ ConcernA, ConcernB, ConcernC ], expected: true, name: 'C, concerns: a, b, c' },
                
                { instance: new C(), concerns: [ ConcernA, ConcernB, ConcernC, ConcernD ], expected: false, name: 'C instance, concerns: a, b, c and d (not used)' },
            ];

            for (const entry of data) {
                expect(usesConcerns(entry.instance, ...entry.concerns))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });

    });
});