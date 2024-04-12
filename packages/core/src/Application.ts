import type {
    Application as ApplicationContract
} from "@aedart/contracts/core";
import { Container } from "@aedart/container";

/**
 * Core Application
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
        return super.setInstance(container);
    }
}