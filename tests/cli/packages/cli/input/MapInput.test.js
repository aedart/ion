import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { Argument, Option, MapInput, Definition } from "@aedart/cli";
import { ValueMode } from "@aedart/contracts/cli";

describe('@aedart/cli', () => {

    describe('input', () => {

        describe('map input', () => {
            
            it('can create input from map', () => {
                const definition = new Definition([
                    new Argument('name'),
                    new Argument('email'),
                    new Option('role'),
                    new Option('output', 'o')
                ]);

                const name = 'Sine';
                const email = 'sine@example.org';
                const role = 'editor';
                const output = true;

                // -------------------------------------------------------------- //

                const input = new MapInput(new Map([
                    ['name', name],
                    ['email', email],
                    ['--role', role],
                    ['-o', output],
                ]), definition);
                
                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //

                assert.equal(input.hasArgument('name'), true, 'Name argument does not exist');
                assert.deepEqual(input.getArgument('name'), name, 'Incorrect name');

                assert.equal(input.hasArgument('email'), true, 'Email argument does not exist');
                assert.deepEqual(input.getArgument('email'), email, 'Incorrect email');

                assert.equal(input.hasOption('role'), true, 'Role option does not exist');
                assert.deepEqual(input.getOption('role'), role, 'Incorrect role');

                assert.equal(input.hasOption('output'), true, 'Output option does not exist');
                assert.deepEqual(input.getOption('output'), output, 'Incorrect output');
            });

            it('does not process double dash', () => {
                const definition = new Definition([
                    new Argument('name'),
                ]);

                // -------------------------------------------------------------- //

                const input = new MapInput(new Map([
                    ['--', true], // THis should NOT be processed
                    ['name', 'John Doe'],
                ]), definition);

                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //

                assert.equal(input.hasArgument('--'), false, 'Double dash should NOT exist as argument');
                assert.equal(input.hasOption('--'), false, 'Double dash should NOT exist as option');
                
                assert.equal(input.hasArgument('name'), true, 'Name argument does not exist');
            });

            it('fails adding argument that is not defined', () => {
                const definition = new Definition([
                    new Argument('name'),
                ]);

                // -------------------------------------------------------------- //

                const input = new MapInput(new Map([
                    ['name', 'John Doe'],
                    ['foo', 'bar'], // not in definition...
                ]), definition);

                // -------------------------------------------------------------- //
                
                assert.throws(
                    () => {
                        input
                            .bind()
                            .validate();
                    },
                    {
                        name: 'TypeError',
                        message: 'The "foo" argument does not exist.'
                    }
                );
            });

            it('fails adding option via shortcut if its not defined', () => {
                const definition = new Definition([
                    new Option('name', 'n', ValueMode.REQUIRED),
                ]);

                // -------------------------------------------------------------- //

                const input = new MapInput(new Map([
                    ['-n', 'John Doe'],
                    ['-f', 'bar'], // not in definition...
                ]), definition);

                // -------------------------------------------------------------- //

                assert.throws(
                    () => {
                        input
                            .bind()
                            .validate();
                    },
                    {
                        name: 'TypeError',
                        message: 'The "-f" option does not exist.'
                    }
                );
            });

            it('can add option via negated name', () => {
                const definition = new Definition([
                    new Option('foo', 'f', ValueMode.NONE, '', true),
                ]);

                // -------------------------------------------------------------- //

                const input = new MapInput(new Map([
                    ['--no-foo', true],
                ]), definition);

                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //
                
                assert.equal(input.hasOption('foo'), true, '"foo" option does not exist');
                assert.deepEqual(input.getOption('foo'), false, 'incorrect value for foo option');
            });

            it('fails adding option via negated name if its not defined', () => {
                const definition = new Definition([
                    new Option('foo', 'f', ValueMode.NONE),
                ]);

                // -------------------------------------------------------------- //

                const input = new MapInput(new Map([
                    ['--no-foo', true],
                ]), definition);

                // -------------------------------------------------------------- //

                assert.throws(
                    () => {
                        input
                            .bind()
                            .validate();
                    },
                    {
                        name: 'TypeError',
                        message: 'The "--no-foo" option does not exist.'
                    }
                );
            });

            it('fails if option requires a value', () => {
                const definition = new Definition([
                    new Option('foo', 'f', ValueMode.REQUIRED),
                ]);

                // -------------------------------------------------------------- //

                const input = new MapInput(new Map([
                    ['-f', null], // null or undefined should cause "missing value" error...
                ]), definition);

                // -------------------------------------------------------------- //

                assert.throws(
                    () => {
                        input
                            .bind()
                            .validate();
                    },
                    {
                        name: 'TypeError',
                        message: 'The "--foo" option requires a value.'
                    }
                );
            });
        });
    });
});