/**
 * Output Mode
 * 
 * Defines the available output modes.
 * This component is an adaptation of Symfony Console's output modes, defined in `OutputInterface` -
 * Copyright Fabien Potencier 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Output/OutputInterface.php
 */
enum Mode
{
    /**
     * Outputs formatted messages
     * 
     * @type {Mode.NORMAL}
     */
    NORMAL = 1,

    /**
     * Outputs messages without any formatting
     * 
     * @type {Mode.RAW}
     */
    RAW = 2,

    /**
     * Outputs messages as plain text (but contains formatting characters or tokens)
     * 
     * @type {Mode.PLAIN}
     */
    PLAIN = 4,
}

export default Mode;