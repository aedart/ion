import type {Key} from "@aedart/contracts/support";
import type { Context } from "@aedart/contracts/support/meta";
import { set } from "@aedart/support/objects";

// TODO: This acts as a "fallback" metadata registry, when context.metadata is not available!
const registry: WeakMap<object, Record<string | number | symbol, unknown>> = new WeakMap<object, Record<string | number | symbol, unknown>>()

// TODO: The metadata symbol... we will need this when reading metadata from a target.
// const metadataSymbol = Symbol.for('metadata');

// TODO
export function meta(
    key: Key,
    value: unknown
) {
    return (
        target: object,
        context: Context
    ) => {
        // TODO: target is "undefined" for context.kind === 'field'
        // TODO: @see https://github.com/tc39/proposal-decorators#class-fields

        // Use default context.metadata, if it's available.
        if (Reflect.has(context, 'metadata') && typeof context.metadata === 'object') {
            set(context.metadata, key, value);
            return;
        }
        
        // Fallback, use custom "registry" for given target.
        let metadata: Record<string | number | symbol, unknown> = registry.get(target) ?? {}; /* eslint-disable-line prefer-const */
        set(metadata, key, value);
        registry.set(target, metadata);
    }
}