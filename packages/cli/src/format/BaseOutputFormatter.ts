import type { OutputFormatter, Style } from "@aedart/contracts/cli";
import { AbstractClassError } from "@aedart/support/exceptions";

/**
 * Base Output Formatter
 *
 * This component is an adaptation of Symfony Console's `OutputFormatter` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 *
 * @see https://github.com/symfony/console/blob/7.2/Formatter/OutputFormatter.php
 * @see {import('@aedart/contracts/cli').OutputFormatter}
 * 
 * @abstract
 */
export default abstract class BaseOutputFormatter implements OutputFormatter
{
    /**
     * Map of all the styles available in this formatter
     * 
     * @type {Map<string, Style>}
     * 
     * @protected
     */
    protected styles: Map<string, Style>;

    /**
     * The decoration state of this formatter
     * 
     * @type {boolean}
     * 
     * @protected
     */
    protected decorated: boolean = false;

    /**
     * Create a new Output Formatter instance
     * 
     * @param {Record<string, Style>} [styles]
     * @param {boolean} [decorated]
     * 
     * @throws {AbstractClassError}
     */
    public constructor(styles: Record<string, Style> = {}, decorated: boolean = false)
    {
        if (new.target === BaseOutputFormatter) {
            throw new AbstractClassError(BaseOutputFormatter);
        }
        
        this.styles = new Map();
        this
            .setDecorated(decorated)
            .setStylesFromRecord(styles);
    }

    /**
     * Format given message according to given styles
     *
     * @param {string} [message]
     *
     * @return {string | undefined}
     */
    public format(message?: string): string|undefined
    {
        // TODO: ...
        
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
        this.styles.set(name, style);
        
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
        return this.styles.has(name);
    }

    /**
     * Returns the style that matches given name
     * 
     * @param {string} name
     *
     * @return {Style}
     *
     * @throws {TypeError} If not style exists for given name
     */
    public getStyle(name: string): Style
    {
        if (!this.hasStyle(name)) {
            throw new TypeError(`Undefined style: "${name}"`);
        }

        return this.styles.get(name) as Style;
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
        this.decorated = state;
        
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
        return this.decorated;
    }

    /**
     * Set multiple styles from given object
     *
     * @see {setStyle}
     *
     * @param {Record<string, Style>} styles
     *
     * @return {this}
     *
     * @protected
     */
    protected setStylesFromRecord(styles: Record<string, Style>): this
    {
        for (const [ name, style ] of Object.entries(styles)) {
            this.setStyle(name, style);
        }

        return this;
    }
}