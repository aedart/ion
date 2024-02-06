import type { Mixin } from "@aedart/contracts/support/mixins";
import { Bare } from "./Bare";
import { Cached } from "./Cached";
import { HasInstance } from "./HasInstance";
import { DeDupe } from "./DeDupe";

/**
 * Decorates given mixin to add deduplication, application caching, and instance of support
 * 
 * @param {PrepareMixin} mixin
 * 
 * @returns {PrepareMixin}
 */
export const PrepareMixin = function(mixin: Mixin): Mixin
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    return DeDupe(Cached(HasInstance(Bare(mixin))));
}