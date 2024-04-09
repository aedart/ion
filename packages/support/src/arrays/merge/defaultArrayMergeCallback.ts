import type { ArrayMergeCallback, ArrayMergeOptions } from "@aedart/contracts/support/arrays";

/**
 * Default Array Merge callback
 * 
 * @param {any} element
 * @param {number} index
 * @param {any[]} array
 * @param {Readonly<ArrayMergeOptions>} options
 * 
 * @return {any}
 */
export const defaultArrayMergeCallback: ArrayMergeCallback = function(
    element: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    index: number,
    array: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    options: Readonly<ArrayMergeOptions>
): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
{
    // Transfer function, if requested by options.
    if (options.transferFunctions) {
        return element;
    }
    
    // Otherwise, create a structured clone of the element
    return structuredClone(element);
}