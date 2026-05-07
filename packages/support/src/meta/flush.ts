import { ConstructorLike } from '@aedart/contracts';
import { getOrCreateBaseRepository } from './getOrCreateBaseRepository.js';
import { FLUSHED_METADATA } from './registry.js';

/**
 * Flush staged metadata into the repositories of the given owner.
 *
 * @param {ConstructorLike} owner The Class (constructor)
 * @param {Record<string, unknown>} staged The metadata object from decorator context
 *
 * @internal
 */
export function flush(owner: ConstructorLike, staged: Record<string, unknown>): void
{
    if (FLUSHED_METADATA.has(staged)) {
        return;
    }

    FLUSHED_METADATA.add(staged);

    const prototype = owner.prototype as object;
    const keys = Reflect.ownKeys(staged);

    for (let i = 0, len = keys.length; i < len; i++) {
        const path = keys[i] as string;
        const destination = path.startsWith('static.')
            ? owner
            : prototype;

        getOrCreateBaseRepository(destination).set(path, staged[path]);
    }
}
