import { type ConstructorLike } from '@aedart/contracts';
import { type AliasSource, APPLIED_ALIASES } from '@aedart/contracts/support/concerns';
import { hasAppliedAliasesMap } from './hasAppliedAliasesMap.js';

/**
 * Returns a map of all aliases applied to the target
 *
 * @param {unknown} target
 *
 * @returns {Map<PropertyKey, AliasSource>}
 */
export function appliedAliases(target: unknown): Map<PropertyKey, AliasSource>
{
    const constructor = (typeof target === 'function')
        ? target as ConstructorLike
        : (target as object).constructor as ConstructorLike;

    const allAliases = new Map<PropertyKey, AliasSource>();

    // Walk prototype chain to aggregate aliases from parents too
    let current = constructor;
    while (current !== null && current !== Object) {
        if (hasAppliedAliasesMap(current)) {
            const aliases: Map<PropertyKey, AliasSource> = current[APPLIED_ALIASES];
            for (const [alias, source] of aliases) {
                if (!allAliases.has(alias)) {
                    allAliases.set(alias, source);
                }
            }
        }

        current = Reflect.getPrototypeOf(current) as ConstructorLike;
    }

    return allAliases;
}
