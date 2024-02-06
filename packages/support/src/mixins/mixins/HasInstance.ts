import type { Mixin } from "@aedart/contracts/support/mixins";
import { hasMixin } from "../hasMixin";

/**
 * Adds {@link Symbol.hasInstance} to mixin, if not already in mixin
 * 
 * @param {Mixin} mixin
 * 
 * @returns {Mixin}
 */
export const HasInstance = function(mixin: Mixin): Mixin
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    if (!Reflect.has(mixin, Symbol.hasInstance)) {
        Reflect.defineProperty(mixin, Symbol.hasInstance, {
            value(instance) {
                return hasMixin(instance, mixin);
            },
        })
    }
    
    return mixin;
}