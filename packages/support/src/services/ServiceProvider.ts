import type { ServiceProvider as ServiceProviderContract } from "@aedart/contracts/support/services";
import type { Application } from "@aedart/contracts/core";

/**
 * Service Provider
 * 
 * An adaptation of Laravel's Service Provider
 * 
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Support/ServiceProvider.php
 */
export default abstract class ServiceProvider implements ServiceProviderContract
{
    /**
     * The core application instance, or service container
     * 
     * @type {Application}
     * 
     * @protected
     */
    protected app: Application;

    /**
     * Create a new instance of this Service Provider
     * 
     * @param {Application} app
     */
    public constructor(app: Application)
    {
        this.app = app;
    }

    /**
     * Register application services
     *
     * @return {void}
     */
    public register(): void
    {
        // Overwrite this method to register services...
    }
}