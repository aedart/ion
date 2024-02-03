import type { Mixin } from "@aedart/contracts/support/mixins";

/**
 * Mixin one or more classes into the superclass
 *
 * **Note**: _Method is intended to be used as a decorator!_
 * 
 * @param {...Mixin} mixins
 * 
 * @returns {(target: object, context: DecoratorContext) => (void | ((initialValue: unknown) => unknown) | undefined)}
 * 
 * @throws {TypeError}
 */
export function mixin(...mixins: Mixin[])
{
    // Fail if no mixins are provided.
    if (arguments.length == 0) {
        throw new TypeError(`@mixin() must be given at least one class decorator (mixin) as argument`);
    }
    
    return (target: object, context: DecoratorContext) => {
        // Fail if target is not a class
        if (context.kind !== 'class') {
            throw new TypeError(`@mixin() can only by applied on classes - "${context.kind}" is not support`);
        }

        return mixins.reduce((
            superclass: typeof target,
            mixin: Mixin<typeof superclass>
        ) => {
            // Return superclass, when mixin isn't a function.
            if (typeof mixin != 'function') {
                return superclass;
            }
            
            // TODO: Prevent mixin, if already mixed into the superclass!
                // TODO: What about the "instance of" checks?

            // Perform actual mixin and return resulting class...
            return mixin(superclass);
        }, target);
    };
}