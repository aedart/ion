import type { OutputFormatter, Style } from "@aedart/contracts/cli";
import NullStyle from "./NullStyle";

/**
 * Null Output Formatter
 * 
 * This component is an adaptation of Symfony Console's `NullOutputFormatter` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Formatter/NullOutputFormatter.php
 */
export default class NullOutputFormatter implements OutputFormatter
{
    /**
     * The "default" style used by this formatter
     * 
     * @type {Style}
     * 
     * @protected
     */
    protected _style: Style = new NullStyle();
    
    /**
     * Format given message according to given styles
     *
     * @param {string} [message]
     *
     * @return {string | undefined}
     */
    public format(message?: string): string|undefined
    {
        return undefined;
    }

    /**
     * Set a new style
     *
     * @param {string} name
     * @param {Style} style
     *
     * @return {this}
     */
    public setStyle(name: string, style: Style): this
    {
        // N/A

        return this;
    }

    /**
     * Determine if style exists
     *
     * @param {string} name
     *
     * @return {boolean}
     */
    public hasStyle(name: string): boolean
    {
        // N/A
        
        return false;
    }

    /**
     * Returns the style that matches given name
     * @param {string} name
     *
     * @return {Style}
     *
     * @throws {TypeError} If not style exists for given name
     */
    public getStyle(name: string): Style
    {
        return this._style;
    }

    /**
     * Set the decoration state of this formatter
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
     * Determine if output must be decorated by formatter or not
     *
     * @see {setDecorated}
     *
     * @return {boolean}
     */
    public isDecorated(): boolean
    {
        return false;
    }
}