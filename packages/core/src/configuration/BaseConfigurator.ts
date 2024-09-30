import { Application, BootstrapperConstructor, Configurator} from "@aedart/contracts/core";
import {ServiceProvider, ServiceProviderConstructor} from "@aedart/contracts/support/services";

/**
 * TODO: Incomplete....
 * 
 * Base Configurator
 */
export default abstract class BaseConfigurator implements Configurator {
    
    withBootstrappers(bootstrappers: BootstrapperConstructor[]): this {
        throw new Error("Method not implemented.");
    }
    withServiceProviders(providers: (ServiceProvider | ServiceProviderConstructor)[]): this {
        throw new Error("Method not implemented.");
    }
    for(app: Application): this {
        throw new Error("Method not implemented.");
    }
    apply(): Application {
        throw new Error("Method not implemented.");
    }
}