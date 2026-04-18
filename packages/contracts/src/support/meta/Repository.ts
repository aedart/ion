import { Key } from '../types.js';
import { MetadataRecord } from './types.js';

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
     *
     * @param {Key} key
     * @param {any} [defaultValue]
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
     * Forget metadata for the given key or path.
     *
     * @param {Key} key
     *
     * @returns {boolean} True if successfully removed.
     */
    forget(key: Key): boolean;

    /**
     * Returns the underlying metadata record (the "shelf").
     *
     * @returns {MetadataRecord}
     */
    all(): MetadataRecord;
}
