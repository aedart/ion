import type { Constructor } from "@aedart/contracts";
import { TYPED_ARRAY_PROTOTYPE } from "@aedart/contracts/support/reflections";

/**
 * Determine if an object value can be cloned via `structuredClone()`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
 *
 * @internal
 *
 * @param {object} value
 *
 * @return {boolean}
 */
export function canCloneUsingStructuredClone(value: object): boolean
{
    const supported = [
        // Array, // Handled by array, with evt. array value merges
        ArrayBuffer,
        Boolean,
        DataView,
        Date,
        Error,
        Map,
        Number,
        // Object, // Handled by "basic" objects merging...
        // (Primitive Types), // Also handled elsewhere...
        RegExp,
        Set,
        String,
        TYPED_ARRAY_PROTOTYPE
    ];

    for (const constructor of supported) {
        if (value instanceof (constructor as Constructor)) {
            return true;
        }
    }

    return false;
}