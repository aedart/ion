import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { Argument, Option, BaseInput, Definition } from "@aedart/cli";
import { ValueMode } from "@aedart/contracts/cli";
import DummyInput from "../helpers/input/DummyInput.js";

describe('@aedart/cli', () => {

    describe('input', () => {

        describe('base-input', () => {

            it('fails creating new instance of abstract BaseInput', () => {
                assert.throws(
                    () => {
                        new BaseInput()
                    },
                    {
                        name: 'AbstractClassError'
                    }
                );
            });
            
            it('can bind input definition', () => {
                const definition = new Definition([
                    new Argument('name'),
                    new Argument('email'),
                    new Option('role')
                ]);
                
                const name = 'Sine';
                const email = 'sine@example.org';
                const role = 'editor';

                const rawArgs = new Map([
                    ['name', name],
                    ['email', email],
                ]);

                const rawOpts = new Map([
                    ['role', role]
                ]);
                
                // -------------------------------------------------------------- //
                
                const input = new DummyInput(rawArgs, rawOpts, definition);
                input.bind();

                // -------------------------------------------------------------- //
                
                assert.equal(input.hasArgument('name'), true, 'Name argument does not exist');
                assert.deepEqual(input.getArgument('name'), name, 'Incorrect name');
                
                assert.equal(input.hasArgument('email'), true, 'Email argument does not exist');
                assert.deepEqual(input.getArgument('email'), email, 'Incorrect email');
                
                assert.equal(input.hasOption('role'), true, 'Role option does not exist');
                assert.deepEqual(input.getOption('role'), role, 'Incorrect role');
            });

            it('can bind and validate input definition', () => {
                const definition = new Definition([
                    new Argument('name', '', true),
                    new Argument('email', '', true),
                    new Option('role')
                ]);

                const name = 'Sven';
                const email = 'sven@example.org';
                const role = 'admin';

                const rawArgs = new Map([
                    ['name', name],
                    ['email', email],
                ]);

                const rawOpts = new Map([
                    ['role', role]
                ]);

                // -------------------------------------------------------------- //

                const input = new DummyInput(rawArgs, rawOpts, definition);
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
            });

            it('returns default values for arguments and options when not provided', () => {
                const name = 'Sabrina';
                const role = 'secretary';
                
                const definition = new Definition([
                    (new Argument('name', '', false)).setDefault(name),
                    (new Option('role', 'r', ValueMode.OPTIONAL)).setDefault(role)
                ]);
                
                const rawArgs = new Map();
                const rawOpts = new Map();

                // -------------------------------------------------------------- //

                const input = new DummyInput(rawArgs, rawOpts, definition);
                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //

                assert.equal(input.hasArgument('name'), true, 'Name argument does not exist');
                assert.deepEqual(input.getArgument('name'), name, 'Incorrect name');

                assert.equal(input.hasOption('role'), true, 'Role option does not exist');
                assert.deepEqual(input.getOption('role'), role, 'Incorrect role');
            });
            
            it('fails when required arguments are not provided', () => {

                const definition = new Definition([
                    new Argument('name', '', true),
                    new Argument('email', '', true),
                    new Option('role')
                ]);

                const name = 'Jimmy';
                const role = 'editor';

                const rawArgs = new Map([
                    ['name', name],
                    // ['email', email], // Missing arg. should cause validation error
                ]);

                const rawOpts = new Map([
                    ['role', role]
                ]);
                
                // -------------------------------------------------------------- //
                
                assert.throws(
                    () => {
                        const input = new DummyInput(rawArgs, rawOpts, definition);
                        input
                            .bind()
                            .validate();
                    },
                    {
                        name: 'TypeError',
                        message: 'Missing required arguments: email.',
                    }
                );
            });

            it('fails when provided with unknown argument', () => {

                const definition = new Definition([
                    new Argument('foo'),
                ]);
                
                const rawArgs = new Map([
                    ['bar', 'zar'], // unknown arg...
                ]);
                const rawOpts = new Map();

                // -------------------------------------------------------------- //

                assert.throws(
                    () => {
                        const input = new DummyInput(rawArgs, rawOpts, definition);
                        input
                            .bind()
                            .validate();
                    },
                    {
                        name: 'TypeError',
                        message: 'The "bar" argument does not exist.',
                    }
                );
            });

            it('fails when provided with unknown option', () => {

                const definition = new Definition([
                    new Option('zip'),
                ]);

                const rawArgs = new Map();
                const rawOpts = new Map([
                    ['archive', 1], // unknown opt...
                ]);

                // -------------------------------------------------------------- //

                assert.throws(
                    () => {
                        const input = new DummyInput(rawArgs, rawOpts, definition);
                        input
                            .bind()
                            .validate();
                    },
                    {
                        name: 'TypeError',
                        message: 'The "archive" option does not exist.',
                    }
                );
            });

            it('sets option value via negated name', () => {
                const definition = new Definition([
                    new Option('output', 'o', ValueMode.NONE, '', true),
                ]);

                const rawArgs = new Map();
                const rawOpts = new Map([
                    ['no-output', true] // Use negated name
                ]);

                // -------------------------------------------------------------- //

                const input = new DummyInput(rawArgs, rawOpts, definition);
                input
                    .bind()
                    .validate();

                // -------------------------------------------------------------- //
                
                assert.deepEqual(input.getOption('output'), false, 'Incorrect value for negatable option');
                assert.deepEqual(input.getOption('no-output'), true, 'Incorrect value for negatable option (via negated name)');
            });
        });
    });
});