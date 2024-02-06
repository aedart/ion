import type { Mixin } from "@aedart/contracts/support/mixins";
import { WRAPPED_MIXIN } from "@aedart/contracts/support/mixins";

/**
 * Setup given mixin to be wrapped by given `wrapper` and allow
 * it to be unwrapped at a later point.
 *
 * @param {Mixin} mixin
 * @param {Mixin} wrapper
 *
 * @returns {Mixin}
 */
export function wrap(mixin: Mixin, wrapper: Mixin): Mixin
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    Reflect.setPrototypeOf(wrapper, mixin);

    if (!Reflect.has(mixin, WRAPPED_MIXIN)) {
        Reflect.set(mixin, WRAPPED_MIXIN, mixin);
    }

    return wrapper;
}