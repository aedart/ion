import type { ConstructorLike } from "@aedart/contracts";
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
     * @type {ConstructorLike<T>}
     * @private
     */
    readonly #superclass: ConstructorLike<T>;

    /**
     * Create a new Mixin Builder instance
     * 
     * @param {ConstructorLike<T>} [superclass=class {}]
     */
    constructor(superclass:ConstructorLike<T> = class {} as ConstructorLike<T>) {
        this.#superclass = superclass;
    }

    /**
     * Apply given mixins to the superclass
     * 
     * @param {...MixinFunction} mixins
     * 
     * @return {ConstructorLike<T>} Subclass of given superclass with given mixins applied
     */
    public with(...mixins: MixinFunction[]): ConstructorLike<T>
    {
        return mixins.reduce((
            superclass: ConstructorLike,
            mixin: MixinFunction<typeof superclass>
        ) => {
            // Return superclass, when mixin isn't a function.
            if (typeof mixin != 'function') {
                return superclass;
            }

            // Apply the mixin...
            return mixin(superclass);
        }, this.#superclass as ConstructorLike) as ConstructorLike<T>;
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
    ): ConstructorLike<T>
    {
        return this.#superclass;
    }
}