import type { ConstructorLike } from '@aedart/contracts';

/**
 * Returns target class' constructor name, if available
 *
 * @param {ConstructorLike} target
 * @param {string|null} [defaultValue=null] A default string value to return if target has no constructor name
 *
 * @return {string|null} Constructor name, or default value
 */
export function getConstructorName(
    target: ConstructorLike,
    defaultValue: string | null = null,
): string | null
{
    // Direct access via optional chaining is the fastest path in Node 24 V8.
    const name: string | undefined = target?.name
        ?? (target?.prototype as object)?.constructor?.name;

    // Check for string type and non-zero length to filter out anonymous or invalid names.
    if (typeof name === 'string' && name.length > 0) {
        return name;
    }

    return defaultValue;
}
