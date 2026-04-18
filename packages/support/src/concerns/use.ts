import {
    type ConcernConfiguration,
    type ConcernConstructor,
    type ShorthandConfiguration,
} from '@aedart/contracts/support/concerns';
import { AlreadyAppliedError, InvalidConcernError } from './exceptions/index.js';
import { getOrCreateRegistry } from './getOrCreateRegistry.js';
import { inject } from './inject.js';
import { isConcernConstructor } from './isConcernConstructor.js';
import { mergeRegistry } from './mergeRegistry.js';
import { normalizeConfig } from './normalizeConfig.js';

/**
 * Use one or more concerns (traits)
 *
 * @param {...(ConcernConstructor | ConcernConfiguration | ShorthandConfiguration)} concerns
 *
 * @returns {ClassDecorator}
 *
 * @throws {InvalidConcernError} If a provided concern is not a valid concern constructor
 * @throws {InjectionConflictError} If a concern property conflicts with an existing property in the target
 */
export function use(
    ...concerns: (ConcernConstructor | ConcernConfiguration | ShorthandConfiguration)[]
)
{
    return function(target: any)
    {
        const registry: Set<ConcernConstructor> = getOrCreateRegistry(target);

        for (let i: number = 0, limit: number = concerns.length; i < limit; i++) {
            const config = normalizeConfig(concerns[i]);
            const constructor = config.concern;

            // 1. Validate Concern
            if (!isConcernConstructor(constructor)) {
                throw new InvalidConcernError(constructor, `Class is not a valid Concern Class.`);
            }

            // 2. Merge Registry from Concern (Recursive Flattening)
            // If the concern itself uses other concerns, we pull those into the target first.
            mergeRegistry(target, constructor, registry);

            // 3. Strict Duplicate Check for the concern itself
            if (registry.has(constructor)) {
                throw new AlreadyAppliedError(
                    target,
                    constructor,
                    `Concern ${constructor.name} is already applied.`,
                );
            }

            // 4. Inject Properties & Methods
            inject(target, config);

            // 5. Update Registry
            registry.add(constructor);
        }
    };
}
