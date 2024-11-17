import type { OptionType } from "../types";

/**
 * Input Option
 * 
 * Adaptation of Symfony Console's `InputOption`
 * 
 * @see https://github.com/symfony/console/blob/7.1/Input/InputOption.php
 */
export default interface Option
{
    /**
     * Name of this option
     *
     * @type {string}
     */
    get name(): string;

    /**
     * Single character alias for the option
     * 
     * @returns {string | undefined}
     */
    get short(): string | undefined;
    
    /**
     * Short description of this option
     *
     * @type {string}
     */
    get description(): string;

    /**
     * The value datatype for this option
     * 
     * @type {OptionType}
     */
    get type(): OptionType;
    
    /**
     * Determine if this option is required
     *
     * @returns {boolean}
     */
    isRequired(): boolean;

    /**
     * Opposite of {@link isRequired}
     *
     * @returns {boolean}
     */
    isOptional(): boolean;

    /**
     * Determine if this option accepts multiple values
     *
     * @returns {boolean}
     */
    isArray(): boolean;

    /**
     * Set default value of this option
     *
     * @param {string | number | boolean | (string | number | boolean)[] | null} [value]
     *
     * @returns {this}
     */
    setDefault(value?: string | number | boolean | (string|number|boolean)[] | null): this;

    /**
     * Get the default value of this option
     *
     * @returns {string | number | boolean | (string | number | boolean)[] | null}
     */
    getDefault(): string | number | boolean | (string|number|boolean)[] | null;
}