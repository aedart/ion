import {Output, OutputFormatter, OutputOptions, Verbosity} from "@aedart/contracts/cli";
import NullOutputFormatter from "../format/NullOutputFormatter";

/**
 * Null Output
 *
 * Adaptation of Symfony Console's `NullOutput` - Copyright Fabien Potencier 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Output/NullOutput.php
 */
export default class NullOutput implements Output
{
    /**
     * The formatter used by this output
     * 
     * @type {OutputFormatter}
     * 
     * @protected
     * @readonly
     */
    protected readonly formatter: OutputFormatter = new NullOutputFormatter();
    
    /**
     * Write a message to the output
     *
     * @param {string | Iterable<string>} message One or more messages to write to the output
     * @param {boolean} [newline] True if message(s) should be displayed on a new line. False otherwise.
     *                            Defaults to `false`, if not provided.
     * @param {OutputOptions} [options] The output options (e.g. verbosity level and output mode).
     *
     * @return {this}
     */
    public write(message: string|Iterable<string>, newline?: boolean, options?: OutputOptions): this
    {
        // N/A

        return this;
    }

    /**
     * Write a message to the output on a new line
     *
     * @see {write}
     *
     * @param {string | Iterable<string>} message
     * @param {OutputOptions} [options]
     *
     * @return {this}
     */
    public writeln(message: string|Iterable<string>, options?: OutputOptions): this
    {
        // N/A

        return this;
    }

    /**
     * Set the verbosity level of this output
     *
     * @param {Verbosity} level
     *
     * @return {this}
     */
    public setVerbosity(level: Verbosity): this
    {
        // N/A

        return this;
    }

    /**
     * Returns the verbosity level of this output
     *
     * @return {Verbosity}
     */
    public getVerbosity(): Verbosity
    {
        return Verbosity.SILENT;
    }

    /**
     * Determine if verbosity is set to "silent" (--silent)
     *
     * @see {Verbosity.SILENT}
     *
     * @return {boolean}
     */
    public isSilent(): boolean
    {
        return true;
    }

    /**
     * Determine if verbosity is set to "quiet" (--quiet or -q)
     *
     * @see {Verbosity.QUIET}
     *
     * @return {boolean}
     */
    public isQuiet(): boolean
    {
        return false;
    }

    /**
     * Determine if verbosity is set to "normal"
     *
     * @see {Verbosity.NORMAL}
     *
     * @return {boolean}
     */
    public isNormal(): boolean
    {
        return false;
    }

    /**
     * Determine if verbosity is set to "verbose" (-v)
     *
     * @see {Verbosity.VERBOSE}
     *
     * @return {boolean}
     */
    public isVerbose(): boolean
    {
        return false;
    }

    /**
     * Determine if verbosity is set to "very verbose" (-vv)
     *
     * @see {Verbosity.VERY_VERBOSE}
     *
     * @return {boolean}
     */
    public isVeryVerbose(): boolean
    {
        return false;
    }

    /**
     * Determine if verbosity is set to "debug" (-vvv)
     *
     * @see {Verbosity.DEBUG}
     *
     * @return {boolean}
     */
    public isDebug(): boolean
    {
        return false;
    }

    /**
     * Set the decoration state of this output
     *
     * @param {boolean} state True if messages must be decorated / formatted,
     *                        false otherwise.
     *
     * @return {this}
     */
    public setDecorated(state: boolean): this
    {
        // N/A

        return this;
    }

    /**
     * Determine if output must be decorated
     *
     * @see {setDecorated}
     *
     * @return {boolean}
     */
    public isDecorated(): boolean
    {
        return false;
    }

    /**
     * Set the formatter for this output
     *
     * @param {OutputFormatter} formatter
     *
     * @return {this}
     */
    public setFormatter(formatter: OutputFormatter): this
    {
        // N/A
        
        return this;
    }

    /**
     * Returns the formatter used by this output
     *
     * @return {OutputFormatter}
     */
    public getFormatter(): OutputFormatter
    {
        return this.formatter;
    }
}