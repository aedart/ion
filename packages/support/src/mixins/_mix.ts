import type { MixinFunction } from "@aedart/contracts/support/mixins";
import {Constructor} from "@aedart/contracts";

/**
 * @deprecated The @mix() class decorator does NOT work as desired.
 * 
 * TODO: Replace this class decorator with the original Mixin Builder (mix(object).with(...mixins))
 * 
 * Mix target class with one or more abstract subclasses ("Mixins")
 *
 * **Note**: _Method is intended to be used as a class decorator!_
 * 
 * @example:
 * ```ts
 * const BoxMixin = <T extends AbstractConstructor>(superclass: T) => class extends superclass {
 *      // ...not shown...
 * }
 * 
 * @mix(BoxMixin)
 * class A {}
 * ```
 * 
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends#mix-ins
 * @see https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/
 * @see https://justinfagnani.com/2016/01/07/enhancing-mixins-with-decorator-functions/
 * 
 * @param {...MixinFunction} mixins
 * 
 * @returns {(target: object, context: DecoratorContext) => (void | ((initialValue: unknown) => unknown) | undefined)}
 * 
 * @throws {TypeError}
 */
export function _mix(...mixins: MixinFunction[])
{
    // The following source code is an adaptation of Justin Fagnani's "mixwith.js" (Apache License 2.0)
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
            mixin: MixinFunction<typeof superclass>
        ) => {
            // Return superclass, when mixin isn't a function.
            if (typeof mixin != 'function') {
                return superclass;
            }
            
            // Apply the mixin...
            return mixin(superclass);
        }, parent);

        // Finally, change target to inherit from the "superclass" and return it.
        return extendTarget(target, superclass);
    };
}

/**
 * Extends the target with the given superclass
 * 
 * @param {object} target
 * @param {object} superclass
 * 
 * @returns {object}
 */
function extendTarget(target: object, superclass: object): object
{
    // If the target does not extend another class...
    if (Reflect.getPrototypeOf(target) === Reflect.getPrototypeOf(Function)) {
        // Then the @mix() has created a new class that applies one or more mixins.
        // However, their constructor(s) must be invoked (call to super()), which
        // can only be done via a Proxy, by trapping calls to the constructor.

        target = new Proxy(target, {
            construct(target, argArray, newTarget): object
            {
                // Mimic call to super(), with target as the newTarget, for the superclass
                // which has mixins applied.
                Reflect.construct(superclass as Constructor, argArray, target as Constructor);

                // Return new target instance...
                return Reflect.construct(target as Constructor, argArray, newTarget);
            }
        });
    }

    // Ensure correct inheritance chain.
    // @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor#changing_the_constructor_of_a_constructor_functions_prototype
    Reflect.setPrototypeOf(target.prototype, superclass.prototype);
    Reflect.setPrototypeOf(target, superclass);

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