/**
 * Determine if value(s) are different from undefined and null.
 *
 * @param {any} [value] The first value to check.
 * @param {...any} [values] Additional values to check.
 *
 * @returns {boolean}
 */
export function isset(value?: any, ...values: any[]): boolean
{
    // Fast Path: Named parameter access is faster than arguments object lookup
    if (value == null) {
        return false;
    }

    const len = arguments.length;
    if (len === 1) {
        return true;
    }

    // Secondary Path: Iterate through arguments object to avoid array allocation
    for (let i = 1; i < len; i++) {
        if (arguments[i] == null) {
            return false;
        }
    }

    return true;
}
