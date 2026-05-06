import { type ConstructorLike } from '@aedart/contracts';
import { APPLIED_ALIASES, type WithAppliedAliases } from '@aedart/contracts/support/concerns';

/**
 * Determine if target has an applied aliases map
 *
 * @param {ConstructorLike} target
 *
 * @returns {target is WithAppliedAliases<typeof target>}
 */
export function hasAppliedAliasesMap(
    target: ConstructorLike,
): target is WithAppliedAliases<typeof target>
{
    return Reflect.has(target, APPLIED_ALIASES)
        && (target as WithAppliedAliases<typeof target>)[APPLIED_ALIASES] instanceof Map;
}
