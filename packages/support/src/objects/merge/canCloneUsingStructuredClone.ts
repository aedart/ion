import type { Constructor } from '@aedart/contracts';
import { TYPED_ARRAY_PROTOTYPE } from '@aedart/contracts/support/reflections';

/**
 * Determine if an object value can be cloned via `structuredClone()`
 *
 * @see https://mozilla.org
 *
 * @internal
 *
 * @param {object} value
 *
 * @return {boolean}
 */
export function canCloneUsingStructuredClone(value: object): boolean
{
    // 1. Handle Typed Arrays separately using prototype checking
    if (TYPED_ARRAY_PROTOTYPE && Object.prototype.isPrototypeOf.call(TYPED_ARRAY_PROTOTYPE, value)) {
        return true;
    }

    // 2. List of standard constructors that support structured cloning
    const constructors = [
        ArrayBuffer,
        Boolean,
        DataView,
        Date,
        Error,
        Map,
        Number,
        RegExp,
        Set,
        String,
    ];

    // Performance: Standard index-based loop with cached length
    for (let i = 0, len = constructors.length; i < len; i++) {
        const candidate = constructors[i];

        if (value instanceof (candidate as Constructor)) {
            return true;
        }
    }

    return false;
}
