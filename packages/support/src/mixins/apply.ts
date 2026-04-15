import type { Constructor } from '@aedart/contracts';
import type { MixinFunction } from '@aedart/contracts/support/mixins';
import { APPLIED_MIXIN } from '@aedart/contracts/support/mixins';
import { unwrap } from './unwrap.js';

/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 *
 * Applies mixin to superclass
 *
 * @param {Constructor} superclass
 * @param {MixinFunction} mixin
 *
 * @returns {Constructor}
 */
export function apply(superclass: Constructor, mixin: MixinFunction): Constructor
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js

    const application = mixin(superclass as Constructor);

    Reflect.set(application.prototype, APPLIED_MIXIN, unwrap(mixin));

    return application;
}
