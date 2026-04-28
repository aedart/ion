import {Key} from '@aedart/contracts/support/types.js';
import {getOrCreateRepository} from './getOrCreateRepository.js';
import {isConstructor} from "../reflections/isConstructor.js";
import {toParts} from "../objects/toParts.js";

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
     * @returns {Record<PropertyKey, any>}
     */
    static all(target: object): Record<PropertyKey, any>
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
                return (target as any).prototype;
            }
        }

        return target;
        
        // if (isConstructor(target)) {
        //     const parts = toParts(key);
        //
        //     // If the key starts with 'static', it's definitely on the constructor
        //     if (parts[0] === 'static') {
        //         return target;
        //     }
        //
        //     // If it starts with 'methods' or 'fields' (WITHOUT 'static'), 
        //     // it's an instance member and MUST be on the prototype.
        //     if (parts[0] === 'methods' || parts[0] === 'fields') {
        //         return (target as any).prototype;
        //     }
        // }
        //
        // return target;
    }
}
