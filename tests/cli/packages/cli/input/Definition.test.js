import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { Argument, Option, Definition } from "@aedart/cli";
import { ValueMode } from "@aedart/contracts/cli";
//import { LogicalError } from "@aedart/support/exceptions";

describe('@aedart/cli', () => {

    describe('input', () => {

        describe('definition', () => {

            it('can create new definition', () => {
                const def = new Definition();
                
                assert.ok(def);
            });
            
            it('can create definition with arguments and options', () => {
                const def = new Definition([
                    new Argument('name'),
                    new Argument('email'),
                    new Option('role')
                ]);
                
                assert.equal(def.amountOfArguments, 2, 'incorrect amount of arguments');
                assert.equal(def.amountOfOptions, 1, 'incorrect amount of options');
            });
            
            it('can obtain added argument by its name', () => {
                const nameArg = new Argument('name'); 
                const def = new Definition([
                    nameArg,
                    new Argument('email'),
                ]);
                
                assert.equal(def.hasArgument(nameArg.name), true, `"${nameArg.name}" does not exist`);
                const result = def.getArgument(nameArg.name);
                
                assert.deepEqual(result, nameArg, 'Incorrect argument returned');
            });

            it('can determine amount of required arguments', () => {
                const def = new Definition([
                    new Argument('name'),
                    new Argument('email'),
                    new Argument('role', '', false),
                ]);

                assert.equal(def.amountOfRequiredArguments, 2, 'incorrect amount of required arguments');
            });
            
            it('fails adding argument with name that already exists', () => {
                const def = new Definition([
                    new Argument('foo'),
                ]);
                
                assert.throws(
                    () => {
                        def.addArgument(new Argument('foo'))
                    }, 
                    {
                        name: 'LogicalError',
                        message: 'An argument with the name "foo" already exists.'
                    }
                )
            });

            it('fails adding argument after an array argument', () => {
                const def = new Definition([
                    new Argument('paths', '', true, true),
                ]);

                assert.throws(
                    () => {
                        def.addArgument(new Argument('foo'))
                    },
                    {
                        name: 'LogicalError',
                        message: 'Cannot add argument "foo" after an array argument "paths".'
                    }
                )
            });

            it('fails adding required argument after an optional argument', () => {
                const def = new Definition([
                    new Argument('paths', '', false),
                ]);

                assert.throws(
                    () => {
                        def.addArgument(new Argument('foo'))
                    },
                    {
                        name: 'LogicalError',
                        message: 'Cannot add required argument "foo" after an optional argument "paths".'
                    }
                )
            });

            it('fails adding option with name that already exists', () => {
                const def = new Definition([
                    new Option('foo'),
                ]);

                assert.throws(
                    () => {
                        def.addOption(new Option('foo', '-f')) // NOTE: same name, but has now a shortcut. Should be prevented!
                    },
                    {
                        name: 'LogicalError',
                        message: 'An option with the name "foo" already exists.'
                    }
                )
            });

            it('fails adding option with negation name that already exists', () => {
                const def = new Definition([
                    new Option('foo', [], ValueMode.NONE, '', true),
                ]);

                assert.throws(
                    () => {
                        def.addOption(new Option('no-foo')) // negated name should already exist
                    },
                    {
                        name: 'LogicalError',
                        message: 'An option with the name "no-foo" already exists.'
                    }
                )
            });

            it('fails adding negated option if name already exists', () => {
                const def = new Definition([
                    new Option('no-foo'),
                ]);

                assert.throws(
                    () => {
                        def.addOption(new Option('foo', [], ValueMode.NONE, '', true),)
                    },
                    {
                        name: 'LogicalError',
                        message: 'An option with the name "no-foo" already exists.'
                    }
                )
            });
            
            it('fails adding option with shortcut that already exists', () => {
                const def = new Definition([
                    new Option('foo', 'f'),
                ]);

                assert.throws(
                    () => {
                        def.addOption(new Option('bar', 'f'))
                    },
                    {
                        name: 'LogicalError',
                        message: 'An option with the shortcut "f" already exists.'
                    }
                )
            });

            it('can obtain added option by its name', () => {
                const option =  new Option('foo');
                const def = new Definition([
                    option,
                    new Option('bar')
                ]);

                assert.equal(def.hasOption(option.name), true, `"${option.name}" does not exist`);
                const result = def.getOption(option.name);

                assert.deepEqual(result, option, 'Incorrect option returned');
            });

            it('can determine if option exists via its shortcut', () => {
                const def = new Definition([
                    new Option('foo', 'f'),
                    new Option('bar', 'b')
                ]);

                assert.equal(def.hasShortcut('f'), true, `"--f" does not exist`);
                assert.equal(def.hasShortcut('z'), false, `"--z" should NOT exist`);
            });

            it('can obtain if option via its shortcut', () => {
                const option = new Option('bar', 'b'); 
                const def = new Definition([
                    new Option('foo', 'f'),
                    option
                ]);

                const result = def.getOptionForShortcut('b');
                
                assert.deepEqual(result, option, 'Incorrect option obtained for shortcut');
            });
            
            it('can determine if option exists via its negated name', () => {
                const def = new Definition([
                    new Option('foo', 'f', ValueMode.NONE, '', true),
                    new Option('bar', 'b', ValueMode.NONE, '', true)
                ]);

                assert.equal(def.hasNegation('no-foo'), true, `"no-foo" does not exist`);
                assert.equal(def.hasNegation('no-zar'), false, `"no-zar" should NOT exist`);
            });

            it('can determine and obtain argument via its index', () => {
                const foo = new Argument('foo'); 
                const bar = new Argument('bar'); 
                const zar = new Argument('zar'); 
                
                const def = new Definition([
                    foo, // 0
                    bar, // 1
                    zar, // 2
                ]);

                assert.equal(def.hasArgument(1), true, "bar does not exist");
                assert.deepStrictEqual(def.getArgument(1), bar, "incorrect argument instance (bar)")

                assert.equal(def.hasArgument(4), false, "argument at index 4 should not exist");
            });
        });
    });
});