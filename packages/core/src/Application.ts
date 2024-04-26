import type {
    Application as ApplicationContract
} from "@aedart/contracts/core";
import { CORE } from "@aedart/contracts/core";
import { CONTAINER } from "@aedart/contracts/container";
import { Container } from "@aedart/container";
import { version } from "../package.json";

/**
 * Core Application
 * 
 * Adaptation of Laravel's Foundation `Application`.
 * 
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Foundation/Application.php
 */
export default class Application extends Container implements ApplicationContract
{
    /**
     * Returns the singleton instance of the core application
     *
     * @return {ApplicationContract|this}
     */
    public static getInstance(): ApplicationContract
    {
        return super.getInstance() as ApplicationContract;
    }

    /**
     * Set the singleton instance of the core application
     *
     * @param {ApplicationContract | null} [container]
     *
     * @return {ApplicationContract | null}
     */
    public static setInstance(container: ApplicationContract | null = null): ApplicationContract | null
    {
        const application = super.setInstance(container) as ApplicationContract | null;

        // Register core application bindings
        if (application !== null) {
            application.instance(CORE, this);
            application.instance(CONTAINER, this);   
        }

        return application;
    }

    /**
     * This core application's current version
     *
     * @type {string}
     */
    get version(): string
    {
        return version;
    }
}