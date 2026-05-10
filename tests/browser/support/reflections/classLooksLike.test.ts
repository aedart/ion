import { classLooksLike } from '@aedart/support/reflections';
import { describe, expect, test } from 'vitest';

describe('@aedart/support/refelctions', () => {
    describe('classLooksLike', () => {
        test('fails if blueprint has no members or static members property defined', () => {
            class A
            {}

            const callback = () => {
                classLooksLike(A, {});
            };

            expect(callback)
                .toThrow(TypeError);
        });

        test('fail when empty members property is defined in blueprint', () => {
            class A
            {}

            const callback = () => {
                classLooksLike(A, { members: [] });
            };

            expect(callback)
                .toThrow(TypeError);
        });

        test('fail when empty static members property is defined in blueprint', () => {
            class A
            {}

            const callback = () => {
                classLooksLike(A, { staticMembers: [] });
            };

            expect(callback)
                .toThrow(TypeError);
        });

        test('can determine if class looks like blueprint', () => {
            class A
            {
                foo()
                {/* empty */}

                bar()
                {/* empty */}

                static sayHi()
                {/* empty */}
            }

            class B extends A
            {
                get zim() {
                    return 'sweet ' + new Date().getTime();
                }

                static goodBye()
                {
                    return 'good bye';
                }
            }

            // --------------------------------------------------------------------------------------- //

            const data = [
                {
                    target: A,
                    blueprint: {
                        members: [
                            'foo',
                            'bar',
                            'zim', // does not exist in A
                        ],
                    },
                    expected: false,
                    name: 'A (member that does not exist)',
                },
                {
                    target: A,
                    blueprint: {
                        members: [
                            'bar',
                            'foo',
                        ],
                    },
                    expected: true,
                    name: 'A (all members that exist)',
                },
                {
                    target: A,
                    blueprint: {
                        staticMembers: [
                            'sayHi',
                            'goodBye', // does not exist in A
                        ],
                        members: [
                            'bar',
                            'foo',
                        ],
                    },
                    expected: false,
                    name: 'A (static member that does not exist)',
                },
                {
                    target: B,
                    blueprint: {
                        members: [
                            'foo', // inherited
                            'bar', // inherited
                            'zim',
                        ],
                    },
                    expected: true,
                    name: 'B (inherited members that exist)',
                },
                {
                    target: B,
                    blueprint: {
                        staticMembers: [
                            'sayHi', // inherited
                            'goodBye',
                        ],
                        members: [
                            // Should just be ignored
                        ],
                    },
                    expected: true,
                    name: 'B (inherited static members that exist)',
                },
                {
                    target: B,
                    blueprint: {
                        staticMembers: [
                            'sayHi', // inherited
                            'goodBye',
                        ],
                        members: [
                            'foo', // inherited
                            'bar', // inherited
                            'zim',
                        ],
                    },
                    expected: true,
                    name: 'B (inherited all members that exist)',
                },
                // This will fail, since no members defined in blueprint!
                // {
                //     target: B,
                //     blueprint: {
                //         staticMembers: [],
                //         members: []
                //     },
                //     expected: false,
                //     name: 'B (empty blueprint)'
                // },
            ];

            for (const entry of data) {
                expect(
                    classLooksLike(entry.target, entry.blueprint),
                    `${entry.name} was expected to ${entry.expected.toString()}`,
                )
                    .toBe(entry.expected);
            }
        });

        test('can determine if target is T (type), in TypeScript', () => {
            interface MyInterface {
                foo: string;

                bar(): void;
            }

            // NOTE: Do not "implement" interface in TS, for this test...
            class A /*implements MyInterface*/
            {
                get foo(): string {
                    return 'foo ' + new Date().getTime();
                }

                bar(): void
                {
                    return;
                }
            }

            const result = classLooksLike<MyInterface>(A, { members: ['foo', 'bar'] });
            expect(result)
                .toBeTruthy();
        });
    });
});
