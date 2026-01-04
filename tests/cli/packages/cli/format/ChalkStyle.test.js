import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { ChalkStyle } from "@aedart/cli";
import { Chalk } from "chalk";
import hasAnsi from "has-ansi";

describe('@aedart/cli', () => {

    describe('format', () => {

        describe('chalk style', () => {

            it('can create style', () => {
                const style = new ChalkStyle((text) => text, new Chalk());
                
                // If no exception is thrown, then test passes...
                assert.notEqual(style, undefined);
            });

            it('can style text', () => {
                const style = new ChalkStyle((text, chalk) => {
                    return chalk.bold.red(text);
                }, new Chalk());
                
                // ------------------------------------------------------------------------ //
                
                const text = 'Hi there...';
                const result = style.apply(text);
                
                // Debug
                // console.log(result);
                
                assert.ok(hasAnsi(result), 'Text was not styled with ANSI escape codes');
                assert.ok(result.includes(text), 'Original text is not included in output');
            });
        });
    });
});