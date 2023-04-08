/**
 * Return the default string description of an object
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * 
 * @param {any} value 
 * 
 * @returns {string}
 */
export function getTag(
    value: any /* eslint-disable-line @typescript-eslint/no-explicit-any */
): string
{
    return Object.prototype.toString.call(value);
}