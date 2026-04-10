import { LOOKUP_THRESHOLD } from "./index.js";

/**
 * Determine if array includes all given values
 *
 * @param {any[]} arr
 * @param {any[]} values
 *
 * @return {boolean}
 */
export function includesAll(
    arr: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
    values: any[], /* eslint-disable-line @typescript-eslint/no-explicit-any */
): boolean
{
    const valuesCount = values.length;
    const arrCount = arr.length;

    // Fast-exit when no values are requested...
    if (valuesCount === 0) {
        return true;
    }

    // Small Array Optimization:
    // For small source arrays (threshold < 16), the overhead of allocating
    // a new Set and calculating hashes exceeds the cost of a nested loop.
    // Nested loops benefit from CPU cache locality and avoid GC pressure.
    // V8 (Chrome / Edge / Node.js) typically have a threshold between 16 and 32.
    if (arrCount < LOOKUP_THRESHOLD) {
        for (let i = 0; i < valuesCount; i++) {
            let found = false;
            for (let j = 0; j < arrCount; j++) {
                if (arr[j] === values[i]) {
                    found = true;
                    break;
                }
            }

            // If a single value is missing, we exit immediately to save cycles.
            if (!found) {
                return false;
            }
        }

        return true;
    }

    // Large Array Optimization:
    // For larger arrays, we switch to a Set-based lookup to achieve O(n + m)
    // linear complexity. This prevents the O(n * m) "performance cliff"
    // where execution time grows exponentially with input size.
    const lookup = new Set(arr);
    for (let i = 0; i < valuesCount; i++) {
        // Set.has() is O(1) on average, making this path significantly
        // faster for large datasets despite the initial allocation cost.
        if (!lookup.has(values[i])) {
            return false;
        }
    }

    return true;
}
