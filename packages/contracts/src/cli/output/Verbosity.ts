/**
 * Output Verbosity
 * 
 * Define the level of output verbosity.
 * This component is an adaptation of Symfony Console's verbosity levels, defined in `OutputInterface` -
 * Copyright Fabien Potencier 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Output/OutputInterface.php
 */
enum Verbosity
{
    /**
     * Suppresses all output, including errors
     * 
     * @type {Verbosity.SILENT}
     */
    SILENT = 8,
    
    /**
     * Suppresses all output, but displays errors
     * 
     * @type {Verbosity.QUIET}
     */
    QUIET = 16,

    /**
     * Displays output marked as "normal" verbosity
     *
     * @type {Verbosity.NORMAL}
     */
    NORMAL = 32,
    
    /**
     * Displays output marked as "normal" and "verbose"
     * 
     * @type {Verbosity.VERBOSE}
     */
    VERBOSE = 64,

    /**
     * Displays output marked as "normal", "verbose" and other
     * none-essential information
     * 
     * @type {Verbosity.VERY_VERBOSE}
     */
    VERY_VERBOSE = 128,

    /**
     * Displays all output - the highest verbosity level
     * 
     * @type {Verbosity.DEBUG}
     */
    DEBUG = 256,
}

export default Verbosity;