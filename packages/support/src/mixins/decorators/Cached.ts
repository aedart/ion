import type { MixinFunction } from '@aedart/contracts/support/mixins';
import { CACHED_APPLICATIONS } from '@aedart/contracts/support/mixins';
import { wrap } from '../wrap.js';

/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 *
 * Decorates given mixin such that it caches its applications.
 *
 * Method ensures that when mixin is applied multiple times to the same
 * superclass, the mixin will only create one subclass, memoize it and return
 * it for each application.
 *
 * @see https://justinfagnani.com/2016/01/07/enhancing-mixins-with-decorator-functions/#cachingmixinapplications
 *
 * @param {MixinFunction} mixin
 *
 * @returns {MixinFunction}
 */
export const Cached = function(mixin: MixinFunction): MixinFunction
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js

    // @ts-expect-error superclass is, in this case, also the MixinFunction.
    return wrap(mixin, (superclass) => {
        // Attempt to resolve "cached applications" map, or make a new map if none exists in superclass...
        let cachedApplications: WeakMap<MixinFunction, object> | undefined =
            Reflect.has(superclass, CACHED_APPLICATIONS)
                // @ts-expect-error CACHED_APPLICATIONS is in superclass at this point
                ? superclass[CACHED_APPLICATIONS]
                : undefined;

        if (cachedApplications === undefined) {
            cachedApplications = new WeakMap<MixinFunction, object>();
            Reflect.set(superclass, CACHED_APPLICATIONS, cachedApplications);
        }

        // Retrieve the cached "application" from cache, or cache it...
        let application: object | undefined = cachedApplications.get(mixin);
        if (application === undefined) {
            application = mixin(superclass);
            cachedApplications.set(mixin, application);
        }

        return application as MixinFunction;
    });
};
