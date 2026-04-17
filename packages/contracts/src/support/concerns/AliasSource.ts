import type ConcernConstructor from './ConcernConstructor.js';

/**
 * Alias Source
 *
 * Represents the origin of an aliased property or method.
 */
export default interface AliasSource
{
    /**
     * The Concern class where the property or method originates.
     */
    readonly concern: ConcernConstructor;

    /**
     * The original property name (key) in the source concern.
     */
    readonly original: PropertyKey;
}
