import type { SkipKeyCallback } from "@aedart/contracts/support/objects";

/**
 * Returns a new skip callback for given property keys
 * 
 * @param {PropertyKey[]} keys
 * 
 * @return {SkipKeyCallback}
 */
export function makeSkipCallback(keys: PropertyKey[]): SkipKeyCallback
{
    return (
        key: PropertyKey,
        source: object,
        result: object /* eslint-disable-line @typescript-eslint/no-unused-vars */
    ) => {
        return keys.includes(key) && Reflect.has(source, key);
    }
}