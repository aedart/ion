import { Key } from '../types.js';

/**
 * Metadata Repository
 */
export default interface Repository {
    /**
     * Set a metadata value for the given key or path.
     *
     * @param {Key} key
     * @param {unknown} value
     */
    set(key: Key, value: unknown): void;

    /**
     * Get a metadata value for the given key or path.
     *
     * @template T
     *
     * @param {Key} key
     * @param {T} [defaultValue]
     *
     * @returns {T | undefined}
     */
    get<T>(key: Key, defaultValue?: T): T | undefined;

    /**
     * Determine if metadata exists for the given key or path.
     *
     * @param {Key} key
     *
     * @returns {boolean}
     */
    has(key: Key): boolean;

    /**
     * Returns all metadata for the target.
     *
     * @param {boolean} [inherited=true] Returns all inherited metadata is return, if `true`.
     *                                   Otherwise, only this target's metadata is returned.
     *
     * @returns {Record<PropertyKey, unknown>}
     */
    all(inherited?: boolean): Record<PropertyKey, unknown>;

    /**
     * The target (class or member) this repository is bound to.
     */
    readonly owner: object;

    /**
     * The parent repository, if any.
     */
    readonly parent: Repository | undefined;
}
