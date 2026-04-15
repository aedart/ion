import type { MixinFunction } from "@aedart/contracts/support/mixins";
import { isApplicationOf } from "./isApplicationOf.js";

/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 * 
 * Determine if given target has an application of given `mixin` on its prototype
 * chain.
 * 
 * @param {object} target
 * @param {MixinFunction} mixin
 * 
 * @returns {boolean}
 */
export function hasMixin(target: object, mixin: MixinFunction): boolean
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    let t: object|null = target;
    while(t !== null) {
        if (isApplicationOf(t, mixin)) {
            return true;
        }

        t = Reflect.getPrototypeOf(t);
    }
    
    return false;
}