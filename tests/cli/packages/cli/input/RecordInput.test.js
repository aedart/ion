import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { Argument, Option, RecordInput, Definition } from "@aedart/cli";

describe('@aedart/cli', () => {

    describe('input', () => {

        describe('record input', () => {

            it('can create input from record', () => {
                const name = 'Sine';
                const email = 'sine@example.org';
                const role = 'editor';
                const output = true;

                // -------------------------------------------------------------- //

                const input = new RecordInput(
                    {
                        'name': name,
                        'email': email,
                        '--role': role,
                        '-o': output
                    },
                    new Definition([
                        new Argument('name'),
                        new Argument('email'),
                        new Option('role'),
                        new Option('output', 'o')
                    ])
                );

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
        });
    });
});