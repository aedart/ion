/**
 * Determine if value is a {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#primitive_values primitive value}.
 * 
 * @param {unknown} value
 * 
 * @returns {boolean}
 */
export function isPrimitive(value: unknown): boolean
{
    return value !== Object(value);
}