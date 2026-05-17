import { type ConstructorLike} from "@aedart/contracts";
import { findOrCreateMemberAddress } from "./findOrCreateMemberAddress.js";
import { registerAddress } from "./registerAddress.js";
import Metadata from "./Metadata.js";
import { getNameOrDesc } from "../reflections/getNameOrDesc.js";

/**
 * Inherits metadata for a static overridden class member.
 *
 * If target does not have metadata, then this decorator does nothing.
 * 
 * @returns {(target: unknown, context: (ClassDecoratorContext | ClassMemberDecoratorContext)) => void}
 * 
 * @throws {TypeError} If target is a class, or if target is not static
 */
export function inheritMeta()
{
    return function(
        target: unknown,
        context: ClassDecoratorContext | ClassMemberDecoratorContext,
    ): void
    {
        // Abort if decorator used directly on class.
        if (context.kind === 'class') {
            throw new TypeError(`Invalid target class "${getNameOrDesc(target as ConstructorLike)} for inheritMeta(). Only static class members can inherit meta!"`);
        }
        
        // Abort if the member is NOT static.
        if (!context.static) {
            throw new TypeError(`Invalid target ${context.kind} "${String(context.name)}" for inheritMeta(). Member is not static!`);
        }
        
        // Find or create a member address for the target (without "owner context")
        const memberAddress = findOrCreateMemberAddress(target, context);
        
        // Using context.addInitializer, we determine the "owner" of the taget and attempt
        // to find if there is metadata defined for the target, in the inheritance chain.
        context.addInitializer(function(this: unknown) {

            const constructor = context.static
                ? this as ConstructorLike
                : ((this as object).constructor
                    ?? (Object.getPrototypeOf(this) as object | undefined)?.constructor) as
                    | ConstructorLike
                    | undefined;

            // Skip if there isn't a constructor available, or if of "field" kind (taget is `undefined`).
            if (!constructor || context.kind === 'field') {
                return;
            }

            // Skip if there is no metadata defined for the member.
            if (!Metadata.has(constructor, memberAddress.basePath)) {
                return;
            }

            // At this point, we know there is metadata for the member. Therefore, we simply register
            // the address in the same way as in the `@meta` decorator.
            registerAddress(constructor, target as object, memberAddress);
        });
    }
}