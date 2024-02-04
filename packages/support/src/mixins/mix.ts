import type { Mixin } from "@aedart/contracts/support/mixins";

/**
 * Mix target class with one or more Abstract subclasses ("Mixins")
 *
 * **Note**: _Method is intended to be used as a decorator!_
 * 
 * @see https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 * 
 * @param {...Mixin} mixins
 * 
 * @returns {(target: object, context: DecoratorContext) => (void | ((initialValue: unknown) => unknown) | undefined)}
 * 
 * @throws {TypeError}
 */
export function mix(...mixins: Mixin[])
{
    // The following code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
    // @see https://github.com/justinfagnani/mixwith.js
    
    // Fail if no mixins are provided.
    if (arguments.length == 0) {
        throw new TypeError(`@mix() must be given at least one abstract subclass (mixin) as argument`);
    }
    
    return (target: object, context: DecoratorContext) => {
        // Fail if target is not a class
        if (context.kind !== 'class') {
            throw new TypeError(`@mix() can only by applied on a class - "${context.kind}" is not support`);
        }

        // It is important that given mixins are used to decorate the target's parent class and not
        // the target itself. Therefore, we obtain the parent class or simply create a class, if
        // no parent is available.
        const parent: object = resolveParentOf(target);
        
        // Decorate the parent with given mixins.
        const superclass: object = mixins.reduce((
            superclass: typeof parent,
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
        }, parent);

        // Finally, change target to inherit from the "superclass" and return it.
        return mergeClasses(target, superclass);
    };
}

/**
 * Sets the prototype of given target to that of given superclass
 * 
 * @param {object} target
 * @param {object} superclass
 * 
 * @returns {object}
 */
function mergeClasses(target: object, superclass: object): object
{
    Reflect.setPrototypeOf(target.prototype, superclass.prototype);

    return target;
}

/**
 * Returns the parent class of given target object
 * 
 * @param {object} target
 * 
 * @returns {object} Target's parent class or a new class
 *                   if none is available
 */
function resolveParentOf(target: object): object
{
    return (Reflect.getPrototypeOf(target) !== Reflect.getPrototypeOf(Function))
        ? Reflect.getPrototypeOf(target)
        : class {};
}