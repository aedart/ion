import { classLooksLike } from "@aedart/support/reflections";

describe('@aedart/support/reflections', () => {
    describe('classLooksLike()', () => {

        it('fails if blueprint has no members or static members property defined', () => {
            class A {}

            const callback = () => {
                classLooksLike(A, { });    
            }
            
            expect(callback)
                .toThrowError(TypeError);
        });

        it('does not fail when members property is defined in blueprint', () => {
            class A {}

            const callback = () => {
                classLooksLike(A, { members: [] });
            }

            expect(callback)
                .not
                .toThrowError(TypeError);
        });

        it('does not fail when static members property is defined in blueprint', () => {
            class A {}

            const callback = () => {
                classLooksLike(A, { staticMembers: [] });
            }

            expect(callback)
                .not
                .toThrowError(TypeError);
        });
        
        it('can determine if class looks like blueprint', () => {

            class A {
                foo() {}
                
                bar() {}
                
                static sayHi() {}
            }
            
            class B extends A {
                
                get zim() {}

                static goodBye() {}
            }
            
            // --------------------------------------------------------------------------------------- //

            const data = [
                {
                    target: A,
                    blueprint: {
                        members: [
                            'foo',
                            'bar',
                            'zim' // does not exist in A
                        ]
                    },
                    expected: false,
                    name: 'A (member that does not exist)'
                },
                {
                    target: A,
                    blueprint: {
                        members: [
                            'bar',
                            'foo',
                        ]
                    },
                    expected: true,
                    name: 'A (all members that exist)'
                },
                {
                    target: A,
                    blueprint: {
                        staticMembers: [
                            'sayHi',
                            'goodBye' // does not exist in A
                        ],
                        members: [
                            'bar',
                            'foo',
                        ]
                    },
                    expected: false,
                    name: 'A (static member that does not exist)'
                },
                {
                    target: B,
                    blueprint: {
                        members: [
                            'foo', // inherited
                            'bar', // inherited
                            'zim'
                        ]
                    },
                    expected: true,
                    name: 'B (inherited members that exist)'
                },
                {
                    target: B,
                    blueprint: {
                        staticMembers: [
                            'sayHi', // inherited
                            'goodBye'
                        ],
                        members: [
                            // Should just be ignored
                        ]
                    },
                    expected: true,
                    name: 'B (inherited static members that exist)'
                },
                {
                    target: B,
                    blueprint: {
                        staticMembers: [
                            'sayHi', // inherited
                            'goodBye'
                        ],
                        members: [
                            'foo', // inherited
                            'bar', // inherited
                            'zim'
                        ]
                    },
                    expected: true,
                    name: 'B (inherited all members that exist)'
                },
                {
                    target: B,
                    blueprint: {
                        staticMembers: [],
                        members: []
                    },
                    expected: false,
                    name: 'B (empty blueprint)'
                },
            ];

            for (const entry of data) {
                expect(classLooksLike(entry.target, entry.blueprint))
                    .withContext(`${entry.name} was expected to ${entry.expected.toString()}`)
                    .toBe(entry.expected);
            }
        });
        
    });
});