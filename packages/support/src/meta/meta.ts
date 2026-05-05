import { ConstructorLike } from '@aedart/contracts';
import { MetaCallback, MetaEntry } from '@aedart/contracts/support/meta/index.js';
import { Key } from '@aedart/contracts/support/types.js';
import { flush } from './flush.js';
import { getOrCreateRepository } from './getOrCreateRepository.js';
import { MEMBER_TO_METADATA } from './registry.js';

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

        // 4. If it's a member decorator, stage the metadata
        const kind = context.kind === 'method' ? 'methods' : 'fields';
        const prefix = isStatic ? 'static.' : '';
        const path = `${prefix}${kind}.${String(context.name)}.${String(key)}`;

        metadataObj[path] = val;

        // 5. Link the member to the metadata object for discovery
        // For methods, target is the function. For fields, it's undefined (in 2023-11).
        if (target !== undefined && target !== null) {
            MEMBER_TO_METADATA.set(target, metadataObj);
        }

        // 6. Use addInitializer to flush metadata.
        // For static members, this runs during class definition.
        // For instance members, this runs during instantiation.
        context.addInitializer(function(this: unknown)
        {
            const constructor = isStatic
                ? this
                : ((this as object).constructor ?? Object.getPrototypeOf(this)?.constructor);

            if (constructor) {
                flush(constructor as ConstructorLike, metadataObj);
            }
        });
    };
}

/**
 * Resolve key and value from the given arguments.
 *
 * @param {Key | MetaCallback} koc
 * @param {unknown} v
 * @param {unknown} target
 * @param {ClassDecoratorContext | ClassMemberDecoratorContext} context
 *
 * @returns {{ key: Key, val: unknown }}
 */
function resolveKeyValue(
    koc: Key | MetaCallback,
    v: unknown,
    target: unknown,
    context: ClassDecoratorContext | ClassMemberDecoratorContext,
)
{
    if (typeof koc === 'function') {
        const entry: MetaEntry = koc(target as object, context);

        return { key: entry.key, val: entry.value };
    }

    return { key: koc, val: v };
}
