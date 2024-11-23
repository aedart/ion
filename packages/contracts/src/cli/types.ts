/**
 * Parameters accepted by the static `make()` method.
 */
export type ArgumentParams = {
    description: string,
    required: boolean,
    isArray: boolean,
    defaultValue?: string | number | boolean | (string|number|boolean)[] | null,
};

/**
 * The value datatype for an input option
 */
export type OptionType = 'string' | 'boolean' | 'number'; 