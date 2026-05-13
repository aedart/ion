import { ConstructorLike } from '@aedart/contracts';
import { MetaCallback } from '@aedart/contracts/support/meta/index.js';
import { Key } from '@aedart/contracts/support/types.js';
import { set } from '../objects/set.js';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { findOrCreateMemberAddress } from './findOrCreateMemberAddress.js';
import { flush } from './flush.js';
import { getOrCreateRepository } from './getOrCreateRepository.js';
import { registerAddress } from './registerAddress.js';
import { MEMBER_TO_METADATA } from './registries.js';
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

        // 1. Ensure metadata object exists on the context
        // @ts-expect-error: metadata might not be in the context type yet
        context.metadata ??= Object.create(null);
        const metadataObj = (context as ClassDecoratorContext).metadata;

        // 2. Resolve key and value
        const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);

        // 3. If it's a class decorator, we can flush everything immediately
        if (isClass) {
            getOrCreateRepository(target as object).set(key, val);
            flush(target as ConstructorLike, metadataObj);

            return;
        }

        // 4. Find or create member address (in this case without the "owner context", which is resolved later).
        const memberAddress = findOrCreateMemberAddress(target, context);

        // Generate a full path (from address) so it can be stored / staged...
        let pathParts = memberAddress.path(key) as PropertyKey[];
        if (!Array.isArray(pathParts)) {
            pathParts = [pathParts];
        }

        // Fail if any path segment is unsafe. This is needed because `set()` ignores
        // any unsafe path.
        const partsLen = pathParts.length;
        for (let i = 0; i < partsLen; i++) {
            if (isKeyUnsafe(pathParts[i])) {
                throw new TypeError(`Unsafe metadata key/path detected: ${String(key)}`);
            }
        }

        // 5. If it's a member decorator, stage the metadata
        set(metadataObj, pathParts, val);

        // 6. Link the member to the metadata object for discovery
        // For methods, target is the function. For fields, it's undefined (in 2023-11).
        if (target !== undefined && target !== null) {
            MEMBER_TO_METADATA.set(target, metadataObj);
        }

        // 7. Use addInitializer to flush metadata.
        // For static members, this runs during class definition.
        // For instance members, this runs during instantiation.
        context.addInitializer(function(this: unknown)
        {
            const constructor = isStatic
                ? this as ConstructorLike
                : ((this as object).constructor
                    ?? (Object.getPrototypeOf(this) as object | undefined)?.constructor) as
                        | ConstructorLike
                        | undefined;

            if (constructor) {
                flush(constructor, metadataObj);

                // Save the target (member) address, for the given owner.
                // This will enable meta lookups, using the member directly.
                if (context.kind === 'method') {
                    registerAddress(constructor, target as object, memberAddress);
                }
            }
        });
    };
}
