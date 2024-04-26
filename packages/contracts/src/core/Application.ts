import { Container } from "@aedart/contracts/container";

/**
 * Core Application
 */
export default interface Application extends Container
{
    /**
     * This core application's current version
     * 
     * @type {string}
     */
    get version(): string;
}