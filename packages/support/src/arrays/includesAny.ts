/**
 * Determine if array includes any (_some_) of the given values
 * 
 * @param {any[]} arr
 * @param {any[]} values
 * 
 * @return {boolean}
 */
export function includesAny(
    arr: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    values: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    return values.some((value) => arr.includes(value));
}