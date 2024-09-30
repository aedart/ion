import Configurator from "./Configurator";

/**
 * Application Configurator Constructor
 */
export default interface ConfiguratorConstructor
{
    /**
     * Create a new Application Configurator instance
     * 
     * @return {Configurator}
     */
    new (): Configurator;
}