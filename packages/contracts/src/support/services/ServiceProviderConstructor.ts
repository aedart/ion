import { Application } from "@aedart/contracts/core";
import ServiceProvider from "./ServiceProvider";

/**
 * Service Provider Constructor
 * 
 * @see ServiceProvider
 */
export default interface ServiceProviderConstructor
{
    /**
     * Create a new instance of this service provider
     * 
     * @param {Application} app
     * 
     * @returns {ServiceProvider}
     */
    new (app: Application): ServiceProvider
}