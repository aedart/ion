import { Key } from '@aedart/contracts/support/types.js';
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
     * @param {any} [defaultValue]
     *
     * @returns {T | undefined}
     */
    static get<T>(target: object, key: Key, defaultValue?: T): T | undefined
    {
        return getOrCreateRepository(target).get<T>(key, defaultValue);
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
        return getOrCreateRepository(target).has(key);
    }

    /**
     * Returns all metadata for the given target only.
     *
     * @param {object} target
     *
     * @returns {Record<PropertyKey, any>}
     */
    static all(target: object): Record<PropertyKey, any>
    {
        return getOrCreateRepository(target).all();
    }
}
