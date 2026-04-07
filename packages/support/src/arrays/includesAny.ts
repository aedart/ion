/**
 * Determine if array includes any (_some_) of the given values
 *
 * @param {any[]} arr
 * @param {any[]} values
 *
 * @return {boolean}
 */
export function includesAny(
    arr: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    values: any[] /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    const valuesCount = values.length;
    const arrCount = arr.length;

    // Fast-exit, when either array is empty, no overlap is possible.
    if (valuesCount === 0 || arrCount === 0) {
        return false;
    }

    // Small Array Optimization:
    // We use nested loops for small source arrays to avoid the memory overhead
    // of Set creation. We prioritize iterating over the smaller of the two
    // arrays as the outer loop to minimize checks.
    // V8 (Chrome / Edge / Node.js) typically have a threshold between 16 and 32.
    if (arrCount < 16) {
        for (let i = 0; i < valuesCount; i++) {
            const search = values[i];
            for (let j = 0; j < arrCount; j++) {
                if (arr[j] === search) {
                    return true;
                }
            }
        }

        return false;
    }

    // Large Array Optimization:
    // Creating a Set provides O(1) lookups. In an "includesAny" scenario,
    // the performance gain is massive for large datasets as we only need
    // one single match to return true.
    const lookup = new Set(arr);
    for (let i = 0; i < valuesCount; i++) {
        if (lookup.has(values[i])) {
            return true;
        }
    }

    return false;
}
