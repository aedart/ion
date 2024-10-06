import type { Application } from "@aedart/contracts/core";
import {
    CORE,
} from "@aedart/contracts/core";
import { CONTAINER } from "@aedart/contracts/container";
import CoreConfigServiceProvider from './providers/CoreConfigServiceProvider';
import LoadEnvironmentVariables from "./bootstrap/LoadEnvironmentVariables";
import SetupFacades from "./bootstrap/SetupFacades";
import BaseConfigurator from "./configuration/BaseConfigurator";

/**
 * Default Application Configurator
 * 
 * @see {BaseConfigurator}
 */
export default class DefaultConfigurator extends BaseConfigurator
{
    /**
     * @inheritdoc
     */
    public before(app: Application): void
    {
        this
            .withInstances([
                [ CORE, app ]
            ])
            .withAliases([
                [ CORE, CONTAINER ]
            ])
            .withBootstrappers([
                LoadEnvironmentVariables,
                SetupFacades
            ])
            .withServiceProviders([
                CoreConfigServiceProvider
            ]);
    }
}