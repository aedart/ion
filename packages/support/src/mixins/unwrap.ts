import type { MixinFunction } from "@aedart/contracts/support/mixins";
import { WRAPPED_MIXIN } from "@aedart/contracts/support/mixins";

/**
 * Unwrap the given wrapped mixin
 *
 * @param {MixinFunction} wrapped A wrapped mixin produced by the {@link import('@aedart/support/mixins').wrap} function
 *
 * @returns {MixinFunction}
 */
export function unwrap(wrapped: MixinFunction): MixinFunction
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    if (Reflect.has(wrapped, WRAPPED_MIXIN)) {
        return wrapped[WRAPPED_MIXIN];
    }

    return wrapped;
}