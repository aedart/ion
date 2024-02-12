import type { MixinFunction } from "@aedart/contracts/support/mixins";
import { APPLIED_MIXIN } from "@aedart/contracts/support/mixins";
import { unwrap } from "./unwrap";

/**
 * Applies mixin to superclass
 * 
 * @param {object} superclass
 * @param {MixinFunction} mixin
 * 
 * @returns {object}
 */
export function apply(superclass: object, mixin: MixinFunction): object
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    const application: object = mixin(superclass);
    
    Reflect.set(application.prototype, APPLIED_MIXIN, unwrap(mixin));
    
    return application;
}