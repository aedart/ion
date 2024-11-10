import { describe, it, beforeEach } from 'node:test';
import * as assert from "node:assert";
import makeCliApplication from "./helpers/makeCliApplication.js";
import { Env } from "@aedart/support/env";

describe('@aedart/cli', () => {

    describe('env', () => {

        beforeEach(() => {
            Env.clear();
        });
        
        it('loads default .env file', async () => {
            const cli = makeCliApplication({
                writeOut: () => {
                    // Ignore output
                }
            });
            const core = cli.core;
            
            let hasLoadedEnv = false;
            core.destroying(() => {
                hasLoadedEnv = Env.get('APP_ENV') === 'testing';
            });

            // --------------------------------------------------------------- //

            await cli.run([], { from: 'user' });

            assert.ok(hasLoadedEnv, 'environment file not loaded');
        });

        it('can load custom environment file', async () => {
            const cli = makeCliApplication({
                writeOut: () => {
                    // Ignore output
                }
            });
            const core = cli.core;

            let hasLoadedEnv = false;
            core.destroying(() => {
                hasLoadedEnv = Env.get('CUSTOM_KEY') === 'custom';
            });

            // --------------------------------------------------------------- //

            await cli.run([
                '--env=tests/cli/packages/cli/fixtures/.custom'
            ], { from: 'user' });

            assert.ok(hasLoadedEnv, 'custom environment file not loaded');
        });
    });
});