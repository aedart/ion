import type { MixinFunction } from "@aedart/contracts/support/mixins";
import { isApplicationOf } from "./isApplicationOf";

/**
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
    
    while(target !== null) {
        if (isApplicationOf(target, mixin)) {
            return true;
        }
        
        target = Reflect.getPrototypeOf(target);
    }
    
    return false;
}