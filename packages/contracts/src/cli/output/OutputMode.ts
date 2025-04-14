/**
 * Output Mode
 * 
 * Defines the available output modes.
 * This component is an adaptation of Symfony Console's output modes, defined in `OutputInterface` -
 * Copyright Fabien Potencier 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Output/OutputInterface.php
 */
enum OutputMode
{
    /**
     * Outputs formatted messages
     * 
     * @type {OutputMode.NORMAL}
     */
    NORMAL = 1,

    /**
     * Outputs messages without any formatting
     * 
     * @type {OutputMode.RAW}
     */
    RAW = 2,

    /**
     * Outputs messages as plain text (but contains formatting characters or tokens)
     * 
     * @type {OutputMode.PLAIN}
     */
    PLAIN = 4,
}

export default OutputMode;