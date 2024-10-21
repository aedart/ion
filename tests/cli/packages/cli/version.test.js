import { describe, it } from 'node:test';
import * as assert from "node:assert";
import makeCliApplication from "./helpers/makeCliApplication.js";

describe('@aedart/cli', () => {

    describe('version', () => {
        
        it('has version property', () => {
            const result = makeCliApplication().version;

            assert.strictEqual(typeof result, 'string', 'Cli Application does not have version defined');
        });

        it('can display version', async () => {
            let buffer = '';
            
            const cli = makeCliApplication({
                writeOut: (str) => {
                    buffer = buffer.concat(str).trim();
                }
            });
            
            // --------------------------------------------------------------- //

            await cli.run(['--version'], { from: 'user' });
            
            assert.strictEqual(buffer, cli.version, 'Version was not displayed in output');
        });
    });
});