import type { Application } from "@aedart/contracts/core";

/**
 * Cli Application
 */
export default interface CliApplication
{
    /**
     * Returns this Cli Application's version
     *
     * @type {string}
     */
    get version(): string;

    /**
     * Returns a description of this Cli Application
     *
     * @type {string}
     */
    get description(): string;

    /**
     * The "core" application instance used by this Cli Application
     *
     * @returns {Application}
     */
    get core(): Application;
    
    /**
     * The underlying "driver" of this Cli Application
     *
     * @returns {object}
     */
    get driver(): object;
    
    // TODO: output(configuration???)

    /**
     * Specify whether the Cli Application must invoke `process.exit()` or not.
     *
     * @param {boolean} [allow=true]
     *
     * @return {this}
     */
    allowExit(allow?: boolean): this;

    /**
     * Opposite of {@link allowExit}
     *
     * @param {boolean} [prevent=true]
     *
     * @return {this}
     */
    preventExit(prevent?: boolean): this;
    
    // TODO: command(cmd: Command | CommandConstructor)
    
    // TODO: async run(argv?: readonly string[], options?: ParseOptions): Promise<boolean>
}