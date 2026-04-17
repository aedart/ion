import type { AliasSource } from '@aedart/contracts/support/concerns';
import { APPLIED_ALIASES } from '@aedart/contracts/support/concerns';

/**
 * Returns a map of all aliases applied to the target
 *
 * @param {any} target
 *
 * @returns {Map<PropertyKey, AliasSource>}
 */
export function appliedAliases(target: any): Map<PropertyKey, AliasSource>
{
    const constructor = (typeof target === 'function') ? target : target.constructor;
    const allAliases = new Map<PropertyKey, AliasSource>();

    // Walk prototype chain to aggregate aliases from parents too
    let current = constructor;
    while (current !== null && current !== Object) {
        if (Reflect.has(current, APPLIED_ALIASES)) {
            const aliases = current[APPLIED_ALIASES] as Map<PropertyKey, AliasSource>;
            for (const [alias, source] of aliases) {
                if (!allAliases.has(alias)) {
                    allAliases.set(alias, source);
                }
            }
        }
        current = Reflect.getPrototypeOf(current);
    }

    return allAliases;
}
