import ConcernConstructor from './ConcernConstructor.js';
import type { AliasMap } from './types.js';

/**
 * Concern Configuration
 */
export default interface ConcernConfiguration {
    /**
     * The Concern class to be applied
     */
    concern: ConcernConstructor;

    /**
     * Properties/Methods to be aliased
     */
    aliases?: AliasMap;

    /**
     * Properties/Methods to be excluded
     */
    excludes?: PropertyKey[];
}
