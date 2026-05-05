import type { AliasSource } from '@aedart/contracts/support/concerns/index';
import { ConstructorLike } from '../../types.js';
import Concern from './Concern.js';
import ConcernConstructor from './ConcernConstructor.js';

/**
 * Alias Configuration
 *
 * Key is the original property name, Value is the new alias
 */
export type AliasMap = Record<PropertyKey, PropertyKey>;

/**
 * Shorthand Concern Injection Configuration
 *
 * [ Concern Constructor, Alias Map ]
 */
export type ShorthandConfiguration<T extends Concern = Concern> = [
    ConcernConstructor<T>,
    AliasMap,
];

/**
 * Symbol used to identify a class as being a valid Concern.
 */
export const CONCERN_CLASS: unique symbol = Symbol(
    '@aedart/contracts/support/concerns/concern-class',
);

/**
 * Symbol used to store the Concern Registry (Set of constructors) on a target class.
 * This is used by external utilities like `usesConcerns()`.
 */
export const CONCERN_REGISTRY: unique symbol = Symbol(
    '@aedart/contracts/support/concerns/registry',
);

/**
 * Symbol used to store information about applied aliases.
 * Useful for debugging and preventing naming collisions in deep inheritance.
 */
export const APPLIED_ALIASES: unique symbol = Symbol(
    '@aedart/contracts/support/concerns/applied-aliases',
);

/**
 * Class that has a concern registry
 *
 * @see {@link CONCERN_REGISTRY}
 */
export type WithConcernRegistry<T extends ConstructorLike = ConstructorLike> = T & {
    [CONCERN_REGISTRY]: Set<ConcernConstructor>;
};

/**
 * Class that has an applied aliases map
 *
 * @see {@link APPLIED_ALIASES}
 */
export type WithAppliedAliases<T extends ConstructorLike = ConstructorLike> = T & {
    [APPLIED_ALIASES]: Map<PropertyKey, AliasSource>;
};
