import type OutputFormatter from "../format/OutputFormatter";
import type OutputOptions from "./OutputOptions";
import Verbosity from "./Verbosity";

/**
 * Output
 * 
 * This component is an adaptation of Symfony Console's `OutputInterface` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Output/OutputInterface.php
 */
export default interface Output
{
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
    write(message: string|Iterable<string>, newline?: boolean, options?: OutputOptions): this;

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
    writeln(message: string|Iterable<string>, options?: OutputOptions): this;

    /**
     * Set the verbosity level of this output
     * 
     * @param {Verbosity} level
     * 
     * @return {this}
     */
    setVerbosity(level: Verbosity): this;

    /**
     * Returns the verbosity level of this output
     * 
     * @return {Verbosity}
     */
    getVerbosity(): Verbosity;

    /**
     * Determine if verbosity is set to "silent" (--silent)
     * 
     * @see {Verbosity.SILENT}
     * 
     * @return {boolean}
     */
    isSilent(): boolean;

    /**
     * Determine if verbosity is set to "quiet" (--quiet or -q)
     *
     * @see {Verbosity.QUIET}
     *
     * @return {boolean}
     */
    isQuiet(): boolean;

    /**
     * Determine if verbosity is set to "normal"
     *
     * @see {Verbosity.NORMAL}
     *
     * @return {boolean}
     */
    isNormal(): boolean;

    /**
     * Determine if verbosity is set to "verbose" (-v)
     *
     * @see {Verbosity.VERBOSE}
     *
     * @return {boolean}
     */
    isVerbose(): boolean;

    /**
     * Determine if verbosity is set to "very verbose" (-vv)
     *
     * @see {Verbosity.VERY_VERBOSE}
     *
     * @return {boolean}
     */
    isVeryVerbose(): boolean;

    /**
     * Determine if verbosity is set to "debug" (-vvv)
     *
     * @see {Verbosity.DEBUG}
     *
     * @return {boolean}
     */
    isDebug(): boolean;
    
    /**
     * Set the decoration state of this output
     *
     * @param {boolean} state True if messages must be decorated / formatted,
     *                        false otherwise.
     *
     * @return {this}
     */
    setDecorated(state: boolean): this;

    /**
     * Determine if output must be decorated
     *
     * @see {setDecorated}
     *
     * @return {boolean}
     */
    isDecorated(): boolean;

    /**
     * Set the formatter for this output
     * 
     * @param {OutputFormatter} formatter
     * 
     * @return {this}
     */
    setFormatter(formatter: OutputFormatter): this;

    /**
     * Returns the formatter used by this output
     * 
     * @return {OutputFormatter}
     */
    getFormatter(): OutputFormatter;
}