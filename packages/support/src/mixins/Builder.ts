import type { ConstructorOrAbstractConstructor } from "@aedart/contracts";
import type { MixinFunction } from "@aedart/contracts/support/mixins";

/**
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
     * @type {ConstructorOrAbstractConstructor<T>}
     * @private
     */
    readonly #superclass: ConstructorOrAbstractConstructor<T>;

    /**
     * Create a new Mixin Builder instance
     * 
     * @param {ConstructorOrAbstractConstructor<T>} [superclass=class {}]
     */
    constructor(superclass:ConstructorOrAbstractConstructor<T> = class {}) {
        this.#superclass = superclass;
    }

    /**
     * Apply given mixins to the superclass
     * 
     * @param {...MixinFunction} mixins
     * 
     * @return {ConstructorOrAbstractConstructor<T>} Subclass of given superclass with given mixins applied
     */
    public with(...mixins: MixinFunction[]): ConstructorOrAbstractConstructor<T>
    {
        return mixins.reduce((
            superclass: T,
            mixin: MixinFunction<typeof superclass>
        ) => {
            // Return superclass, when mixin isn't a function.
            if (typeof mixin != 'function') {
                return superclass;
            }

            // Apply the mixin...
            return mixin(superclass);
        }, this.#superclass);
    }

    /**
     * Returns the superclass
     * 
     * **Note**: _Method is intended for testing purposes only, or situations when
     * no mixins are desired applied!_
     * 
     * @param {...MixinFunction} [mixins] Ignored
     *
     * @return {ConstructorOrAbstractConstructor<T>} The superclass
     */
    public none(
        ...mixins: MixinFunction[] /* eslint-disable-line @typescript-eslint/no-unused-vars */
    ): ConstructorOrAbstractConstructor<T>
    {
        return this.#superclass;
    }
}