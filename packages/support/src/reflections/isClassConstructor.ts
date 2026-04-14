/**
 * Determine if given argument is a class constructor.
 *
 * Note: This function relies on `Function.prototype.toString()` reflecting the
 * original source text. In transpiled environments (e.g. TypeScript targeting
 * ES5, or Babel), classes are compiled down to regular functions, and this
 * function will return `false` for them.
 *
 * @param {unknown} value The value to check.
 *
 * @returns {boolean} `true` if the value is a class constructor, `false` otherwise.
 */
export function isClassConstructor(value: unknown): boolean
{
    if (typeof value !== 'function') {
        return false;
    }

    // Access string once via prototype to be safe from shadowed toString methods.
    // Function.prototype.toString always reflects the original source text per ECMA-262.
    const fnStr = Function.prototype.toString.call(value);

    // Fast path: O(1) native string checks for the two valid class prefixes.
    // Covers "class Foo" (named) and "class{" (anonymous, no space — valid JS).
    if (fnStr.startsWith('class ') || fnStr.startsWith('class{')) {
        return true;
    }

    // Fallback: defensive guard for leading whitespace.
    // Unlikely per spec, but handled safely for completeness.
    return /^\s*class[\s{]/.test(fnStr);
}
