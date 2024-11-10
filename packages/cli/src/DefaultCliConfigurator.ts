import type { Application } from "@aedart/contracts/core";
import {
    DefaultConfigurator,
    SetupFacades
} from "@aedart/core";
import LoadEnvironmentVariablesForCli from "./bootstrap/LoadEnvironmentVariablesForCli";

/**
 * Default Cli Configurator
 * 
 * @see {DefaultConfigurator}
 */
export default class DefaultCliConfigurator extends DefaultConfigurator
{
    /**
     * @inheritdoc
     */
    before(app: Application)
    {
        super.before(app);
        
        this
            // Replace the default bootstrappers with those specific for running
            // in the Cli...
            .clearBootstrappers()
            .withBootstrappers([
                LoadEnvironmentVariablesForCli,
                SetupFacades
            ])
    }
}