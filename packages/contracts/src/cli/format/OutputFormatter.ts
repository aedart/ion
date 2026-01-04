import type Style from "./Style";

/**
 * Output Formatter
 *
 * This component is an adaptation of Symfony Console's `OutputFormatterInterface` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.1/Formatter/OutputFormatterInterface.php
 */
export default interface OutputFormatter
{
    /**
     * Format given message according to given styles
     * 
     * @param {string} [message]
     * 
     * @return {string | undefined}
     */
    format(message?: string): string|undefined;

    /**
     * Set a new style
     * 
     * @param {string} name
     * @param {Style} style
     * 
     * @return {this}
     */
    setStyle(name: string, style: Style): this;

    /**
     * Determine if style exists
     * 
     * @param {string} name
     * 
     * @return {boolean}
     */
    hasStyle(name: string): boolean;

    /**
     * Returns the style that matches given name
     * 
     * @param {string} name
     * 
     * @return {Style}
     * 
     * @throws {TypeError} If not style exists for given name
     */
    getStyle(name: string): Style;

    /**
     * Set the decoration state of this formatter
     * 
     * @param {boolean} state True if messages must be decorated / formatted,
     *                        false otherwise.
     * 
     * @return {this}
     */
    setDecorated(state: boolean): this;

    /**
     * Determine if output must be decorated by formatter or not
     * 
     * @see {setDecorated}
     * 
     * @return {boolean}
     */
    isDecorated(): boolean;
}