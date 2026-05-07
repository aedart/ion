import { ConstructorLike } from '@aedart/contracts';
import { Key } from '@aedart/contracts/support';
import { toParts } from '../objects/toParts.js';
import { isConstructor } from '../reflections/isConstructor.js';
import { getOrCreateRepository } from './getOrCreateRepository.js';

/**
 * Metadata Helper
 *
 * Provides a static interface for interacting with the metadata registry.
 */
export default class Metadata
{
    /**
     * Get a metadata value for the given target and key.
     *
     * @template T
     * @param {object} target
     * @param {Key} key
     * @param {T} [defaultValue]
     *
     * @returns {T | undefined}
     */
    static get<T>(target: object, key: Key, defaultValue?: T): T | undefined
    {
        const resolved = this.resolveTarget(target, key);

        return getOrCreateRepository(resolved).get<T>(key, defaultValue);
    }

    /**
     * Determine if metadata exists for the given target and key.
     *
     * @param {object} target
     * @param {Key} key
     *
     * @returns {boolean}
     */
    static has(target: object, key: Key): boolean
    {
        const resolved = this.resolveTarget(target, key);

        return getOrCreateRepository(resolved).has(key);
    }

    /**
     * Returns all metadata for the given target only.
     *
     * @param {object} target
     *
     * @returns {Record<PropertyKey, unknown>}
     */
    static all(target: object): Record<PropertyKey, unknown>
    {
        return getOrCreateRepository(target).all();
    }

    /**
     * Resolves the actual target for metadata lookup
     *
     * @param {object} target
     * @param {PropertyKey} key
     *
     * @returns {object}
     *
     * @protected
     */
    protected static resolveTarget(target: object, key: Key): object
    {
        if (isConstructor(target)) {
            const parts = toParts(key);
            const root = parts[0];

            // If querying instance members via the Class, pivot to the Prototype.
            if (root === 'methods' || root === 'fields') {
                return (target as ConstructorLike).prototype as object;
            }
        }

        return target;
    }
}
