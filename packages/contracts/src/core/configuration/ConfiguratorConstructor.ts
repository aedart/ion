import Application from '../Application';
import Configurator from "./Configurator";

/**
 * Application Configurator Constructor
 */
export default interface ConfiguratorConstructor
{
    /**
     * Create a new Application Configurator instance
     * 
     * @param {Application} [app]
     * 
     * @return {Configurator}
     */
    new (app?: Application): Configurator;
}