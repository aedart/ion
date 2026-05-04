/**
 * Return the default string description of an object.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 *
 * @param {unknown} value - The value to retrieve the string tag for.
 *
 * @returns {string} The `[object Tag]` string produced by `Object.prototype.toString`.
 */
export function descTag(value: unknown): string
{
    return Object.prototype.toString.call(value);
}
