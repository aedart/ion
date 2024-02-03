import type { ClassDecorator } from "@aedart/contracts/support/mixins";

// TODO: ...
export function mixin(...mixins: ClassDecorator[])
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
            mixin: ClassDecorator<typeof superclass>
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