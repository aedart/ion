import { MetaCallback, MetaEntry } from '@aedart/contracts/support/meta/index.js';
import { Key } from '@aedart/contracts/support/types.js';

/**
 * Resolve key and value from the given arguments.
 *
 * @param {Key | MetaCallback} koc Key or Callback
 * @param {unknown} v Value
 * @param {unknown} target The target 
 * @param {ClassDecoratorContext | ClassMemberDecoratorContext} context
 *
 * @returns {{ key: Key, val: unknown }}
 *
 * @internal
 */
export function resolveKeyValue(
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
