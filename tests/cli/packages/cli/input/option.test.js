import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { Argument, Option } from "@aedart/cli";
import { OptionType } from "@aedart/contracts/cli";

describe('@aedart/cli', () => {

    describe('input', () => {

        describe('option', () => {

            it('can create new option', () => {
                const name = 'foo';
                const opt = new Option(name);

                assert.equal(opt.name, name);
            });

            it('removes double dash from option name', () => {
                const name = 'foo';
                const opt = new Option(`--${name}`);

                assert.equal(opt.name, name);
            });
            
            it('fails if option name is empty', () => {
                    assert.throws(
                        () => {
                            new Option('');
                        },
                        {
                            name: 'TypeError'
                        }
                    );
            });

            it('removes dashes from option shortcut', () => {
                const shortcut = 'f';
                const opt = new Option('foo', `----${shortcut}`);

                assert.equal(opt.short, shortcut);
            });
            
            it('fails if option shortcut is empty string', () => {
                assert.throws(
                    () => {
                        new Option('foo', '');
                    },
                    {
                        name: 'TypeError'
                    }
                );
            });
            
            it('can obtain option type', () => {
                const type = OptionType.STRING;
                const opt = new Option('foo', undefined, type);
                
                assert.equal(opt.type, type);
            });

            it('fails if option type is invalid', () => {
                assert.throws(
                    () => {
                        new Option('foo', undefined, 'unknown-type');
                    },
                    {
                        name: 'TypeError'
                    }
                );
            });
            
            it('can obtain description', () => {
                const description = 'Lorum lipsum...';
                const opt = new Option('foo', undefined, OptionType.BOOLEAN, description);

                assert.deepEqual(opt.description, description);
            });
            
            it('is optional by default', () => {
                const opt = new Option('foo');

                assert.equal(opt.isRequired(), false, 'Should be NOT required');
                assert.equal(opt.isOptional(), true, 'Should be optional');
            });
            
            it('can create optional argument', () => {
                const opt = new Option('foo', undefined, OptionType.BOOLEAN, '', true);

                assert.equal(opt.isRequired(), true, 'Should be required');
                assert.equal(opt.isOptional(), false, 'Should NOT be optional');
            });

            it('can create option as array type', () => {
                const opt = new Option(
                    'foo',
                    undefined,
                    OptionType.BOOLEAN,
                    '',
                    false,
                    true
                );

                assert.equal(opt.isArray(), true, 'Option should be of the type array');
            });

            it('has null as default value', () => {
                const opt = new Option('foo');

                assert.deepEqual(opt.getDefault(), null, 'Default value should be null');
            });

            it('can set and get default value', () => {
                const defaultValue = 'Weee';
                const opt = new Option(
                    'foo',
                    undefined,
                    OptionType.STRING,
                    '',
                    false,
                    false,
                    defaultValue
                );

                assert.deepEqual(opt.getDefault(), defaultValue, 'Incorrect default value');
            });

            it('converts null to empty array when of array type', () => {
                const opt = new Option(
                    'foo',
                    undefined,
                    OptionType.BOOLEAN,
                    '',
                    false,
                    true,
                );

                assert.deepEqual(opt.getDefault(), [], 'Default value should be an empty array');
            });

            it('fails setting default value when option is required', () => {
                assert.throws(
                    () => {
                        new Option(
                            'foo',
                            undefined,
                            OptionType.STRING,
                            '',
                            true,
                            false,
                            'my default value'
                        );
                    },
                    {
                        name: 'LogicalError'
                    }
                );
            });

            it('fails setting default value when value of incorrect type', () => {
                assert.throws(
                    () => {
                        new Option(
                            'foo',
                            undefined,
                            OptionType.BOOLEAN,
                            '',
                            false,
                            false,
                            'string default value'
                        );
                    },
                    {
                        name: 'TypeError'
                    }
                );
            });

            it('fails setting default value (not an array), when option of array type', () => {
                assert.throws(
                    () => {
                        new Option(
                            'foo',
                            undefined,
                            OptionType.BOOLEAN,
                            '',
                            false,
                            true,
                            'string default value'
                        );
                    },
                    {
                        name: 'TypeError'
                    }
                );
            });
        });
    });
});