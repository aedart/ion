/**
 * Determine if given argument is a class constructor.
 *
 * @param {unknown} value The value to check.
 *
 * @returns {boolean}
 */
export function isClassConstructor(value: unknown): boolean
{
    if (typeof value !== 'function') {
        return false;
    }

    // Access string once via prototype to be safe from shadowed toString methods
    const fnStr = Function.prototype.toString.call(value);

    // O(1) check for 'class' keyword; fallback to regex only for leading whitespace
    return fnStr.startsWith('class ') || /^\s*class\b/.test(fnStr);
}
