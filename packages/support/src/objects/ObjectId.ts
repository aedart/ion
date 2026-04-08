/**
 * Object ID
 *
 * Utility that is able to return a numeric ID for objects.
 *
 * Source is heavily inspired by Nicolas Gehlert's blog post:
 * "Get object reference IDs in JavaScript/TypeScript" (September 28, 2022)
 *
 * @see https://developapa.com/object-ids/
 * @see https://github.com/ngehlert/developapa/blob/master/content/blog/object-ids/index.md
 */
export default class ObjectId
{
    /**
     * Internal counter
     *
     * @static
     */
    static #count: number = 0;

    /**
     * Weak Map of objects and their associated id
     *
     * @static
     */
    static readonly #map: WeakMap<object, number> = new WeakMap<object, number>();

    /**
     * Returns a unique ID for target object.
     *
     * @param {object} target
     *
     * @returns {number}
     */
    static get(target: object): number
    {
        const id = ObjectId.#map.get(target);
        if (id !== undefined) {
            return id;
        }

        const newId = ++ObjectId.#count;
        ObjectId.#map.set(target, newId);

        return newId;
    }

    /**
     * Determine if a unique ID exists for target object
     *
     * @param {object} target
     *
     * @returns {boolean}
     */
    static has(target: object): boolean
    {
        return ObjectId.#map.has(target);
    }
}
