import type { MixinFunction } from "@aedart/contracts/support/mixins";
import { wrap } from "../wrap";
import { apply } from "../apply";

/**
 * Decorates given mixin such that it can be used by {@link import('@aedart/support/mixins').isApplicationOf},
 * {@link import('@aedart/support/mixins').hasMixin} and other mixin utility methods
 * 
 * @param {MixinFunction} mixin
 * 
 * @returns {MixinFunction}
 */
export const Bare = function(mixin: MixinFunction): MixinFunction
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    return wrap(mixin, (superclass: object) => {
        return apply(superclass, mixin);
    });
}