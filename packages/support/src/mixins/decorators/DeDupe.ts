import type { MixinFunction } from "@aedart/contracts/support/mixins";
import { wrap } from "../wrap.js";
import { hasMixin } from "../hasMixin.js";

/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 * 
 * Decorates mixin such that it is only applied if not already on the superclass'
 * prototype chain.
 *
 * @param {MixinFunction} mixin
 * 
 * @returns {MixinFunction}
 */
export const DeDupe = function(mixin: MixinFunction): MixinFunction
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    return wrap(mixin, (superclass) => {
        return hasMixin(superclass.prototype, mixin)
            ? superclass
            : mixin(superclass);
    });
}