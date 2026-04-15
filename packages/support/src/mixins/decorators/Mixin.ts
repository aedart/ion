import type { MixinFunction } from "@aedart/contracts/support/mixins";
import { Bare } from "./Bare.js";
import { Cached } from "./Cached.js";
import { HasInstance } from "./HasInstance.js";
import { DeDupe } from "./DeDupe.js";

/**
 * Decorates given mixin to add deduplication, application caching, and instance of support
 * 
 * @param {MixinFunction} mixin
 * 
 * @returns {MixinFunction}
 */
export const Mixin = function(mixin: MixinFunction): MixinFunction
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    return DeDupe(Cached(HasInstance(Bare(mixin))));
}