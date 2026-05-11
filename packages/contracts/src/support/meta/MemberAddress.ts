import { Key } from '../types.js';
import OwnerContext from './OwnerContext.js';

/**
 * Member Address
 */
export default interface MemberAddress {
    /**
     * Owner Context
     *
     * @type {OwnerContext}
     */
    readonly ctx: OwnerContext;

    /**
     * Indicates whether the member is static (`true`) or otherwise (`false`)
     *
     * @type {boolean}
     */
    readonly static: boolean;

    /**
     * The kind of member
     *
     * @type {string}
     */
    readonly kind: string;

    /**
     * Name of the member
     *
     * @type {string|symbol}
     */
    readonly name: string | symbol;

    /**
     * The "base" path to where metadata is stored inside a Meta Repository
     *
     * @type {Key}
     */
    readonly basePath: Key;

    /**
     * Returns the full path to the given key in a Meta Repository, for the member
     *
     * @param {Key} [key]
     *
     * @returns {Key} {@link basePath} if no key provided
     */
    path(key?: Key): Key;
}
