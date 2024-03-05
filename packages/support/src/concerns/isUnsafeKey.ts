import { DANGEROUS_PROPERTIES } from "@aedart/contracts/support/objects";
import {
    CONCERN_CLASSES,
    CONCERNS,
    PROVIDES,
    ALIASES,
    BEFORE,
    AFTER
} from "@aedart/contracts/support/concerns";

/**
 * List of property keys that are considered "unsafe" to alias (proxy to)
 */
export const UNSAFE_PROPERTY_KEYS = [
    ...DANGEROUS_PROPERTIES,

    // ----------------------------------------------------------------- //
    // Defined by Concern interface / Abstract Concern:
    // ----------------------------------------------------------------- //

    // It is NOT possible, nor advised to attempt to alias a Concern's
    // constructor into a target class.
    'constructor',

    // The concernOwner property (getter) shouldn't be aliased either
    'concernOwner',

    // The static properties and methods (just in case...)
    PROVIDES,
    BEFORE,
    AFTER,

    // ----------------------------------------------------------------- //
    // Other properties and methods:
    // ----------------------------------------------------------------- //

    // In case that a concern class uses other concerns, prevent them
    // from being aliased.
    CONCERN_CLASSES,
    CONCERNS,
    ALIASES,
];

/**
 * Determine if given property key is considered "unsafe"
 * 
 * @see UNSAFE_PROPERTY_KEYS
 * 
 * @param {PropertyKey} key
 * 
 * @returns {boolean}
 */
export function isUnsafeKey(key: PropertyKey): boolean
{
    return UNSAFE_PROPERTY_KEYS.includes(key);
}