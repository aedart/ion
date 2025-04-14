import type { OutputOptions } from "@aedart/contracts/cli";
import { OutputMode, Verbosity } from "@aedart/contracts/cli";
import { populate } from "@aedart/support/objects";

/**
 * Default Output Options
 * 
 * @see {import('@aedart/contracts/cli').OutputOptions}
 */
export default class DefaultOutputOptions implements OutputOptions
{
    /**
     * Verbosity level
     *
     * @type {Verbosity}
     */
    verbosity: Verbosity = Verbosity.NORMAL;

    /**
     * Output mode
     *
     * @type {OutputMode}
     */
    mode: OutputMode = OutputMode.NORMAL;

    /**
     * Create new "default" Output Options instance
     * 
     * @param {OutputOptions} [options]
     */
    public constructor(options?: OutputOptions)
    {
        // Merge provided options, if any given
        if (options && typeof options == 'object') {
            populate(this, options);
        }
    }

    /**
     * Creates new Output Options instance from given options
     * 
     * @param {OutputOptions} [options]
     * 
     * @return {Readonly<DefaultOutputOptions | OutputOptions>}
     */
    public static from(options?: OutputOptions): Readonly<DefaultOutputOptions|OutputOptions>
    {
        const resolved = new this(options);

        return Object.freeze(resolved);
    }
}