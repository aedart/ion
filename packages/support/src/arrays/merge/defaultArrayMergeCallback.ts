import type {ArrayMergeCallback, ArrayMergeOptions} from "@aedart/contracts/support/arrays";
import { CLONE } from "@aedart/contracts/support/objects";

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
export const defaultArrayMergeCallback: ArrayMergeCallback = function (
    element: any, /* eslint-disable-line @typescript-eslint/no-explicit-any */
    index: number,
    array: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    options: Readonly<ArrayMergeOptions>
): any /* eslint-disable-line @typescript-eslint/no-explicit-any */
{
    // 1. Transfer function if requested (functions are not cloneable)
    if (options.transferFunctions === true && typeof element === 'function') {
        return element;
    }

    // 2. Handle CLONE symbol if requested and available
    if (options.clone === true && element !== null && typeof element === 'object' && CLONE in element) {
        return element[CLONE]();
    }

    // 3. Fallback to structuredClone (Deep copy)
    // Note: This may throw if element contains non-cloneable types (e.g. functions)
    return structuredClone(element);
}