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
     * @type {string | null}
     */
    get short(): string | null;
    
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
     * Determine if this option accepts a value
     * 
     * @returns {boolean} True if option requires a value, or if {@link type}
     *                    is not set to `boolean`.
     */
    acceptsValue(): boolean;
    
    /**
     * Determine if this option requires a value
     * 
     * @returns {boolean}
     */
    isValueRequired(): boolean;

    /**
     * Opposite of {@link isValueRequired}
     * 
     * @returns {boolean}
     */
    isValueOptional(): boolean;
    
    /**
     * Determine if option is negatable
     * 
     * **Note**: _If `true`, allows explicitly setting boolean
     * option to `false` by prefixing the option name with `--no-`,
     * e.g. `--no-print`_
     * 
     * @returns {boolean}
     */
    isNegatable(): boolean;
    
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