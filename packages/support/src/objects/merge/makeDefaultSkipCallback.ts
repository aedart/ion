import type { SkipKeyCallback } from "@aedart/contracts/support/objects";

/**
 * Returns a new "default" skip callback for given keys
 * 
 * @param {PropertyKey[]} keys
 * 
 * @return {SkipKeyCallback}
 */
export function makeDefaultSkipCallback(keys: PropertyKey[]): SkipKeyCallback
{
    return (
        key: PropertyKey,
        source: object,
        result: object /* eslint-disable-line @typescript-eslint/no-unused-vars */
    ) => {
        return keys.includes(key) && Reflect.has(source, key);
    }
}