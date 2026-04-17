import {
    CONCERN_REGISTRY,
    type ConcernConfiguration,
    type ConcernConstructor,
} from '@aedart/contracts/support/concerns';
import { getClassPropertyDescriptors } from '../reflections/index.js';
import { InjectionConflictError } from './exceptions/index.js';
import { recordAlias } from './recordAlias.js';

/**
 * Inject properties from the concern into the target prototype
 *
 * @param {any} target
 * @param {ConcernConstructor | ConcernConfiguration} entry
 */
export function inject(target: any, entry: ConcernConstructor | ConcernConfiguration): void
{
    const constructor: ConcernConstructor = (typeof entry === 'function') ? entry : entry.concern;
    const descriptors: PropertyDescriptorMap = getClassPropertyDescriptors(constructor);
    const keys: (string | symbol)[] = Reflect.ownKeys(descriptors);

    const aliases = (typeof entry !== 'function') ? (entry.aliases ?? {}) : {};
    const excludes = (typeof entry !== 'function') ? (entry.excludes ?? []) : [];

    for (let i: number = 0, limit: number = keys.length; i < limit; i++) {
        const key: string | symbol = keys[i];

        // Skip constructor and internal AbstractConcern symbols
        if (key === 'constructor' || key === 'prototype' || key === CONCERN_REGISTRY) {
            continue;
        }

        // Handle Exclusions
        if (excludes.indexOf(key) !== -1) {
            continue;
        }

        // Determine Final Key (Alias or Original)
        const finalKey: PropertyKey = aliases[key as string] ?? key;

        // Conflict Check: Fail-fast if property already exists on target prototype
        if (Reflect.has(target.prototype, finalKey)) {
            throw new InjectionConflictError(
                target,
                finalKey,
                `Property "${String(finalKey)}" already exists in ${target.name}`,
            );
        }

        // Record Alias Mapping (Only if an alias was actually defined)
        if (finalKey !== key) {
            recordAlias(target, constructor, key, finalKey);
        }

        // Direct Injection
        Reflect.defineProperty(target.prototype, finalKey, descriptors[key as string]);
    }
}
