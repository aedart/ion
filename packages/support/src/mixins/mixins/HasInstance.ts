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

    // Skip if mixin already has Symbol.hasInstance
    if (Object.hasOwn(mixin, Symbol.hasInstance)) {
        return mixin;
    }
    
    // Otherwise, define the Symbol.hasInstance
    return Object.defineProperty(mixin, Symbol.hasInstance, {
        value: (instance: object) => {
            return hasMixin(instance, mixin);
        },
    });
}