import { LoadEnvironmentVariables } from "@aedart/core";
import * as process from "node:process";

/**
 * Load Environment Variables For Cli - Application Bootstrapper
 */
export default class LoadEnvironmentVariablesForCli extends LoadEnvironmentVariables
{
    /**
     * @inheritdoc
     */
    protected loadVariables(): Record<PropertyKey, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        // For the Cli Application, node's `process.env` is the source of environment variables.
        return process.env;
    }
}