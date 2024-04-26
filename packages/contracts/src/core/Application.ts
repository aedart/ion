import { Container } from "@aedart/contracts/container";

/**
 * Core Application
 *
 * Adaptation of Laravel's Foundation `Application` interface.
 *
 * @see https://github.com/laravel/framework/blob/11.x/src/Illuminate/Contracts/Foundation/Application.php
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