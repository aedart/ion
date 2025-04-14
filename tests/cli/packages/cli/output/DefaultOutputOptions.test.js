import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { DefaultOutputOptions } from "@aedart/cli";
import { OutputMode, Verbosity } from "@aedart/contracts/cli";

describe('@aedart/cli', () => {

    describe('output', () => {

        describe('default output options', () => {

            it('can create new output option', () => {
                const opt = new DefaultOutputOptions();

                assert.equal(opt.verbosity, Verbosity.NORMAL, 'incorrect default verbosity');
                assert.equal(opt.mode, OutputMode.NORMAL, 'incorrect default output mode');
            });

            it('can specify custom output options', () => {
                const verbosity = Verbosity.VERY_VERBOSE;
                const mode = OutputMode.RAW;
                
                const opt = DefaultOutputOptions.from({ verbosity, mode });

                assert.equal(opt.verbosity, verbosity, 'incorrect custom verbosity');
                assert.equal(opt.mode, mode, 'incorrect custom output mode');
            });
        });
    });
});