import { ConstructorLike } from '@aedart/contracts';
import { isConstructor } from '../reflections/isConstructor.js';
import { flush } from './flush.js';
import { FLUSHED_METADATA, MEMBER_TO_METADATA } from './registry.js';

/**
 * Discovers and flushes staged metadata for the given target.
 *
 * @param {unknown} target
 *
 * @internal
 */
export function discoverAndFlush(target: unknown): void
{
    // A. Try to find the constructor (owner)
    const constructor = isConstructor(target) ? target : (target as object)?.constructor;
    if (!isConstructor(constructor)) {
        return;
    }

    // B. Check Symbol.metadata
    const staged = (constructor as ConstructorLike)[Symbol.metadata];
    if (staged !== undefined && !FLUSHED_METADATA.has(staged as Record<string, unknown>)) {
        return flush(constructor as ConstructorLike, staged as Record<string, unknown>);
    }

    // C. Discovery Fallback: Scan members for a link to the metadata object
    // We scan both static members (on constructor) and instance members (on prototype)
    const sources = [constructor, (constructor as ConstructorLike).prototype];
    for (let i = 0, len = sources.length; i < len; i++) {
        const source = sources[i];
        if (!source) {
            continue;
        }

        const keys = Reflect.ownKeys(source);
        for (let j = 0, keysLen = keys.length; j < keysLen; j++) {
            const key = keys[j];

            // Optimization: skip known non-member properties
            if (
                key === 'constructor' || key === 'prototype' || key === 'length' || key === 'name'
            ) {
                continue;
            }

            const descriptor = Object.getOwnPropertyDescriptor(source, key);
            if (descriptor === undefined) {
                continue;
            }

            const val = descriptor.value;
            if (typeof val === 'function' && MEMBER_TO_METADATA.has(val)) {
                const metadataObj = MEMBER_TO_METADATA.get(val);
                if (metadataObj) {
                    return flush(constructor as ConstructorLike, metadataObj);
                }
            }
        }
    }
}
