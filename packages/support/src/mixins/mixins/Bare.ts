import type { Mixin } from "@aedart/contracts/support/mixins";
import { wrap } from "../wrap";
import { apply } from "../apply";

/**
 * Decorates given mixin such that it can be used by {@link import('@aedart/support/mixins').isApplicationOf},
 * {@link import('@aedart/support/mixins').hasMixin} and other mixin utility methods
 * 
 * @param {Mixin} mixin
 * 
 * @returns {Mixin}
 */
export const Bare = function(mixin: Mixin): Mixin
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    return wrap(mixin, (superclass: object) => {
        return apply(superclass, mixin);
    });
}