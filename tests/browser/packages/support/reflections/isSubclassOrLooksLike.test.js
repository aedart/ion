import { isSubclassOrLooksLike } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('isSubclassOrLooksLike()', () => {

        it('can determine if target is subclass or looks like blueprint', () => {

            class A {
                foo() {}
            }
            class B extends A{}
            
            class C {
                foo() {}
            }
            
            // --------------------------------------------------------------------------------------- //

            const data = [
                {
                    target: B,
                    superclass: A,
                    blueprint: {
                        staticMembers: [],
                        members: []
                    },
                    expected: true,
                    name: 'B (should be superclass of A)'
                },
                {
                    target: C,
                    superclass: A,
                    blueprint: {
                        staticMembers: [],
                        members: [ 'foo' ]
                    },
                    expected: true,
                    name: 'C (should "look like" class A)'
                },
                {
                    target: C,
                    superclass: B,
                    blueprint: {
                        staticMembers: [],
                        members: [ 'bar' ]
                    },
                    expected: false,
                    name: 'C (should "look like" class B or contain member)'
                },
            ];

            for (const entry of data) {
                expect(isSubclassOrLooksLike(entry.target, entry.superclass, entry.blueprint))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });
    });
});