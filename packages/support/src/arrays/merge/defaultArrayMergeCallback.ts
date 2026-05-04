import type { ArrayMergeCallback, ArrayMergeOptions } from '@aedart/contracts/support/arrays';
import { CLONE } from '@aedart/contracts/support/objects';

/**
 * Default Array Merge callback
 *
 * @param {unknown} element
 * @param {number} index
 * @param {unknown[]} array
 * @param {Readonly<ArrayMergeOptions>} options
 *
 * @return {unknown}
 */
export const defaultArrayMergeCallback: ArrayMergeCallback = function(
    element: unknown,
    index: number,
    array: unknown[],
    options: Readonly<ArrayMergeOptions>,
): unknown
{
    // 1. Transfer function if requested (functions are not cloneable)
    if (options.transferFunctions === true && typeof element === 'function') {
        return element;
    }

    // 2. Handle CLONE symbol if requested and available
    if (
        options.clone === true && element !== null && typeof element === 'object'
        && CLONE in element && typeof element[CLONE] === 'function'
    ) {
        return (element as { [CLONE]: () => unknown; })[CLONE]();
    }

    // 3. Fallback to structuredClone (Deep copy)
    // Note: This may throw if element contains non-cloneable types (e.g. functions)
    return structuredClone(element);
};
