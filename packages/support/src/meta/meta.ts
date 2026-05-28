import { ConstructorLike } from '@aedart/contracts';
import { MetaCallback } from '@aedart/contracts/support/meta/index.js';
import { Key } from '@aedart/contracts/support/types.js';
import { findOrCreateMemberAddress } from './findOrCreateMemberAddress.js';
import { getOrCreateRepository } from './getOrCreateRepository.js';
import { registerAddress } from './registerAddress.js';
import { resolveKeyValue } from './resolveKeyValue.js';

/**
 * Store metadata on a class or class member.
 *
 * @param {Key | MetaCallback} keyOrCallback
 * @param {unknown} [value]
 *
 * @returns {(target: any, context: ClassDecoratorContext | ClassMemberDecoratorContext) => void}
 */
export function meta(keyOrCallback: Key | MetaCallback, value?: unknown)
{
    return function(
        target: unknown,
        context: ClassDecoratorContext | ClassMemberDecoratorContext,
    ): void
    {
        const isClass = context.kind === 'class';
        const isStatic = (context as ClassMemberDecoratorContext).static ?? false;

        // Resolve key and value
        const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);

        // If it's a class decorator, we can flush everything immediately
        if (isClass) {
            getOrCreateRepository(target as object).set(key, val);
            return;
        }

        // Find or create member address (in this case without the "owner context", which is resolved later).
        const memberAddress = findOrCreateMemberAddress(target, context);

        // Generate a full path (from address) so it can be stored / staged...
        let pathParts = memberAddress.path(key) as PropertyKey[];
        if (!Array.isArray(pathParts)) {
            pathParts = [ pathParts ];
        }

        // Use addInitializer to flush metadata.
        context.addInitializer(function(this: unknown)
        {
            // Resolve the constructor using `this` argument.
            const constructor = isStatic
                ? this as ConstructorLike
                : ((this as object).constructor
                    ?? (Object.getPrototypeOf(this) as object | undefined)?.constructor) as
                        | ConstructorLike
                        | undefined;
            
            if (!constructor) {
                return;
            }

            getOrCreateRepository(constructor).set(pathParts, val);

            // Skip kind is a "field" (in which case target will be undefined)
            if (context.kind === 'field') {
                return;
            }

            // Save the target (member) address
            registerAddress(constructor, target as object, memberAddress);
            
            // Link final member version for discovery
            const descriptor = !isStatic
                ? Reflect.getOwnPropertyDescriptor(constructor.prototype, context.name)
                : Reflect.getOwnPropertyDescriptor(constructor, context.name);

            if (descriptor === undefined) {
                return;
            }

            const proto = (() => {
                switch (context.kind) {
                    case 'method':
                        return descriptor.value as object;
                    case 'accessor':
                        return descriptor as object;
                    case 'setter':
                        return descriptor.set as object;
                    case 'getter':
                        return descriptor.get as object;
                    default:
                        return undefined;
                }
            })();

            if (proto !== undefined && proto !== target) {
                registerAddress(constructor, proto, memberAddress);
            }
        });
    };
}
