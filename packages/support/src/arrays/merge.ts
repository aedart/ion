import { ArrayMergeError } from "./exceptions";

/**
 * Merge two or more arrays
 * 
 * **Note**: _Method attempts to deep copy array values, via [structuredClone]{@link https://developer.mozilla.org/en-US/docs/Web/API/structuredClone}_
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable
 * 
 * @param {...any[]} sources
 * 
 * @return {any[]}
 * 
 * @throws {ArrayMergeError} If unable to merge arrays, e.g. if a value cannot be cloned via `structuredClone()` 
 */
export function merge(
    ...sources: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
): any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
{
    try {
        // Array.concat only performs shallow copies of the array values, which might
        // fine in some situations. However, this version must ensure to perform a
        // deep copy of the values...
        
        return structuredClone([].concat(...sources));
    } catch (e) {
        const reason: string = (typeof e == 'object' && Reflect.has(e, 'message'))
                ? e.message
                : 'unknown reason'; 
        
        throw new ArrayMergeError('Unable to merge arrays: ' + reason, {
            cause: {
                previous: e,
                sources: sources
            }
        });
    }
}