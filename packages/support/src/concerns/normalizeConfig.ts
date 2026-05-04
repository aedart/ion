import {
    type ConcernConfiguration,
    type ConcernConstructor,
    type ShorthandConfiguration,
} from '@aedart/contracts/support/concerns';

/**
 * Normalizes a concern entry into a standard ConcernConfiguration
 *
 * @param {ConcernConstructor | ConcernConfiguration | ShorthandConfiguration} entry
 *
 * @returns {ConcernConfiguration}
 */
export function normalizeConfig(
    entry: ConcernConstructor | ConcernConfiguration | ShorthandConfiguration,
): ConcernConfiguration
{
    // If entry is a ShorthandConfiguration [Constructor, AliasMap]
    if (Array.isArray(entry)) {
        return {
            concern: entry[0],
            aliases: entry[1],
        };
    }

    // If entry is already a ConcernConfiguration object
    if (typeof entry === 'object' && entry !== null && 'concern' in entry) {
        return entry;
    }

    // Otherwise, assume it's a ConcernConstructor
    return {
        concern: entry,
    };
}
