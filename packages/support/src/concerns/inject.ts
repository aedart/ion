import type { ConstructorLike } from '@aedart/contracts';
import {
    CONCERN_REGISTRY,
    type ConcernConfiguration,
    type ConcernConstructor,
} from '@aedart/contracts/support/concerns';
import { getClassPropertyDescriptors } from '../reflections/index.js';
import { isKeyUnsafe } from '../reflections/isKeyUnsafe.js';
import { InjectionConflictError } from './exceptions/index.js';
import { recordAlias } from './recordAlias.js';

/**
 * Inject properties from the concern into the target prototype
 *
 * @param {ConstructorLike} target
 * @param {ConcernConfiguration} config
 *
 * @throws {InjectionConflictError}
 */
export function inject(target: ConstructorLike, config: ConcernConfiguration): void
{
    const constructor: ConcernConstructor = config.concern;
    const descriptors: PropertyDescriptorMap = getClassPropertyDescriptors(constructor);
    const keys: (string | symbol)[] = Reflect.ownKeys(descriptors);

    const aliases = config.aliases ?? {};
    const excludes = config.excludes ?? [];

    for (let i = 0, limit: number = keys.length; i < limit; i++) {
        const key: string | symbol = keys[i];

        // 1. Security & Internal Check
        if (isKeyUnsafe(key) || key === CONCERN_REGISTRY) {
            continue;
        }

        // 2. Handle Exclusions
        if (excludes.includes(key)) {
            continue;
        }

        // 3. Determine Final Key
        const finalKey: PropertyKey = aliases[key as string] ?? key;

        // 4. Security Check on Alias
        if (isKeyUnsafe(finalKey)) {
            throw new InjectionConflictError(
                target,
                finalKey,
                `Illegal alias target: ${String(finalKey)} in ${target.name}`,
            );
        }

        // 5. Conflict Check (Prototype & Existing Member Check)
        // This catches if the property exists on the class OR was just injected
        if (Reflect.has(target.prototype as object, finalKey)) {
            throw new InjectionConflictError(
                target,
                finalKey,
                `Property "${
                    String(finalKey)
                }" already exists in ${target.name} (or was previously injected)`,
            );
        }

        // 6. Record Alias Mapping
        if (finalKey !== key) {
            recordAlias(target, constructor, key, finalKey);
        }

        // 7. Direct Injection
        Reflect.defineProperty(target.prototype as object, finalKey, descriptors[key as string]);
    }
}
