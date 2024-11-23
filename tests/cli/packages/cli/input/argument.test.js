import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { Argument } from "@aedart/cli";

describe('@aedart/cli', () => {

    describe('input', () => {

        describe('argument', () => {

            it('can create new argument', () => {
                const name = 'My Argument';
                const arg = new Argument(name);
                
                assert.equal(arg.name, name);
            });

            it('can obtain description', () => {
                const description = 'Lorum lipsum...';
                const arg = new Argument('my arg', description);

                assert.deepEqual(arg.description, description);
            });

            it('is required by default', () => {
                const arg = new Argument('my arg');
                
                assert.equal(arg.isRequired(), true, 'Should be required');
                assert.equal(arg.isOptional(), false, 'Should NOT be optional');
            });

            it('can create optional argument', () => {
                const arg = Argument.make('my arg', {
                    required: false
                });

                assert.equal(arg.isRequired(), false, 'Should NOT be required');
                assert.equal(arg.isOptional(), true, 'Should be optional');
            });

            it('can create as array type', () => {
                const arg = Argument.make('my arg', {
                    isArray: true
                });

                assert.equal(arg.isArray(), true, 'Argument should be of the type array');
            });

            it('has null as default value', () => {
                const arg = new Argument('my arg');
                
                assert.deepEqual(arg.getDefault(), null, 'Default value should be null');
            });
            
            it('can set and get default value', () => {
                const defaultValue = 'Weee';
                const arg = Argument.make('my arg', {
                    required: false,
                    defaultValue: defaultValue
                });

                assert.deepEqual(arg.getDefault(), defaultValue, 'Incorrect default value');
            });

            it('converts null to empty array when of array type', () => {
                const arg = Argument.make('my arg', {
                    isArray: true
                });

                assert.deepEqual(arg.getDefault(), [], 'Default value should be an empty array');
            });

            it('fails setting default value when argument is required', () => {
                assert.throws(
                    () => {
                        return Argument.make('my arg', { defaultValue: 'my default value' });
                    }, 
                    {
                        name: 'LogicalError'
                    }
                );
            });

            it('fails setting default value (not an array), when argument of array type', () => {
                assert.throws(
                    () => {
                        return Argument.make('my arg', {
                            required: false,
                            isArray: true,
                            defaultValue: 'my default value'
                        });
                    },
                    {
                        name: 'TypeError'
                    }
                );
            });
        });
    });
});