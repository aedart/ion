import type { Application, Bootstrapper } from "@aedart/contracts/core";
import { Env } from "@aedart/support/env";

/**
 * Load Environment Variables - Application Bootstrapper
 */
export default class LoadEnvironmentVariables implements Bootstrapper {

    /**
     * Loads and defines the application's environment variables
     *
     * @param {Application} app
     *
     * @return {void}
     */
    public bootstrap(app: Application): void
    {
        const variables = this.loadVariables();
        const key: PropertyKey = 'APP_ENV';
        
        Env.define(variables, this.isProduction(key, variables));
        
        app.detectEnvironment(() => {
            return Env.get(key, 'production');
        });
    }

    /**
     * Loads and returns the environment variables
     * 
     * @return {Record<PropertyKey, any>}
     * 
     * @protected
     */
    protected loadVariables(): Record<PropertyKey, any> /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        // You can use your bundler to populate the __ENV__ with variables from an .env file, or similar.
        // Please review the official documentation for additional information.
        // Overwrite this method, if your environment variables are to be loaded differently.
        
        /* @ts-expect-error TS2304 __ENV__ is the default expected global variable to contain all environment variables */
        return (__ENV__ ?? {}) as Record<PropertyKey, any>; /* eslint-disable-line @typescript-eslint/no-explicit-any */
    }

    /**
     * Determine if the application's environment has been defined and is "production"
     *
     * @param {PropertyKey} key Name of the property that contains application environment
     * @param {Record<PropertyKey, any>} variables Environment variables
     *
     * @return {boolean}
     *
     * @protected
     */
    protected isProduction(key: PropertyKey, variables: Record<PropertyKey, any>): boolean /* eslint-disable-line @typescript-eslint/no-explicit-any */
    {
        return Reflect.has(variables, key)
            && variables[key as keyof typeof variables] === 'production';
    }
}