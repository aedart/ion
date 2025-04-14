import Verbosity from "./Verbosity";
import Mode from "./Mode";

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
     * @type {Mode}
     */
    mode?: Mode;
}