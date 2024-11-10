import {
    CliApplication,
    DefaultCliConfigurator
} from "@aedart/cli";
import { Application } from "@aedart/core";

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
    core = core ?? (new Application())
        .configure(DefaultCliConfigurator)
    
    const cli = new CliApplication(core);
    
    if (output) {
        cli.output(output);
    }
    
    return cli.preventProcessExit();
}