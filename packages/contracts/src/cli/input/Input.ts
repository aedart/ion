import Definition from "./Definition";

/**
 * Input
 * 
 * This component is an adaptation of Symfony Console's `InputInterface` - Copyright Fabien Potencier
 * 2004-present, MIT License.
 * 
 * @see https://github.com/symfony/console/blob/7.1/Input/InputInterface.php
 */
export default interface Input
{
    /**
     * Bind given Input Definition to this input
     * 
     * @param {Definition} [definition] Defaults to already bound definition,
     *                                  if none given and an existing definition
     *                                  is available.
     * 
     * @return {this}
     */
    bind(definition?: Definition): this;

    /**
     * Validate the input
     * 
     * @throws {Error}
     * 
     * @return {this}
     */
    validate(): this;

    /**
     * Set value for given argument
     * 
     * @param {string} name
     * @param {string | number | boolean | (string | number | boolean)[] | null} value
     * 
     * @return {this}
     *
     * @throws {TypeError} If argument does not exist
     */
    setArgument(name: string, value: string | number | boolean | (string|number|boolean)[] | null): this;
    
    /**
     * Get value for given argument
     *
     * @template T = string | number | boolean | (string|number|boolean)[] | null
     *
     * @param {string} name
     *
     * @return {T}
     *
     * @throws {TypeError} If argument does not exist
     */
    getArgument<
        T = string | number | boolean | (string|number|boolean)[] | null
    >(name: string): T;
    
    /**
     * Determine if input argument exists
     *
     * @param {string} name
     *
     * @return {boolean}
     */
    hasArgument(name: string): boolean;
    
    /**
     * Input arguments merged with their default values
     * 
     * @type {Map<string, string | number | boolean | (string | number | boolean)[] | null>}
     */
    get arguments(): Map<string, string | number | boolean | (string|number|boolean)[] | null>;

    /**
     * Set value for given option
     * 
     * @param {string} name
     * @param {string | number | boolean | (string | number | boolean)[] | null} value
     * 
     * @return {this}
     *
     * @throws {TypeError} If option does not exist
     */
    setOption(name: string, value: string | number | boolean | (string|number|boolean)[] | null): this;

    /**
     * Get value for given option
     *
     * @template T = string | number | boolean | (string|number|boolean)[] | null
     *
     * @param {string} name
     *
     * @return {T}
     *
     * @throws {TypeError} If option does not exist
     */
    getOption<
        T = string | number | boolean | (string|number|boolean)[] | null
    >(name: string): T;

    /**
     * Determine if input option exists
     *
     * @param {string} name
     *
     * @return {boolean}
     */
    hasOption(name: string): boolean;
    
    /**
     * Input options merged with their default values
     * 
     * @type {Map<string, string | number | boolean | (string | number | boolean)[] | null>}
     */
    get options(): Map<string, string | number | boolean | (string|number|boolean)[] | null>;
}