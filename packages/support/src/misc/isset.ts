/**
 * Determine if value(s) are different from `undefined` and `null`.
 *
 * @param {unknown} [value] - The first value to check.
 * @param {...unknown} [_values] - Additional values to check.
 *
 * @returns {value is NonNullable<unknown>} `true` if all values are neither `undefined` nor `null`.
 */
export function isset(value?: unknown, ..._values: unknown[]): value is NonNullable<unknown>
{
    // Fast path: named parameter access is faster than arguments object lookup
    if (value == null) {
        return false;
    }

    const len = arguments.length;
    if (len === 1) {
        return true;
    }

    // Secondary path: iterate through arguments object to avoid array allocation
    for (let i = 1; i < len; i++) {
        // eslint-disable-next-line prefer-rest-params
        if (arguments[i] == null) {
            return false;
        }
    }
    return true;
}