import type { MixinFunction } from "@aedart/contracts/support/mixins";
import { APPLIED_MIXIN } from "@aedart/contracts/support/mixins";
import { unwrap } from "./unwrap.js";

/**
 * Determine if object is a prototype created by the application of
 * `mixin` to a superclass.
 * 
 * @param {object} proto
 * @param {MixinFunction} mixin
 * 
 * @returns {boolean}
 */
export function isApplicationOf(proto: object, mixin: MixinFunction): boolean
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    return Reflect.has(proto, APPLIED_MIXIN)
        // @ts-expect-error APPLIED_MIXIN symbol is in proto at this point
        && proto[APPLIED_MIXIN] === unwrap(mixin);
}