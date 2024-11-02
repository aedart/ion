import { describe, it } from 'node:test';
import * as assert from "node:assert";
import makeCliApplication from "./helpers/makeCliApplication.js";
import { Application } from "@aedart/core";

describe('@aedart/cli', () => {

    describe('core', () => {

        it('has default "core" application instance', () => {
            const result = makeCliApplication().core;

            assert.strictEqual(result instanceof Application, true, 'No default "core" application');
        });

        it('can set custom "core" application', () => {
            const core = new Application();
            const cli = makeCliApplication(undefined, core);
            
            assert.strictEqual(cli.core === core, true, 'Incorrect "core" application')
        });

        it('destroys "core" application before cli exits', async () => {
            let destroyInvoked = false;
            
            const core = new Application();
            core.destroying(() => {
                destroyInvoked = true;
            });

            const cli = makeCliApplication({
                writeOut: () => {
                    // Ignore output
                }
            }, core);

            // --------------------------------------------------------------- //
            
            await cli.run([], { from: 'user' });

            assert.ok(destroyInvoked, '"core" application not destroyed');
        });
    });
});