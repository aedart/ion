import type { Constructor } from '@aedart/contracts';
import type { MixinFunction } from '@aedart/contracts/support/mixins';

/**
 * @deprecated Since 0.15.0, Mixins submodule will be removed in future versions
 *
 * Mixin Builder
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins
 * @see https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 * @see https://justinfagnani.com/2016/01/07/enhancing-mixins-with-decorator-functions/
 *
 * @template T = object
 */
export default class Builder<T = object>
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js

    /**
     * The target superclass
     *
     * @template T = object
     *
     * @type {Constructor<T>}
     *
     * @protected
     */
    protected readonly _superclass: Constructor<T>;

    /**
     * Create a new Mixin Builder instance
     *
     * @param {Constructor<T>} [superclass=class {}]
     */
    constructor(superclass: Constructor<T> = class {} as Constructor<T>)
    {
        this._superclass = superclass;
    }

    /**
     * Apply given mixins to the superclass
     *
     * @param {...MixinFunction} mixins
     *
     * @return {Constructor<T>} Subclass of given superclass with given mixins applied
     */
    public with(...mixins: MixinFunction[]): Constructor<T>
    {
        return mixins.reduce((
            superclass: Constructor,
            mixin: MixinFunction<typeof superclass>,
        ) => {
            // Return superclass, when mixin isn't a function.
            if (typeof mixin != 'function') {
                return superclass;
            }

            // Apply the mixin...
            return mixin(superclass);
        }, this._superclass as Constructor) as Constructor<T>;
    }

    /**
     * Returns the superclass
     *
     * **Note**: _Method is intended for testing purposes only, or situations when
     * no mixins are desired applied!_
     *
     * @param {...MixinFunction} [mixins] Ignored
     *
     * @return {ConstructorLike<T>} The superclass
     */
    public none(
        ...mixins: MixinFunction[] /* eslint-disable-line @typescript-eslint/no-unused-vars */
    ): Constructor<T>
    {
        return this._superclass;
    }
}
