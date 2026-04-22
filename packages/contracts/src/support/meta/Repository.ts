import { Key } from '../types.js';

/**
 * Metadata Repository Contract
 */
export default interface Repository {
    /**
     * Set a metadata value for the given key or path.
     */
    set(key: Key, value: any): void;

    /**
     * Get a metadata value for the given key or path.
     */
    get<T>(key: Key, defaultValue?: T): T | undefined;

    /**
     * Determine if metadata exists for the given key or path.
     */
    has(key: Key): boolean;

    /**
     * Returns the metadata record for the target.
     *
     * @param {boolean} [merged] If true, it includes inherited metadata.
     */
    all(merged?: boolean): DecoratorMetadata;
}
