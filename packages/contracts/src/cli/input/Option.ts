import ValueMode from './ValueMode';

/**
 * Input Option
 * 
 * Adaptation of Symfony Console's `InputOption` - Copyright Fabien Potencier 2004-present, MIT License.
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
     * Single character aliases for this option
     * 
     * @returns {string[]}
     */
    get shortcuts(): string[];
    
    /**
     * Short description of this option
     *
     * @type {string}
     */
    get description(): string;

    /**
     * The value mode of this option
     * 
     * @type {ValueMode}
     */
    get valueMode(): ValueMode;
    
    /**
     * Determine if option accepts a value when used
     * 
     * @return {boolean}
     */
    acceptsValue(): boolean;
    
    /**
     * Determine if value is required, when option is used
     *
     * @returns {boolean}
     */
    isValueRequired(): boolean;

    /**
     * Determine if value is optional, when option is used
     *
     * @returns {boolean}
     */
    isValueOptional(): boolean;

    /**
     * Determine if option allows passing a negated variant, e.g. --ansi or --no-ansi
     * 
     * @return {boolean}
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