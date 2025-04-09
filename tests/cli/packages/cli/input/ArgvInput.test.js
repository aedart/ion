import { describe, it } from 'node:test';
import * as assert from "node:assert";
import process from "node:process";
import { ArgvInput, Argument, Option, Definition } from "@aedart/cli";
import { ValueMode } from "@aedart/contracts/cli";

describe('@aedart/cli', () => {

    describe('input', () => {

        describe('argv input', () => {

            it('defaults to process.argv when none provided in constructor', () => {
                // WARNING: This should NEVER be done in a production environment!
                const originalArgv = process.argv; 
                process.argv = [
                    '/usr/bin/node',
                    '/home/code/cli.js',
                    'foo'
                ];
                
                const input = new ArgvInput();
                
                // NOTE: first two args should automatically be removed...
                assert.deepEqual(input.rawTokens, [ 'foo' ], 'process.argv is NOT used in constructor');
                
                // Restore the original process.argv
                process.argv = originalArgv;
            });

            it('can parse arguments', () => {
                const definition = new Definition([
                    new Argument('name'),
                    new Argument('email'),                    
                ]);

                const name = 'Sine';
                const email = 'sine@example.org';

                // -------------------------------------------------------------- //

                const input = new ArgvInput([
                    '/usr/bin/node',
                    '/home/code/cli.js',
                    name,
                    email
                ], definition);

                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //

                assert.equal(input.hasArgument('name'), true, 'Name argument does not exist');
                assert.deepEqual(input.getArgument('name'), name, 'Incorrect name');

                assert.equal(input.hasArgument('email'), true, 'Email argument does not exist');
                assert.deepEqual(input.getArgument('email'), email, 'Incorrect email');
            });

            it('can parse options', () => {
                
                // Dataset inspired by Symfony's test.
                // @see https://github.com/symfony/console/blob/7.1/Tests/Input/ArgvInputTest.php#L63
                
                const data = [
                    {
                        argv: [ '--foo' ],
                        definition: [
                            new Option('foo')
                        ],
                        expected: {
                            foo: true
                        },
                        name: 'long options without value'
                    },
                    {
                        argv: [ '--foo=bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.REQUIRED)
                        ],
                        expected: {
                            foo: 'bar'
                        },
                        name: 'long options with required value and "=" separator'
                    },
                    {
                        argv: [ '--foo', 'bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.REQUIRED)
                        ],
                        expected: {
                            foo: 'bar'
                        },
                        name: 'long options with required value and whitespace separator'
                    },
                    {
                        argv: [ '--foo=' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL)
                        ],
                        expected: {
                            foo: ''
                        },
                        name: 'long options with optional value (empty) and "=" separator'
                    },
                    {
                        argv: [ '--foo=', 'bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Argument('name')
                        ],
                        expected: {
                            foo: ''
                        },
                        name: 'long options with optional value (empty) and "=" separator, followed by argument'
                    },
                    {
                        argv: [ 'bar', '--foo' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Argument('name')
                        ],
                        expected: {
                            foo: null
                        },
                        name: 'long options with optional value (empty) and "=" separator, preceded by argument'
                    },
                    
                    // TODO: NEXT: "->parse() parses long options with optional value which is empty as empty string even followed by an argument"
                ];

                // -------------------------------------------------------------- //
                
                for (const entry of data) {
                    const argv = [
                        '/usr/bin/node',
                        '/home/code/cli.js',
                    ].concat(entry.argv);
                    
                    const input = new ArgvInput(argv, new Definition(entry.definition));
                    
                    input
                        .bind()
                        .validate();
                    
                    for (const [key, value] of Object.entries(entry.expected)) {
                        assert.equal(input.hasOption(key), true, `option "${key}" does not exist, in "${entry.name}"`);
                        assert.deepEqual(input.getOption(key), value, `incorrect value for option "${key}", in "${entry.name}"`);
                    }
                }
            });

            // it('can create input from map', () => {
            //     const definition = new Definition([
            //         new Argument('name'),
            //         new Argument('email'),
            //         new Option('role'),
            //         new Option('output', 'o')
            //     ]);
            //
            //     const name = 'Sine';
            //     const email = 'sine@example.org';
            //     const role = 'editor';
            //     const output = true;
            //
            //     // -------------------------------------------------------------- //
            //
            //     const input = new MapInput(new Map([
            //         ['name', name],
            //         ['email', email],
            //         ['--role', role],
            //         ['-o', output],
            //     ]), definition);
            //
            //     input
            //         .bind()
            //         .validate();
            //
            //     // -------------------------------------------------------------- //
            //
            //     assert.equal(input.hasArgument('name'), true, 'Name argument does not exist');
            //     assert.deepEqual(input.getArgument('name'), name, 'Incorrect name');
            //
            //     assert.equal(input.hasArgument('email'), true, 'Email argument does not exist');
            //     assert.deepEqual(input.getArgument('email'), email, 'Incorrect email');
            //
            //     assert.equal(input.hasOption('role'), true, 'Role option does not exist');
            //     assert.deepEqual(input.getOption('role'), role, 'Incorrect role');
            //
            //     assert.equal(input.hasOption('output'), true, 'Output option does not exist');
            //     assert.deepEqual(input.getOption('output'), output, 'Incorrect output');
            // });
            //
            // it('does not process double dash', () => {
            //     const definition = new Definition([
            //         new Argument('name'),
            //     ]);
            //
            //     // -------------------------------------------------------------- //
            //
            //     const input = new MapInput(new Map([
            //         ['--', true], // THis should NOT be processed
            //         ['name', 'John Doe'],
            //     ]), definition);
            //
            //     input
            //         .bind()
            //         .validate();
            //
            //     // -------------------------------------------------------------- //
            //
            //     assert.equal(input.hasArgument('--'), false, 'Double dash should NOT exist as argument');
            //     assert.equal(input.hasOption('--'), false, 'Double dash should NOT exist as option');
            //
            //     assert.equal(input.hasArgument('name'), true, 'Name argument does not exist');
            // });
            //
            // it('fails adding argument that is not defined', () => {
            //     const definition = new Definition([
            //         new Argument('name'),
            //     ]);
            //
            //     // -------------------------------------------------------------- //
            //
            //     const input = new MapInput(new Map([
            //         ['name', 'John Doe'],
            //         ['foo', 'bar'], // not in definition...
            //     ]), definition);
            //
            //     // -------------------------------------------------------------- //
            //
            //     assert.throws(
            //         () => {
            //             input
            //                 .bind()
            //                 .validate();
            //         },
            //         {
            //             name: 'TypeError',
            //             message: 'The "foo" argument does not exist.'
            //         }
            //     );
            // });
            //
            // it('fails adding option via shortcut if its not defined', () => {
            //     const definition = new Definition([
            //         new Option('name', 'n', ValueMode.REQUIRED),
            //     ]);
            //
            //     // -------------------------------------------------------------- //
            //
            //     const input = new MapInput(new Map([
            //         ['-n', 'John Doe'],
            //         ['-f', 'bar'], // not in definition...
            //     ]), definition);
            //
            //     // -------------------------------------------------------------- //
            //
            //     assert.throws(
            //         () => {
            //             input
            //                 .bind()
            //                 .validate();
            //         },
            //         {
            //             name: 'TypeError',
            //             message: 'The "-f" option does not exist.'
            //         }
            //     );
            // });
            //
            // it('can add option via negated name', () => {
            //     const definition = new Definition([
            //         new Option('foo', 'f', ValueMode.NONE, '', true),
            //     ]);
            //
            //     // -------------------------------------------------------------- //
            //
            //     const input = new MapInput(new Map([
            //         ['--no-foo', true],
            //     ]), definition);
            //
            //     input
            //         .bind()
            //         .validate();
            //
            //     // -------------------------------------------------------------- //
            //
            //     assert.equal(input.hasOption('foo'), true, '"foo" option does not exist');
            //     assert.deepEqual(input.getOption('foo'), false, 'incorrect value for foo option');
            // });
            //
            // it('fails adding option via negated name if its not defined', () => {
            //     const definition = new Definition([
            //         new Option('foo', 'f', ValueMode.NONE),
            //     ]);
            //
            //     // -------------------------------------------------------------- //
            //
            //     const input = new MapInput(new Map([
            //         ['--no-foo', true],
            //     ]), definition);
            //
            //     // -------------------------------------------------------------- //
            //
            //     assert.throws(
            //         () => {
            //             input
            //                 .bind()
            //                 .validate();
            //         },
            //         {
            //             name: 'TypeError',
            //             message: 'The "--no-foo" option does not exist.'
            //         }
            //     );
            // });
            //
            // it('fails if option requires a value', () => {
            //     const definition = new Definition([
            //         new Option('foo', 'f', ValueMode.REQUIRED),
            //     ]);
            //
            //     // -------------------------------------------------------------- //
            //
            //     const input = new MapInput(new Map([
            //         ['-f', null], // null or undefined should cause "missing value" error...
            //     ]), definition);
            //
            //     // -------------------------------------------------------------- //
            //
            //     assert.throws(
            //         () => {
            //             input
            //                 .bind()
            //                 .validate();
            //         },
            //         {
            //             name: 'TypeError',
            //             message: 'The "--foo" option requires a value.'
            //         }
            //     );
            // });
        });
    });
});