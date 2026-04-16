import { merge } from '../objects/merge.js';

/**
 * Populate descriptors
 *
 * @param {Record<PropertyKey, PropertyDescriptor>} output
 * @param {*} proto
 *
 * @returns {Record<PropertyKey, PropertyDescriptor>}
 */
export function populateDescriptors(
    output: Record<PropertyKey, PropertyDescriptor>,
    proto: any,
): Record<PropertyKey, PropertyDescriptor>
{
    const keys = Reflect.ownKeys(proto);
    const len = keys.length;

    for (let i = 0; i < len; i++) {
        const key = keys[i];
        const descriptor = Reflect.getOwnPropertyDescriptor(proto, key);

        if (descriptor === undefined) {
            continue;
        }

        if (output[key] === undefined) {
            output[key] = descriptor;
            continue;
        }

        // Merge collision: Child descriptor takes precedence or merges with parent.
        output[key] = merge()
            .using({ overwriteWithUndefined: false })
            .of(output[key], descriptor);
    }

    return output;
}
