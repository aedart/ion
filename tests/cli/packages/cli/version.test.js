import { describe, it } from 'node:test';
import * as assert from "node:assert";
import makeCliApplication from "./helpers/makeCliApplication.js";

describe('@aedart/cli', () => {

    describe('version', () => {
        
        it('can display version', () => {
            const result = makeCliApplication().version;

            assert.strictEqual(typeof result, 'string', 'Cli Application does not have version defined');
        });
    });
});