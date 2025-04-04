import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { Option } from "@aedart/cli";
import { ValueMode } from "@aedart/contracts/cli";

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

                assert.equal(opt.shortcuts.includes(shortcut), true);
            });

            it('can specify multiple shortcuts', () => {
                const shortcutA = 'a';
                const shortcutB = 'b';
                const shortcutC = 'C';
                const opt = new Option('foo', [shortcutA, `-${shortcutB}`, shortcutC]);

                assert.equal(opt.shortcuts.includes(shortcutA), true, 'shortcut A missing');
                assert.equal(opt.shortcuts.includes(shortcutB), true, 'shortcut B missing');
                assert.equal(opt.shortcuts.includes(shortcutC), true, 'shortcut C missing');
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

            it('has ValueMode.NONE by default', () => {
                const opt = new Option('foo');

                assert.equal(opt.valueMode, ValueMode.NONE);
                assert.equal(opt.acceptsValue(), false, 'should NOT accept value');
                assert.equal(opt.isValueRequired(), false, 'a value should NOT be required');
                assert.equal(opt.isValueOptional(), false, 'a value should NOT be optional');
            })
            
            it('can set required value mode', () => {
                const mode = ValueMode.REQUIRED;
                const opt = new Option('foo', [], mode);

                assert.equal(opt.valueMode, mode, 'Incorrect value mode');
                assert.equal(opt.isValueRequired(), true, 'a value should be required');
                assert.equal(opt.acceptsValue(), true, 'should accept value');
            });

            it('can set optional value mode', () => {
                const mode = ValueMode.OPTIONAL;
                const opt = new Option('foo', [], mode);

                assert.equal(opt.valueMode, mode, 'Incorrect value mode');
                assert.equal(opt.isValueOptional(), true, 'a value should be optional');
                assert.equal(opt.acceptsValue(), true, 'should accept value');
            });
            
            it('fails if option value mode is invalid', () => {
                assert.throws(
                    () => {
                        new Option('foo', [], 'unknown-mode');
                    },
                    {
                        name: 'TypeError'
                    }
                );
            });

            it('can set description', () => {
                const description = 'Lorum lipsum...';
                const opt = new Option('foo', [], ValueMode.NONE, description);

                assert.deepEqual(opt.description, description);
            });

            it('can allow negatable value', () => {
                const opt = new Option('foo', undefined, ValueMode.NONE, '', true);

                assert.equal(opt.isNegatable(), true);
            });

            it('fails allowing negatable value when value required', () => {
                assert.throws(
                    () => {
                        new Option('foo', [], ValueMode.REQUIRED, '', true);
                    },
                    {
                        name: 'TypeError'
                    }
                );
            });

            it('fails allowing negatable value when value optional', () => {
                assert.throws(
                    () => {
                        new Option('foo', [], ValueMode.OPTIONAL, '', true);
                    },
                    {
                        name: 'TypeError'
                    }
                );
            });
            
            it('can create option as array type', () => {
                const opt = new Option(
                    'foo',
                    [],
                    ValueMode.REQUIRED,
                    '',
                    false,
                    true
                );

                assert.equal(opt.isArray(), true, 'Option should be of the type array');
            });

            it('has false as default value', () => {
                const opt = new Option('foo');

                assert.equal(opt.getDefault(), false, 'Default value should be false (for ValueMode.NONE)');
            });

            it('can set and get default value', () => {
                const defaultValue = 'Weee';
                const opt = new Option(
                    'foo',
                    [],
                    ValueMode.OPTIONAL,
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
                    [],
                    ValueMode.REQUIRED,
                    '',
                    false,
                    true,
                );

                assert.deepEqual(opt.getDefault(), [], 'Default value should be an empty array');
            });
            
            it('fails setting default value when ValueMode.NONE is used', () => {
                assert.throws(
                    () => {
                        new Option(
                            'foo',
                            [],
                            ValueMode.NONE,
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
            
            it('fails setting default value (not an array), when option of array type', () => {
                assert.throws(
                    () => {
                        new Option(
                            'foo',
                            [],
                            ValueMode.OPTIONAL,
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