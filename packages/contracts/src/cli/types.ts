/**
 * Parameters accepted by a static `make()` method for an Input Argument
 * 
 * @see {Argument}
 */
export type ArgumentParams = {

    /**
     * Short description of the argument
     */
    description: string,

    /**
     * If the argument is required
     */
    required: boolean,

    /**
     * If the argument accepts multiple values
     */
    isArray: boolean,

    /**
     * Default value of the argument
     */
    defaultValue?: string | number | boolean | (string|number|boolean)[] | null,
};

/**
 * The value datatype for an input option
 */
export type OptionType = 'string' | 'boolean' | 'number'; 