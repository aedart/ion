import type {AliasSource} from '@aedart/contracts/support/concerns';
import {APPLIED_ALIASES} from '@aedart/contracts/support/concerns';

/**
 * Returns the ultimate source information for a given alias,
 * resolving nested aliases recursively.
 *
 * @param {any} target Class constructor or instance
 * @param {PropertyKey} key The name of the aliased property
 *
 * @returns {AliasSource | undefined}
 */
export function getAliasSource(target: any, key: PropertyKey): AliasSource | undefined
{
    if (target === null || target === undefined) {
        return undefined;
    }

    let constructor = (typeof target === 'function')
        ? target
        : target.constructor;

    while (constructor !== null && constructor !== Object) {
        if (Reflect.has(constructor, APPLIED_ALIASES)) {
            const aliases = constructor[APPLIED_ALIASES] as Map<PropertyKey, AliasSource>;
            const mapping: AliasSource | undefined = aliases.get(key);

            if (mapping !== undefined) {
                // Recursive step: attempt to find the original source if the 
                // mapping's concern also defines an alias for the key.
                return getAliasSource(mapping.concern, mapping.original) ?? mapping;
            }
        }

        constructor = Reflect.getPrototypeOf(constructor);
    }

    return undefined;
}
