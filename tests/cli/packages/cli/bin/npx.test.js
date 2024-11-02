import { describe, it } from 'node:test';
import * as assert from "node:assert";
import { exec } from "node:child_process"

describe('@aedart/cli', () => {
    
    describe('bin', () => {
        
       describe('npx', () => {

           it('can invoke cli application via npx', async () => {
               return exec('npx ion', (error, stdout, stderr) => {
                   // console.log('stdout', stdout);
                   // console.error('stderr', stderr);
                   // console.log('code', error.code);

                   assert.ok(error === null, `Error encountered from Cli Application: ${error?.message}`);
                   assert.ok(stdout.length !== 0, 'Cli application failed to output default "help"');
               }).on('exit', (code) => {
                   const expected = 0;
                   assert.equal(code, expected, `Expected exist code ${expected}, but received: ${code} from cli application`);
               });
           });
       });
    });
});