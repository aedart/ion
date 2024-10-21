import { CliApplication } from "@aedart/cli";

/**
 * TODO: 
 * 
 * @param {import('commander').OutputConfiguration} [output]
 * 
 * @return {CliApplication}
 */
export default function makeCliApplication(output)
{
    const cli = new CliApplication();
    
    if (output) {
        cli.output(output);
    }
    
    return cli.preventProcessExit();
}