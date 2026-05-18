import { ConstructorLike } from '@aedart/contracts';
import { Key } from '@aedart/contracts/support';
import { toParts } from '../objects/toParts.js';
import { isConstructor } from '../reflections/isConstructor.js';
import { getOrCreateRepository } from './getOrCreateRepository.js';
import { addressRegistry } from './registries.js';
import type Resolved from './Resolved.js';

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
        const { resolvedTarget, resolvedKey } = this.resolveTargetAndKey(target, key);

        return getOrCreateRepository(resolvedTarget).get<T>(resolvedKey, defaultValue);
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
        const { resolvedTarget, resolvedKey } = this.resolveTargetAndKey(target, key);

        return getOrCreateRepository(resolvedTarget).has(resolvedKey);
    }

    /**
     * Returns all metadata for the given target only.
     *
     * @param {object} target
     * @param {boolean} [inherited=true] Returns all inherited metadata is return, if `true`.
     *                                   Otherwise, only this target's metadata is returned.
     * 
     * @returns {Record<PropertyKey, unknown>}
     */
    static all(target: object, inherited = true): Record<PropertyKey, unknown>
    {
        return getOrCreateRepository(target).all(inherited);
    }

    /**
     *  Resolve the actual target and key for metadata lookup
     *
     * @param {object} target
     * @param {Key} key
     *
     * @returns {Resolved}
     *
     * @protected
     */
    protected static resolveTargetAndKey(target: object, key: Key): Resolved
    {
        let owner = target;
        let resolvedKey = key;

        const address = addressRegistry.get(target);
        if (address !== undefined) {
            const resolvedOwner = address.ctx?.ownerRef?.deref();
            if (resolvedOwner !== undefined) {
                owner = resolvedOwner;
            }

            resolvedKey = address.path(key);
        }

        return {
            resolvedTarget: this.resolveTarget(owner, resolvedKey),
            resolvedKey,
        };
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
