/**
 * Input Argument
 * 
 * Adaptation of Symfony's `InputArgument` component.
 * 
 * @see https://github.com/symfony/console/blob/7.1/Input/InputArgument.php
 */
export default interface Argument
{
    /**
     * Name of this argument
     * 
     * @type {string}
     */
    get name(): string;

    /**
     * Short description of this argument
     * 
     * @type {string}
     */
    get description(): string;

    /**
     * Determine if this argument is required
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
     * Determine if this argument accepts multiple values
     * 
     * @returns {boolean}
     */
    isArray(): boolean;

    /**
     * Set default value of this argument
     * 
     * @param {string | number | boolean | (string | number | boolean)[] | null} [value]
     * 
     * @returns {this}
     */
    setDefault(value?: string | number | boolean | (string|number|boolean)[] | null): this;

    /**
     * Get the default value of this argument
     * 
     * @returns {string | number | boolean | (string | number | boolean)[] | null}
     */
    getDefault(): string | number | boolean | (string|number|boolean)[] | null;
}