import type { Mixin } from "@aedart/contracts/support/mixins";
import { WRAPPED_MIXIN } from "@aedart/contracts/support/mixins";

/**
 * Unwrap the given wrapped mixin
 *
 * @param {Mixin} wrapped A wrapped mixin produced by the {@link import('@aedart/support/mixins').wrap} function
 *
 * @returns {Mixin}
 */
export function unwrap(wrapped: Mixin): Mixin
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    if (Reflect.has(wrapped, WRAPPED_MIXIN)) {
        return wrapped[WRAPPED_MIXIN];
    }

    return wrapped;
}