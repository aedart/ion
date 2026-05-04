import { merge } from '../objects/merge.js';

/**
 * Populate descriptors from a given prototype object into the output record.
 *
 * When a key collision occurs, the existing descriptor (child) takes precedence
 * and is deep-merged with the incoming descriptor (parent).
 *
 * @param {Record<PropertyKey, PropertyDescriptor>} output - The accumulator record to populate.
 * @param {object} proto - The prototype object to extract descriptors from.
 *
 * @returns {Record<PropertyKey, PropertyDescriptor>} The populated output record.
 */
export function populateDescriptors(
    output: Record<PropertyKey, PropertyDescriptor>,
    proto: object,
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
        // Merge collision: child descriptor takes precedence or merges with parent.
        output[key] = merge()
            .using({ overwriteWithUndefined: false })
            .of(output[key], descriptor) as PropertyDescriptor;
    }
    return output;
}
