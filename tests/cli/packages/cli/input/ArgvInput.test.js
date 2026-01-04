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
                
                // Dataset is from Symfony's test.
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
                    {
                        argv: [ '--foo', '', 'bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Argument('name')
                        ],
                        expected: {
                            foo: ''
                        },
                        name: 'long options with optional value (empty string), followed by argument'
                    },
                    {
                        argv: [ '--foo' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                        ],
                        expected: {
                            foo: null
                        },
                        name: 'long options with optional value, but no value or separator given'
                    },
                    {
                        argv: [ '--foo' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                        ],
                        expected: {
                            foo: null
                        },
                        name: 'long options with optional value, but no value or separator given'
                    },
                    {
                        argv: [ '-f' ],
                        definition: [
                            new Option('foo', 'f'),
                        ],
                        expected: {
                            foo: true
                        },
                        name: 'short options without value'
                    },
                    {
                        argv: [ '-fbar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.REQUIRED),
                        ],
                        expected: {
                            foo: 'bar'
                        },
                        name: 'short options with required value, no separator used'
                    },
                    {
                        argv: [ '-f', 'bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.REQUIRED),
                        ],
                        expected: {
                            foo: 'bar'
                        },
                        name: 'short options with required value, whitespace separator'
                    },
                    {
                        argv: [ '-f', '', 'bar' ],
                        definition: [
                            new Argument('name'),
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                        ],
                        expected: {
                            foo: ''
                        },
                        name: 'short options with optional value (empty), followed by an argument'
                    },
                    {
                        argv: [ '-f', '', '-b' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Option('bar', 'b'),
                        ],
                        expected: {
                            foo: '',
                            bar: true
                        },
                        name: 'short options with optional value (empty), followed by another option'
                    },
                    {
                        argv: [ '-f', '-b', 'foo' ],
                        definition: [
                            new Argument('name'),
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Option('bar', 'b'),
                        ],
                        expected: {
                            foo: null,
                            bar: true
                        },
                        name: 'short options with optional value (not provided), followed by another option and argument'
                    },
                    {
                        argv: [ '-fb' ],
                        definition: [
                            new Option('foo', 'f'),
                            new Option('bar', 'b'),
                        ],
                        expected: {
                            foo: true,
                            bar: true
                        },
                        name: 'short options that are aggregated'
                    },
                    {
                        argv: [ '-fb', 'bar' ],
                        definition: [
                            new Option('foo', 'f'),
                            new Option('bar', 'b', ValueMode.REQUIRED),
                        ],
                        expected: {
                            foo: true,
                            bar: 'bar'
                        },
                        name: 'short options that are aggregated, where last one required value'
                    },
                    {
                        argv: [ '-fb', 'bar' ],
                        definition: [
                            new Option('foo', 'f'),
                            new Option('bar', 'b', ValueMode.OPTIONAL),
                        ],
                        expected: {
                            foo: true,
                            bar: 'bar'
                        },
                        name: 'short options that are aggregated, where last one has optional value'
                    },
                    {
                        argv: [ '-fbbar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Option('bar', 'b', ValueMode.OPTIONAL),
                        ],
                        expected: {
                            foo: 'bbar', // well... this cannot be avoided in this case...
                            bar: null
                        },
                        name: 'short options that are aggregated, where both are set to optional value mode'
                    },
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

            it('can parse negatable options', () => {

                // Dataset is from Symfony's test.
                // @see https://github.com/symfony/console/blob/7.1/Tests/Input/ArgvInputTest.php#L189

                const data = [
                    {
                        argv: [ '--foo' ],
                        definition: [
                            new Option('foo', [], ValueMode.NONE, '', true)
                        ],
                        expected: {
                            foo: true
                        },
                        name: 'long options without value'
                    },
                    {
                        argv: [ '--no-foo' ],
                        definition: [
                            new Option('foo', [], ValueMode.NONE, '', true)
                        ],
                        expected: {
                            foo: false
                        },
                        name: 'long negated options without value'
                    },
                    {
                        argv: [ ],
                        definition: [
                            new Option('foo', [], ValueMode.NONE, '', true)
                        ],
                        expected: {
                            foo: null
                        },
                        name: 'long options without value allowed, but not provided in argv'
                    },
                    {
                        argv: [ ],
                        definition: [
                            (new Option('foo', [], ValueMode.NONE, '', true)).setDefault(false)
                        ],
                        expected: {
                            foo: false
                        },
                        name: 'long options (with default value), but is not provided in argv'
                    },
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

            it('can handle invalid input', () => {

                // Dataset is from Symfony's test.
                // @see https://github.com/symfony/console/blob/7.1/Tests/Input/ArgvInputTest.php#L259

                const data = [
                    {
                        argv: [ '--foo' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.REQUIRED)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "--foo" option requires a value.'
                        },
                    },
                    {
                        argv: [ '-f' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.REQUIRED)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "--foo" option requires a value.'
                        },
                    },
                    {
                        argv: [ '-ffoo' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.NONE)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "-o" option does not exist.'
                        },
                    },
                    {
                        argv: [ '--foo=bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.NONE)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "--foo" option does not accept a value.'
                        },
                    },
                    {
                        argv: [ 'foo', 'bar' ],
                        definition: [
                            // N/A
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'No arguments expected, got "foo".'
                        },
                    },
                    {
                        argv: [ 'foo', 'bar' ],
                        definition: [
                            new Argument('name')
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'Too many arguments, expected arguments "name".'
                        },
                    },
                    {
                        argv: [ 'foo', 'bar', 'zar' ],
                        definition: [
                            new Argument('name'),
                            new Argument('email'),
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'Too many arguments, expected arguments "name" "email".'
                        },
                    },
                    {
                        argv: [ '--foo' ],
                        definition: [
                            // N/A
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "--foo" option does not exist.'
                        },
                    },
                    {
                        argv: [ '-f' ],
                        definition: [
                            // N/A
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "-f" option does not exist.'
                        },
                    },
                    {
                        argv: [ '-1' ],
                        definition: [
                            new Argument('name')
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "-1" option does not exist.'
                        },
                    },
                    {
                        argv: [ '-fЩ' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.NONE)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "-Щ" option does not exist.'
                        },
                    },
                    {
                        argv: [ 'acme:foo', 'bar' ],
                        definition: [
                            new Argument('command', '', true)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'No arguments expected for "acme:foo" command, got "bar".'
                        },
                    },
                    {
                        argv: [ 'acme:foo', 'bar' ],
                        definition: [
                            new Argument('name', '', true)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'Too many arguments, expected arguments "name".'
                        },
                    },
                ];

                // -------------------------------------------------------------- //

                for (const entry of data) {
                    const argv = [
                        '/usr/bin/node',
                        '/home/code/cli.js',
                    ].concat(entry.argv);

                    const input = new ArgvInput(argv, new Definition(entry.definition));

                    assert.throws(
                        () => {
                            input
                                .bind()
                                .validate();
                        },
                        {
                            name: entry.expected.name,
                            message: entry.expected.message
                        }
                    );
                }
            });

            it('can handle invalid negatable input', () => {

                // Dataset is from Symfony's test.
                // @see https://github.com/symfony/console/blob/7.1/Tests/Input/ArgvInputTest.php#L330

                const data = [
                    {
                        argv: [ '--no-foo=bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.NONE, '', true)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "--no-foo" option does not accept a value.'
                        },
                    },
                    {
                        argv: [ '--no-foo=' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.NONE, '', true)
                        ],
                        expected: {
                            name: 'TypeError',
                            message: 'The "--no-foo" option does not accept a value.'
                        },
                    },
                ];

                // -------------------------------------------------------------- //

                for (const entry of data) {
                    const argv = [
                        '/usr/bin/node',
                        '/home/code/cli.js',
                    ].concat(entry.argv);

                    const input = new ArgvInput(argv, new Definition(entry.definition));

                    assert.throws(
                        () => {
                            input
                                .bind()
                                .validate();
                        },
                        {
                            name: entry.expected.name,
                            message: entry.expected.message
                        }
                    );
                }
            });

            it('can parse array value for argument', () => {
                const input = new ArgvInput(
                    [
                        '/usr/bin/node',
                        '/home/code/cli.js',
                        'foo',
                        'bar',
                        'baz',
                        'zin'
                    ],
                    new Definition([
                        new Argument('name', '', true, true)
                    ])
                );
                
                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //
                
                assert.deepEqual(input.getArgument('name'), [ 'foo', 'bar', 'baz', 'zin' ], 'Incorrect array value for argument');
            });

            it('can parse options with array values', () => {

                // Dataset is from Symfony's test.
                // @see https://github.com/symfony/console/blob/7.1/Tests/Input/ArgvInputTest.php#L364

                const data = [
                    {
                        argv: [ '--name=foo', '--name=bar', '--name=baz' ],
                        definition: [
                            new Option('name', [], ValueMode.OPTIONAL, '', false, true)
                        ],
                        expected: {
                            name: [ 'foo', 'bar', 'baz' ]
                        },
                        name: 'long options with optional value (using "=" separator)'
                    },
                    {
                        argv: [ '--name', 'foo', '--name', 'bar', '--name', 'baz' ],
                        definition: [
                            new Option('name', [], ValueMode.OPTIONAL, '', false, true)
                        ],
                        expected: {
                            name: [ 'foo', 'bar', 'baz' ]
                        },
                        name: 'long options with optional value (using whitespace separator)'
                    },
                    {
                        argv: [ '--name=foo', '--name=bar', '--name=' ],
                        definition: [
                            new Option('name', [], ValueMode.OPTIONAL, '', false, true)
                        ],
                        expected: {
                            name: [ 'foo', 'bar', '' ]
                        },
                        name: 'long options with optional value (using "=" separator) where last element has empty value'
                    },
                    {
                        argv: [ '--name', 'foo', '--name', 'bar', '--name', '--other' ],
                        definition: [
                            new Option('name', [], ValueMode.OPTIONAL, '', false, true),
                            new Option('other', [], ValueMode.NONE)
                        ],
                        expected: {
                            name: [ 'foo', 'bar', null ],
                            other: true
                        },
                        name: 'long options with optional value (using whitespace separator), followed by another option'
                    },
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

            it('can parse negative values after double dash', () => {
                const input = new ArgvInput(
                    [
                        '/usr/bin/node',
                        '/home/code/cli.js',
                        '-f',
                        'bar',
                        '--',
                        '-1',
                    ],
                    new Definition([
                        new Argument('name'),
                        new Option('foo', 'f', ValueMode.OPTIONAL)
                    ])
                );

                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //

                assert.deepEqual(input.getArgument('name'), -1, 'Incorrect array value for argument');
                assert.deepEqual(input.getOption('foo'), 'bar', 'Incorrect array value for option');
            });

            it('can parse empty value for argument', () => {
                const input = new ArgvInput(
                    [
                        '/usr/bin/node',
                        '/home/code/cli.js',
                        '-f',
                        'bar',
                        '',
                    ],
                    new Definition([
                        new Argument('name'),
                        new Option('foo', 'f', ValueMode.OPTIONAL)
                    ])
                );

                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //

                assert.deepEqual(input.getArgument('name'), '', 'Incorrect array value for argument');
                assert.deepEqual(input.getOption('foo'), 'bar', 'Incorrect array value for option');
            });

            it('can parse single dash value for argument', () => {
                const input = new ArgvInput(
                    [
                        '/usr/bin/node',
                        '/home/code/cli.js',
                        '-',
                    ],
                    new Definition([
                        new Argument('name'),
                    ])
                );

                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //

                assert.deepEqual(input.getArgument('name'), '-', 'Incorrect array value for argument');
            });

            it('can parse options and arguments', () => {

                // Dataset is from Symfony's test.
                // @see https://github.com/symfony/console/blob/7.1/Tests/Input/ArgvInputTest.php#L540
                // @see https://github.com/symfony/console/blob/7.1/Tests/Input/ArgvInputTest.php#L553

                const data = [
                    {
                        argv: [ '--foo=', 'bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Argument('name')
                        ],
                        expected: {
                            arguments: {
                                name: 'bar'
                            },
                            options: {
                                foo: '' // Original source code expects null. But given the differences of PHP and
                                        // JavaScript "array shift" values results in an empty string here! 
                            },
                        },
                        name: 'option with value (optional), with empty value and required argument'
                    },
                    {
                        argv: [ '--foo=', 'bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Argument('name', '', false)
                        ],
                        expected: {
                            arguments: {
                                name: 'bar'
                            },
                            options: {
                                foo: '' // Original source code expects null. But given the differences of PHP and
                                        // JavaScript "array shift" values results in an empty string here! 
                            },
                        },
                        name: 'option with value (optional), with empty value and optional argument'
                    },
                    {
                        argv: [ '--foo=0', 'bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Argument('name')
                        ],
                        expected: {
                            arguments: {
                                name: 'bar'
                            },
                            options: {
                                foo: 0
                            },
                        },
                        name: 'option with value (optional), with zero (0) as value and required argument'
                    },
                    {
                        argv: [ '--foo=0', 'bar' ],
                        definition: [
                            new Option('foo', 'f', ValueMode.OPTIONAL),
                            new Argument('name', '', false)
                        ],
                        expected: {
                            arguments: {
                                name: 'bar'
                            },
                            options: {
                                foo: 0
                            },
                        },
                        name: 'option with value (optional), with zero (0) as value and optional argument'
                    },
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

                    for (const [key, value] of Object.entries(entry.expected.arguments)) {
                        assert.equal(input.hasArgument(key), true, `option "${key}" does not exist, in "${entry.name}"`);
                        assert.deepEqual(input.getArgument(key), value, `incorrect value for option "${key}", in "${entry.name}"`);
                    }
                    for (const [key, value] of Object.entries(entry.expected.options)) {
                        assert.equal(input.hasOption(key), true, `option "${key}" does not exist, in "${entry.name}"`);
                        assert.deepEqual(input.getOption(key), value, `incorrect value for option "${key}", in "${entry.name}"`);
                    }
                }
            });

            it('can obtain "raw" tokens', () => {
                const input = new ArgvInput([
                    '/usr/bin/node',
                    '/home/code/cli.js',
                    
                    '--foo',
                    '-o',
                    'bar'
                ]);
                
                assert.deepEqual(input.rawTokens, [ '--foo', '-o', 'bar' ], 'Incorrect raw tokens');
            });
        });
    });
});