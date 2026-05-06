import { type ConstructorLike } from '@aedart/contracts';
import { type AliasSource, APPLIED_ALIASES } from '@aedart/contracts/support/concerns';
import { hasAppliedAliasesMap } from './hasAppliedAliasesMap.js';

/**
 * Returns the ultimate source information for a given alias,
 * resolving nested aliases recursively.
 *
 * @param {unknown} target Class constructor or instance
 * @param {PropertyKey} key The name of the aliased property
 *
 * @returns {AliasSource | undefined}
 */
export function getAliasSource(target: unknown, key: PropertyKey): AliasSource | undefined
{
    if (target === null || target === undefined) {
        return undefined;
    }

    let constructor = (typeof target === 'function')
        ? target as ConstructorLike
        : target.constructor as ConstructorLike;

    while (constructor !== null && constructor !== Object) {
        if (hasAppliedAliasesMap(constructor)) {
            const aliases: Map<PropertyKey, AliasSource> = constructor[APPLIED_ALIASES];
            const mapping: AliasSource | undefined = aliases.get(key);

            if (mapping !== undefined) {
                // Recursive step: attempt to find the original source if the
                // mapping's concern also defines an alias for the key.
                return getAliasSource(mapping.concern, mapping.original) ?? mapping;
            }
        }

        constructor = Reflect.getPrototypeOf(constructor) as ConstructorLike;
    }

    return undefined;
}
