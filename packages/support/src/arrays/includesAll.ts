/**
 * Determine if array includes all given values
 * 
 * @param {any[]} arr
 * @param {any[]} values
 * 
 * @return {boolean}
 */
export function includesAll(
    arr: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    values: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    return values.every((value) => arr.includes(value));
}