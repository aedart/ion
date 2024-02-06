import type { Mixin } from "@aedart/contracts/support/mixins";
import { wrap } from "../wrap";
import { hasMixin } from "../hasMixin";

/**
 * Decorates mixin such that it is only applied if not already on the superclass'
 * prototype chain.
 *
 * @param {Mixin} mixin
 * 
 * @returns {Mixin}
 */
export const DeDupe = function(mixin: Mixin): Mixin
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    return wrap(mixin, (superclass: object) => {
        return hasMixin(superclass.prototype, mixin)
            ? superclass
            : mixin(superclass);
    });
}