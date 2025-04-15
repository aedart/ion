import type { Style } from "@aedart/contracts/cli";
import type { StyleTextCallback } from "../types";
import type { ChalkInstance } from "chalk";

/**
 * Chalk Style
 * 
 * An output formatter style, which uses "Chalk" to perform the actual styling.
 * 
 * @see {import('@aedart/contracts/cli').Style}
 * @see https://github.com/chalk/chalk
 */
export default class ChalkStyle implements Style
{
    /**
     * The underlying "driver" used for styling text
     * 
     * @type {ChalkInstance|null}
     * 
     * @protected
     */
    protected chalk: ChalkInstance|null = null;

    /**
     * Callback to be invoked when text must be styled
     * 
     * @type {StyleTextCallback}
     * 
     * @protected
     */
    protected styleCallback: StyleTextCallback;

    /**
     * Create a new output formatting "style" instance
     * 
     * @param {StyleTextCallback} callback
     * @param {ChalkInstance | null} [chalk]
     */
    public constructor(callback: StyleTextCallback, chalk: ChalkInstance|null = null)
    {
        this.styleCallback = callback;
        this.setDriver(chalk);
    }

    /**
     * Set the underlying "driver" used for styling text
     * 
     * @param {ChalkInstance | null} chalk
     * 
     * @return {this}
     */
    public setDriver(chalk: ChalkInstance|null): this
    {
        this.chalk = chalk;
        
        return this;
    }
    
    /**
     * Apply this formatting style to given text.
     *
     * @param {string} text
     *
     * @return {string}
     * 
     * @throws {LogicalError}
     */
    public apply(text: string): string
    {
        const callback = this.styleCallback;
        
        // NOTE: In case that chalk instance has not been specified,
        // then this can fail. However, for the sake of performance,
        // no additional "isset" check is performed here..
        return callback(text, this.chalk as ChalkInstance);
    }
}