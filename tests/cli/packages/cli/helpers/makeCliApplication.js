import { CliApplication } from "@aedart/cli";

/**
 * Returns a new Cli Application instance
 * 
 * @param {import('commander').OutputConfiguration} [output]
 * @param {import('@aedart/contracts/core').Application} [core]
 * 
 * @return {CliApplication}
 */
export default function makeCliApplication(output, core)
{
    const cli = new CliApplication(core);
    
    if (output) {
        cli.output(output);
    }
    
    return cli.preventProcessExit();
}