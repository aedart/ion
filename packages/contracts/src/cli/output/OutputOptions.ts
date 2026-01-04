import Verbosity from "./Verbosity";
import OutputMode from "./OutputMode";

/**
 * Output Options
 */
export default interface OutputOptions
{
    /**
     * Verbosity level
     * 
     * @type {Verbosity}
     */
    verbosity?: Verbosity;

    /**
     * Output mode
     * 
     * @type {OutputMode}
     */
    mode?: OutputMode;
}