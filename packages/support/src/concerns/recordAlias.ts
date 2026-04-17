import {APPLIED_ALIASES, type ConcernConstructor} from '@aedart/contracts/support/concerns';

/**
 * Record an alias mapping on the target constructor
 *
 * @param target
 * @param {ConcernConstructor} concern
 * @param {PropertyKey} originalKey
 * @param {PropertyKey} aliasKey
 */
export function recordAlias(target: any, concern: ConcernConstructor, originalKey: PropertyKey, aliasKey: PropertyKey): void
{
    if (!Reflect.has(target, APPLIED_ALIASES)) {
        Reflect.defineProperty(target, APPLIED_ALIASES, {
            value: new Map<PropertyKey, { concern: ConcernConstructor, original: PropertyKey }>(),
            configurable: false,
            enumerable: false,
            writable: false
        });
    }

    const aliases = target[APPLIED_ALIASES];
    aliases.set(aliasKey, {concern, original: originalKey});
}