import { Key } from '../types.js';

/**
 * Meta Entry
 */
export default interface MetaEntry {
    /**
     * Key or path identifier
     *
     * @type {Key}
     */
    key: Key;

    /**
     * Value to store
     *
     * @type {unknown}
     */
    value: unknown;
}
