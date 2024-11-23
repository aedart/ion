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

/**
 * Parameters accepted by a static `make()` method for an Input Option
 *
 * @see {Option}
 */
export type OptionParams = {

    /**
     * Short description of the option
     */
    description: string,

    /**
     * Single character alias for the option
     */
    short: string | null,

    /**
     * Value datatype for the option
     */
    type: OptionType,

    /**
     * If this option accepts a value
     */
    acceptsValue: boolean,

    /**
     * If option is negatable
     *
     * **Note**: _If `true`, allows explicitly setting boolean
     * option to `false` by prefixing the option name with `--no-`,
     * e.g. `--no-print`_
     */
    negatable: boolean,

    /**
     * If the option is required
     */
    required: boolean,

    /**
     * If the option accepts multiple values
     */
    isArray: boolean,

    /**
     * Default value of the option
     */
    defaultValue?: string | number | boolean | (string|number|boolean)[] | null,
};