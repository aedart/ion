import { Key } from '@aedart/contracts/support';
import { MetaCallback, MetaEntry } from '@aedart/contracts/support/meta';
import { getOrCreateRepository } from './getOrCreateRepository.js';

/**
 * Store metadata on a class or class member.
 */
export function meta(keyOrCallback: Key | MetaCallback, value?: any)
{
    return function(target: any, context: DecoratorContext)
    {
        const isClass = context.kind === 'class';

        // 1. Immediate resolution for classes
        if (isClass) {
            const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);
            getOrCreateRepository(target).set(key, val);
            return;
        }

        // 2. Initializer-based resolution for all members
        context.addInitializer(function(this: any)
        {
            const owner = context.static
                ? this
                : (this.prototype ?? Object.getPrototypeOf(this) ?? this);

            const repo = getOrCreateRepository(owner);
            const { key, val } = resolveKeyValue(keyOrCallback, value, target, context);

            // Differentiate namespace based on static flag
            const kind = context.kind === 'method'
                ? 'methods'
                : 'fields';

            const namespace = context.static
                ? `static.${kind}`
                : kind;
            
            repo.set(`${namespace}.${String(context.name)}.${String(key)}`, val);
        });
    };
}

function resolveKeyValue(koc: Key | MetaCallback, v: any, target: any, context: DecoratorContext)
{
    if (typeof koc === 'function') {
        const entry: MetaEntry = (koc as MetaCallback)(target, context);
        return { key: entry.key, val: entry.value };
    }
    return { key: koc, val: v };
}
