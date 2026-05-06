import { type ConstructorLike } from '@aedart/contracts';
import {
    type AliasSource,
    APPLIED_ALIASES,
    type ConcernConstructor,
    type WithAppliedAliases,
} from '@aedart/contracts/support/concerns';
import { hasAppliedAliasesMap } from './hasAppliedAliasesMap.js';

/**
 * Record an alias mapping on the target constructor
 *
 * @param {ConstructorLike} target
 * @param {ConcernConstructor} concern
 * @param {PropertyKey} originalKey
 * @param {PropertyKey} aliasKey
 */
export function recordAlias(
    target: ConstructorLike,
    concern: ConcernConstructor,
    originalKey: PropertyKey,
    aliasKey: PropertyKey,
): void
{
    if (!hasAppliedAliasesMap(target)) {
        Reflect.defineProperty(target, APPLIED_ALIASES, {
            value: new Map<PropertyKey, { concern: ConcernConstructor; original: PropertyKey; }>(),
            configurable: false,
            enumerable: false,
            writable: false,
        });
    }

    const aliases: Map<PropertyKey, AliasSource> =
        (target as WithAppliedAliases<typeof target>)[APPLIED_ALIASES];
    aliases.set(aliasKey, { concern: concern, original: originalKey });
}
