// @aedart/contracts/support/meta/Repository.js
import { Key } from '../types.js';

/**
 * Metadata Repository Contract
 */
export default interface Repository {
    /**
     * Set a metadata value for the given key or path.
     *
     * @param {Key} key
     * @param {any} value
     */
    set(key: Key, value: any): void;

    /**
     * Get a metadata value for the given key or path.
     *
     * @template T
     * @param {Key} key
     * @param {any} [defaultValue]
     * @returns {T | undefined}
     */
    get<T>(key: Key, defaultValue?: T): T | undefined;

    /**
     * Determine if metadata exists for the given key or path.
     *
     * @param {Key} key
     * @returns {boolean}
     */
    has(key: Key): boolean;

    /**
     * Returns all metadata for the bound target only (excludes inherited).
     *
     * @returns {Record<PropertyKey, any>}
     */
    all(): Record<PropertyKey, any>;

    /**
     * The target (class or member) this repository is bound to.
     */
    readonly owner: object;

    /**
     * The parent repository, if any.
     */
    readonly parent: Repository | undefined;
}
